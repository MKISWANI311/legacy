/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var app = require('./app'),
    sjcl = require('./sjcl.min'),
    api = require('./api'),
    DialogModal = require('./modal'),
    FieldList = require('./fldlist');


var DlgExport = null;
var DlgOptions = null;
var DlgPassGet = null;
var DlgUserLogin = null;
var DlgUserRegister = null;


function convert ( data ) {
    let result = {
            notes: [],
            tags: {}
        },
        types = {
            1: 'line',
            2: 'uri',
            3: 'login',
            4: 'password',
            5: 'email',
            6: 'text',
            7: 'html'
        };

    console.log(data);
    /*Object.values(data.entry_values).forEach(entry => {
        entry.name = app.decode(entry.name);
        entry.data = app.decode(entry.data);
    });*/
    Object.values(data.note_entries).forEach(entry => {
        entry.name = app.decode(entry.name);
        entry.data = app.decode(entry.data);

        let note = data.notes[entry.id_note];
        let block = {
            type: types[entry.id_type],
            name: entry.name,
            data: entry.data
        };
        /*if ( block.type === 'text' || block.type === 'html' ) {
            block.hidden = true;
        }*/
        note.blocks = note.blocks || [];
        note.blocks.push(block);
    });
    Object.values(data.tags).forEach(entry => {
        entry.name = app.decode(entry.name);
        /*result.tags.push({
            name: entry.name,
            ctime: entry.ctime * 1000
        });*/
        result.tags[entry.name] = {ctime: entry.ctime * 1000};
    });
    Object.values(data.note_tags).forEach(link => {
        let note = data.notes[link.id_note];
        let tag = data.tags[link.id_tag];
        note.tags = note.tags || [];
        note.tags.push(tag.name);
        // count tag uses
        result.tags[tag.name].uses = result.tags[tag.name].uses || 0;
        result.tags[tag.name].uses++;
    });

    Object.values(data.notes).forEach(note => {
        if ( note.is_active ) {
            result.notes.push({
                ctime: note.ctime * 1000,
                mtime: note.mtime * 1000,
                blocks: note.blocks,
                tags: note.tags
            });
        }
    });

    console.log(result);
    console.log(JSON.stringify(result, null, '    '));

    return result;
}


//document.addEventListener('DOMContentLoaded', function () {
DlgExport = new DialogModal({
    width: 750,
    title: 'Data export',
    hint: 'Here you can get all your data unencrypted.',
    dom: {},

    onCreate: function () {
        this.SetContent(this.dom.text = element('textarea', {className: 'export'}));
    },

    /**
     * Open the subscriber
     * master password is accessible
     * decrypt all the data and show it
     */
    EventOpen: function () {
        if ( window.exportData ) {
            setTimeout(function () {
                DlgExport.Show();
                for ( var idNote in window.exportData.notes ) {
                    // check type
                    if ( window.exportData.notes[idNote] instanceof Array ) {
                        window.exportData.notes[idNote].forEach(function ( entry ) {
                            var name = app.decode(entry.name, true);
                            var data = app.decode(entry.data, true);
                            if ( name && data ) {
                                DlgExport.dom.text.value += name + ': ' + data + '\n';
                            }
                        });
                    }
                    // check type
                    if ( window.exportData.note_tags[idNote] instanceof Array ) {
                        var tags = [];
                        window.exportData.note_tags[idNote].forEach(function ( idTag ) {
                            if ( window.exportData.tags[idTag] ) tags.push(app.decode(window.exportData.tags[idTag], true));
                        });
                        if ( tags.length > 0 ) {
                            DlgExport.dom.text.value += 'tags: ' + tags.join(' ') + '\n';
                        }
                    }
                    DlgExport.dom.text.value += '\n';
                }
                // strip
                DlgExport.dom.text.value = DlgExport.dom.text.value.trim();
                window.exportData = null;
            }, 50);
        } else if ( window.exportDataJson ) {
            DlgExport.dom.text.value = window.exportDataJson;
            window.exportDataJson = null;

            setTimeout(function () {
                DlgExport.Show();
            }, 50);
        }
    },

    /**
     * close the subscriber
     * master password is expired and cleared
     * clear all the decrypted data
     */
    EventClose: function () {
        DlgExport.Close();
    },

    controls: {
        'Close': {
            main: true,
            onClick: function () {
                //var modal = this.modal;
                this.modal.Close();
            }
        }
    }
});


DlgOptions = new DialogModal({
    width: 650,
    title: 'Options',
    hint: 'Here you can create/restore backups and export all your data.',

    onCreate: function () {
        var file = element('input', {
            type: 'file', name: 'file', id: 'file-upload', onchange: function () {
                hint.innerHTML = this.value;
                fbtn.value = 'File selected';
            }
        });
        var fbtn = element('input', {
            type: 'button', className: 'button long', value: 'Choose file ...', onclick: function () {
                //$(file).trigger('click');
                file.click();
            }
        });
        var hint = element('div', {className: 'fhint'});

        this.SetContent([
            element('div', {className: 'desc'}, "Backup is an archived package of all your encrypted data. It can't be read by human but can be used to restore your account info or setup a copy on some other FortNotes instance."),
            element('input', {
                type: 'button', className: 'button long', value: 'Create backup', onclick: function () {
                    window.location = api.defaults.server + 'user/export/txt';
                }
            }),
            element('div', {className: 'desc'}, "Please specify your previously downloaded backup package and then press the \"Restore backup\" button. It will upload your backup to the server and replace all your current data with the data from this backup. Warning: this operation can't be reverted!"),
            element('div', {}, [
                element('input', {
                    type: 'button', className: 'button long', value: 'Restore backup', onclick: function () {
                        var btn = this;
                        btn.value = 'Uploading ...';
                        btn.disabled = true;

                        var data = new FormData();
                        data.append('file', file.files[0]);
                        console.log(data);

                        api.postForm('user/import/txt', data, function ( error, data ) {
                            if ( error ) {
                                console.error(error);
                                return;
                            }

                            console.log('user import', data);

                            btn.value = 'Restore backup';
                            btn.disabled = false;
                            if ( data && data.error ) {
                                alert('Restore from backup failed. Error: ' + data.error);
                            } else {
                                alert('The restore process has completed successfully and now the page will be reloaded to apply the restored data.');
                                // We must reload the whole page to update window.dataTags
                                window.location.reload();
                            }
                        });

                        // $.ajax({
                        //     url: 'user/import/txt',
                        //     data: data,
                        //     cache: false,
                        //     contentType: false,
                        //     processData: false,
                        //     type: 'POST',
                        //     dataType: 'json',
                        //     success: function(data) {
                        //         btn.value = 'Restore backup';
                        //         btn.disabled = false;
                        //         if ( data && data.error ) {
                        //             alert('Restore from backup failed. Error: ' + data.error);
                        //         } else {
                        //             alert('The restore process has completed successfully and now the page will be reloaded to apply the restored data.');
                        //             // We must reload the whole page to update window.dataTags
                        //             window.location.reload();
                        //         }
                        //     }
                        // });
                    }
                }), ' ',
                fbtn,
                hint
            ]),
            element('div', {className: 'desc'}, "It's possible to export all the data in a human readable form in order to print it or save in file on some storage. It'll give all the data in plain unencrypted form. The password is required."),
            element('input', {
                type: 'button', className: 'button long', value: 'Export as TEXT', onclick: function () {
                    var btn = this;

                    btn.value = 'Loading ...';
                    btn.disabled = true;

                    api.get('user/export/plain', function ( error, data ) {
                        if ( error ) {
                            console.error(error);
                            return;
                        }

                        console.log('user export', data);

                        window.exportData = data;
                        btn.value = 'Export as TEXT';
                        btn.disabled = false;
                        app.expirePass();
                    });
                }
            }),
            ' ',
            element('input', {
                type: 'button', className: 'button long', value: 'Export as JSON', onclick: function () {
                    var btn = this;

                    btn.value = 'Loading ...';
                    btn.disabled = true;

                    api.get('user/export/txt', function ( error, data ) {
                        if ( error ) {
                            console.error(error);
                            return;
                        }

                        console.log('user export', data);

                        window.exportDataJson = JSON.stringify(convert(data), null, '    ');
                        btn.value = 'Export as JSON';
                        btn.disabled = false;
                        app.expirePass();
                    });
                }
            })
        ]);
    },

    /**
     * close the subscriber
     * master password is expired and cleared
     * clear all the decrypted data
     */
    EventClose: function () {
        DlgOptions.Close();
    },

    controls: {
        Close: {
            main: true,
            onClick: function () {
                this.modal.Close();
            }
        }
    }
});


DlgPassGet = new DialogModal({
    width: 500,
    title: 'Password',
    hint: 'Please enter your password to unlock encrypted data.',
    data: {attempts: 0},

    onCreate: function () {
        this.data.fldlist = new FieldList({
            cols: [
                {className: 'colname'},
                {className: 'colvalue'}
            ],
            attr: {}
        });
        this.data.pass = element('input', {type: 'password', autocomplete: 'current-password', className: 'line'});
        this.data.linkset = element('a', {className: 'combo', title: 'click to change the password storing time'});
        onEnterClick(this.data.pass, this.params.controls['Continue'].dom);

        this.data.fldlist.AddRow([
            [
                element('span', {className: 'fldname'}, 'password'),
                element('br'),
                element('span', {className: 'fldhint'}, 'your secret key')
            ],
            [
                element('input', {
                    type: 'text',
                    autocomplete: 'username',
                    className: 'hidden',
                    value: app.get('username_last_used', '')
                }),
                this.data.pass
            ]
        ], {});
        //this.data.fldlist.AddRow([null, ['remember password for ', this.data.linkset]], {});

        this.SetContent(element('form', {}, this.data.fldlist.dom.table));
    },

    onShow: function () {
        // new LinkSet(DlgPassGet.data.linkset, {
        //     300:   {next:1200,  title: '5 minutes'},
        //     1200:  {next:3600,  title: '20 minutes'},
        //     3600:  {next:18000, title: '1 hour'},
        //     18000: {next:86400, title: '5 hours'},
        //     86400: {next:300,   title: '1 day'}
        // }, app.get('pass_store_time', 300));
    },

    /**
     * close the subscriber
     * master password is expired and cleared
     * clear all the decrypted data
     */
    EventClose: function () {
        DlgPassGet.Show({escClose: false});
    },

    controls: {
        'Log off': {
            main: false,
            onClick: function () {
                this.modal.Close();
                Logout();
            }
        },
        Continue: {
            main: true,
            onClick: function () {
                var modal = this.modal;
                var pass = modal.data.pass.value;
                // check pass
                if ( app.checkPass(pass) ) {
                    initData(window.dataUser, pass, function () {
                        //app.set('pass_store_time', modal.data.linkset.value, true);
                        //app.setPass(pass);
                        modal.data.attempts = 0;
                        // reset value
                        modal.data.pass.value = '';
                        modal.Close();
                        //NoteFilter.SetFocus();
                    });
                    // if ( modal.data.linkset.value ) {
                    //     //fb(modal.data.linkset.value);
                    //     app.set('pass_store_time', modal.data.linkset.value, true);
                    //     app.setPassTime(modal.data.linkset.value);
                    // }
                } else {
                    modal.data.pass.focus();
                    modal.data.attempts++;
                    if ( modal.data.attempts === 1 )
                        modal.SetMessage('Password is invalid!');
                    else
                        modal.SetMessage(['Password is invalid!', element('br'), 'Logged attempts: ' + modal.data.attempts]);
                }
            }
        }
    }
});


DlgUserLogin = new DialogModal({
    width: 500,
    title: 'Authentication',
    hint: "Welcome back! Please authorize.",
    data: {attempts: 0},

    onCreate: function () {
        this.data.fldlist = new FieldList({
            cols: [
                {className: 'colname'},
                {className: 'colvalue'}],
            attr: {}
        });
        this.data.name = element('input', {
            className: 'line',
            autocomplete: 'username',
            type: 'text',
            value: app.get('username_last_used', '')
        });
        this.data.pass = element('input', {
            className: 'line',
            autocomplete: 'current-password',
            type: 'password'
        });
        this.data.serv = element('input', {
            className: 'line',
            autocomplete: 'server',
            type: 'url',
            value: app.get('server', 'https://fortnotes.com/')
        });

        //onEnterFocus(this.data.name, this.data.pass);
        onEnterClick(this.data.pass, this.params.controls['Login'].dom);

        this.data.fldlist.AddRow([
            [element('span', {className: 'fldname'}, 'username'),
                element('br'),
                element('span', {className: 'fldhint'}, 'your name or email')],
            this.data.name
        ], {});
        this.data.fldlist.AddRow([
            [element('span', {className: 'fldname'}, 'password'),
                element('br'),
                element('span', {className: 'fldhint'}, 'your secret key')],
            this.data.pass
        ], {});
        this.data.fldlist.AddRow([
            [element('span', {className: 'fldname'}, 'server'),
                element('br'),
                element('span', {className: 'fldhint'}, 'data storage')],
            this.data.serv
        ], {});
        this.SetContent(element('form', {}, this.data.fldlist.dom.table));
    },

    controls: {
        'Register': {
            onClick: function () {
                this.modal.Close();
                DlgUserRegister.Show({escClose: false});
            }
        },
        'Login': {
            main: true,
            onClick: function () {
                var modal = this.modal;
                // get name and pass
                var username = modal.data.name.value;
                var password = modal.data.pass.value;
                // verification
                if ( username && password ) {
                    // ajax request
                    username = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(username));
                    password = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password));
                    // block all inputs and buttons
                    modal.EnableControls(false);
                    modal.data.name.disabled = true;
                    modal.data.pass.disabled = true;
                    if ( modal.data.attempts > 1 ) {
                        modal.SetLoading("Sending server request ...");
                    }

                    app.set('server', modal.data.serv.value, true);
                    api.defaults.server = modal.data.serv.value;

                    api.post('user/auth', {name: username, pass: password, mode: 'login'}, function ( error, data ) {
                        if ( error ) {
                            console.error(error);
                            modal.SetMessage('Request error.', 'error');
                            return;
                        }

                        console.log('user auth', data);

                        if ( data ) {
                            // check returned data
                            if ( data && data.id ) {
                                initData(data, modal.data.pass.value, function () {
                                    // save user name of last login
                                    app.set('username_last_used', modal.data.name.value, true);
                                    //app.setPass(modal.data.pass.value);
                                    // reset values
                                    modal.data.name.value = '';
                                    modal.data.pass.value = '';
                                    //modal.SetHint();
                                    //modal.SetContent();
                                    //$(modal.dom.footer).hide();
                                    //modal.SetMessage(['Authentication was completed successfully.', element('br'), 'Entering secure private section ...'], 'auth');
                                    // redirect to home with delay
                                    //setTimeout(function(){
                                    //window.location.href = window.location.href;
                                    modal.Close();
                                    //NoteFilter.SetFocus();

                                    //window.pageInit.style.display = 'none';
                                    //window.pageMain.style.display = 'block';
                                    //}, 500);
                                });
                                return;
                            } else {
                                modal.data.attempts++;
                                if ( modal.data.attempts === 1 ) {
                                    modal.SetMessage('Invalid user name or password.', 'error');
                                } else {
                                    modal.SetMessage(['Invalid user name or password.', element('br'), 'Logged attempts: ' + modal.data.attempts], 'error');
                                }
                            }
                        } else {
                            modal.SetMessage('Invalid response from the server.');
                        }
                        // unblock all inputs and buttons
                        modal.EnableControls(true);
                        modal.data.name.disabled = false;
                        modal.data.pass.disabled = false;
                    });
                } else {
                    modal.SetMessage('Empty user name or password.');
                }
            }
        }
    }
});


DlgUserRegister = new DialogModal({
    width: 550,
    title: 'Registration',
    hint: "You are going to register in the system. Please note that the password you are going to enter will be used not only to login but also to encrypt/decrypt your data so choose a strong and long password. Your registration data won't be sent to the server in plain unencrypted form. Only hashes are stored on the server. We don't know your password and will never ask you to send it to us but at the same time we won't be able to remind it to you so please keep that password utmost safe.",
    data: {attempts: 0},

    onShow: function () {
        var self = this;

        api.get('captcha/uri', function ( error, data ) {
            if ( error ) {
                console.error(error);
                return;
            }

            console.log('user captcha', data);

            if ( data && data.src ) {
                self.data.cimg.src = api.defaults.server + data.src;
            } else {
                self.SetHint('New accounts registration is disabled.');
                self.SetContent('');
            }
        });
    },

    onCreate: function () {
        this.data.fldlist = new FieldList({
            cols: [
                {className: 'colname'},
                {className: 'colvalue'}],
            attr: {}
        });
        this.data.name = element('input', {type: 'text', autocomplete: 'username', className: 'line'});
        this.data.pass1 = element('input', {type: 'password', autocomplete: 'new-password', className: 'line'});
        this.data.pass2 = element('input', {type: 'password', autocomplete: 'new-password', className: 'line'});
        this.data.cimg = element('img', {width: 161, height: 75});
        this.data.code = element('input', {
            type: 'text',
            autocomplete: 'off',
            className: 'line cline',
            title: 'case insensitive code above'
        });

        // onEnterFocus(this.data.name, this.data.pass1);
        // onEnterFocus(this.data.pass1, this.data.pass2);
        // onEnterFocus(this.data.pass2, this.data.code);
        onEnterClick(this.data.code, this.params.controls['Register'].dom);

        this.data.fldlist.AddRow([
            [element('span', {className: 'fldname'}, 'username'),
                element('br'),
                element('span', {className: 'fldhint'}, 'your name or email')],
            this.data.name
        ], {});
        this.data.fldlist.AddRow([
            [element('span', {className: 'fldname'}, 'password'),
                element('br'),
                element('span', {className: 'fldhint'}, 'your secret key')],
            this.data.pass1
        ], {});
        this.data.fldlist.AddRow([
            [element('span', {className: 'fldname'}, 'confirm password'),
                element('br'),
                element('span', {className: 'fldhint'}, 'your secret key once more')],
            this.data.pass2
        ], {});
        this.data.fldlist.AddRow([
            [element('span', {className: 'fldname'}, 'captcha'),
                element('br'),
                element('span', {className: 'fldwhint'}, 'enter the code on the image to make sure this is not an automated registration')],
            [this.data.cimg, element('br'), this.data.code]
        ], {});
        //console.log(this.dom.footer);
        //$(this.dom.footer).hide();
        this.dom.footer.classList.add('hidden');
        var self = this;
        this.SetContent(element('a', {}, "I understand that my password can't be restored and will keep it safe", {
            onclick: function () {
                var container = document.getElementById('simplemodal-container');

                self.SetHint('Keep your password safe - you are the only one who knows it so there is no way to restore it!');
                //$('#simplemodal-container').css('top', ($('#simplemodal-container').css('top').replace('px','') - 80) + 'px');
                container.style.top = parseInt(container.style.top, 10) - 100 + 'px';
                self.SetContent(element('form', {}, self.data.fldlist.dom.table));
                //$(self.dom.footer).show();
                self.dom.footer.classList.remove('hidden');
                self.data.name.focus();
            }
        }));
    },

    controls: {
        Cancel: {
            onClick: function () {
                this.modal.Close();
            }
        },
        Register: {
            main: true,
            onClick: function () {
                var modal = this.modal;
                // get name and pass
                var password, username = modal.data.name.value;
                var pass1 = modal.data.pass1.value;
                var pass2 = modal.data.pass2.value;
                // verification
                if ( username && pass1 && pass2 && pass1 === pass2 ) {
                    // make hash
                    username = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(username));
                    password = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(pass1));
                    // block all inputs and buttons
                    modal.EnableControls(false);
                    modal.data.name.disabled = true;
                    modal.data.pass1.disabled = true;
                    modal.data.pass2.disabled = true;
                    if ( modal.data.attempts > 1 ) {
                        modal.SetLoading("Sending server request ...");
                    }

                    api.post('user/auth', {
                        name: username,
                        pass: password,
                        code: modal.data.code.value,
                        mode: 'register'
                    }, function ( error, data ) {
                        if ( error ) {
                            console.error(error);
                            modal.SetMessage('Request error.', 'error');
                            return;
                        }

                        console.log('user auth', data);

                        if ( data ) {
                            if ( data.code !== false ) {
                                // check returned data
                                if ( data && data.id ) {
                                    initData(data, pass1, function () {
                                        // save user name for future logins
                                        app.set('username_last_used', modal.data.name.value, true);
                                        //app.setPass(password);
                                        // reset values
                                        modal.data.name.value = '';
                                        modal.data.pass1.value = '';
                                        modal.data.pass2.value = '';
                                        //modal.SetHint();
                                        //modal.SetContent();
                                        //$(modal.dom.footer).hide();
                                        //modal.dom.footer.classList.add('hidden');
                                        //modal.SetMessage(['Registration was completed successfully.', element('br'), 'Entering secure private section ...'], 'auth');
                                        // redirect to home with delay
                                        //setTimeout(function(){
                                        //window.location.href = window.location.href;
                                        modal.Close();

                                        //window.pageInit.style.display = 'none';
                                        window.pageMain.style.display = 'block';
                                        //}, 500);
                                    });
                                    return;
                                } else {
                                    modal.data.attempts++;
                                    if ( modal.data.attempts === 1 )
                                        modal.SetMessage(['Invalid user name or password.', element('br'), 'There maybe already a user with the same name or there are some technical problems on the server.'], 'error');
                                    else
                                        modal.SetMessage(['Invalid user name or password.', element('br'), 'Logged attempts: ' + modal.data.attempts], 'error');
                                }
                            } else {
                                modal.SetMessage('Invalid captcha code. Please correct it and try once again.');
                            }
                        } else {
                            modal.SetMessage('Invalid responce from the server.');
                        }
                        // unblock all inputs and buttons
                        modal.EnableControls(true);
                        modal.data.name.disabled = false;
                        modal.data.pass1.disabled = false;
                        modal.data.pass2.disabled = false;
                    });
                } else {
                    modal.SetMessage("Empty one of the required field or passwords don't match.");
                }
            }
        }
    }
});


app.subscribe(DlgExport);
app.subscribe(DlgOptions);
app.subscribe(DlgPassGet);

window.DlgExport = DlgExport;
window.DlgOptions = DlgOptions;
window.DlgPassGet = DlgPassGet;
window.DlgUserLogin = DlgUserLogin;
window.DlgUserRegister = DlgUserRegister;
//});


// public
module.exports = {
    DlgExport: DlgExport,
    DlgOptions: DlgOptions,
    DlgPassGet: DlgPassGet,
    DlgUserLogin: DlgUserLogin,
    DlgUserRegister: DlgUserRegister
};
