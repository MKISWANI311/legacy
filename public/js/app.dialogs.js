var DlgExport = null;
var DlgOptions = null;
var DlgPassGet = null;
var DlgUserLogin = null;
var DlgUserRegister = null;


// the DOM is ready
$(function(){
    DlgExport = new DialogModal({
        width    : 750,
        title    : 'Data export',
        hint     : 'Here you can get all your data unencrypted.',
        dom      : {},

        onCreate : function(){
            this.SetContent(this.dom.text = element('textarea', {className:'export'}));
        },

        /**
         * Open the subscriber
         * master password is accessible
         * decrypt all the data and show it
         */
        EventOpen : function () {
            if ( export_data ) {
                setTimeout(function(){
                    DlgExport.Show();
                    for ( var id_note in export_data.notes ) {
                        // check type
                        if ( export_data.notes[id_note] instanceof Array ) {
                            export_data.notes[id_note].each(function(entry){
                                var name = App.Decode(entry.name, true);
                                var data = App.Decode(entry.data, true);
                                if ( name && data ) {
                                    DlgExport.dom.text.value += name + ': ' + data + "\n";
                                }
                            });
                        }
                        // check type
                        if ( export_data.note_tags[id_note] instanceof Array ) {
                            var tags = [];
                            export_data.note_tags[id_note].each(function(id_tag){
                                if ( export_data.tags[id_tag] ) tags.push(App.Decode(export_data.tags[id_tag], true));
                            });
                            if ( tags.length > 0 ) {
                                DlgExport.dom.text.value += 'tags: ' + tags.join(' ') + "\n";
                            }
                        }
                        DlgExport.dom.text.value += "\n";
                    }
                    // strip
                    DlgExport.dom.text.value = DlgExport.dom.text.value.trim();
                    export_data = null;
                }, 50);
            }
        },

        /**
         * close the subscriber
         * master password is expired and cleared
         * clear all the decrypted data
         */
        EventClose : function () {
            DlgExport.Close();
        },

        controls : {
            'Close' : {
                main    : true,
                onClick : function(){
                    //var modal = this.modal;
                    this.modal.Close();
                }
            }
        }
    });


    DlgOptions = new DialogModal({
        width    : 650,
        title    : 'Options',
        hint     : 'Here you can create/restore backups and export all your data.',

        onCreate : function(){
            var file = element('input', {type:'file', name:'file', id:'file-upload', onchange:function(){
                    hint.innerHTML = this.value;
                    fbtn.value = 'File selected';
                }});
            var fbtn = element('input', {type:'button', className:'button long', value:'Choose file ...', onclick:function(){
                    $(file).trigger('click');
                }});
            var hint = element('div', {className:'fhint'});

            this.SetContent([
                element('div', {className:'desc'}, "Backup is an archived package of all your encrypted data. It can't be read by human but can be used to restore your account info or setup a copy on some other FortNotes instance."),
                element('input', {type:'button', className:'button long', value:'Create backup', onclick:function(){
                        window.location = 'user/export/zip';
                    }}),
                element('div', {className:'desc'}, "Please specify your previuosly downloaded backup package and then press the \"Restore backup\" button. It will upload your backup to the server and replace all your current data with the data from this backup. Warning: this operation can't be reverted!"),
                element('div', {}, [
                    element('input', {type:'button', className:'button long', value:'Restore backup', onclick:function(){
                            var btn = this;
                            btn.value = 'Uploading ...';
                            btn.disabled = true;
                            var data = new FormData();
                            data.append('file', file.files[0]);
                            $.ajax({
                                url: 'user/import/zip',
                                data: data,
                                cache: false,
                                contentType: false,
                                processData: false,
                                type: 'POST',
                                dataType: 'json',
                                success: function(data) {
                                    btn.value = 'Restore backup';
                                    btn.disabled = false;
                                    if ( data && data.error ) {
                                        alert('Restore from backup failed. Error: ' + data.error);
                                    } else {
                                        alert('The restore process has completed successfully and now the page will be reloaded to apply the restored data.');
                                        // We must reload the whole page to update data_tags
                                        window.location.reload();
                                    }
                                }
                            });
                        }}), ' ',
                    fbtn,
                    hint
                ]),
                element('div', {className:'desc'}, "It's possible to export all the data in a human readable form in order to print it or save in file on some storage. It'll give all the data in plain unencrypted form. The password is required."),
                element('input', {type:'button', className:'button long', value:'Export data', onclick:function(){
                        var btn = this;
                        btn.value = 'Loading ...';
                        btn.disabled = true;
                        $.get('user/export/plain', function(data) {
                            btn.value = 'Export data';
                            btn.disabled = false;
                            export_data = data;
                            App.ExpirePass();
                        });
                    }})
            ]);
        },

        /**
         * close the subscriber
         * master password is expired and cleared
         * clear all the decrypted data
         */
        EventClose : function () {
            DlgOptions.Close();
        },

        controls : {
            'Close' : {
                main    : true,
                onClick : function(){
                    this.modal.Close();
                }
            }
        }
    });


    DlgPassGet = new DialogModal({
        width    : 500,
        title    : 'Password',
        hint     : 'Please enter your password to unlock encrypted data.',
        data     : {attempts:0},

        onCreate : function(){
            this.data.fldlist = new FieldList({
                cols: [
                    {className:'colname'},
                    {className:'colvalue'}],
                attr: {}
            });
            this.data.pass    = element('input', {type:'password', autocomplete:'current-password', className:'line'});
            this.data.linkset = element('a', {className:'combo', title:'click to change the password storing time'});
            onEnterClick(this.data.pass, this.params.controls['Continue'].dom);

            this.data.fldlist.AddRow([
                [
                    element('span', {className:'fldname'}, 'password'),
                    element('br'),
                    element('span', {className:'fldhint'}, 'your secret key')
                ],
                [
                    element('input', {type:'text', autocomplete:'username', className:'hidden', value:App.Get('username_last_used', '')}),
                    this.data.pass
                ]
            ], {});
            //this.data.fldlist.AddRow([null, ['remember password for ', this.data.linkset]], {});

            this.SetContent(element('form', {}, this.data.fldlist.dom.table));
        },

        onShow   : function(){
            // new LinkSet(DlgPassGet.data.linkset, {
            //     300:   {next:1200,  title: '5 minutes'},
            //     1200:  {next:3600,  title: '20 minutes'},
            //     3600:  {next:18000, title: '1 hour'},
            //     18000: {next:86400, title: '5 hours'},
            //     86400: {next:300,   title: '1 day'}
            // }, App.Get('pass_store_time', 300));
        },

        /**
         * close the subscriber
         * master password is expired and cleared
         * clear all the decrypted data
         */
        EventClose : function () {
            DlgPassGet.Show({escClose:false});
        },

        controls : {
            'Log off' : {
                main    : false,
                onClick : function(){
                    this.modal.Close();
                    SignOut();
                }
            },
            'Continue' : {
                main    : true,
                onClick : function(){
                    var modal = this.modal;
                    var pass  = modal.data.pass.value;
                    // check pass
                    if ( App.CheckPass(pass) ) {
                        initData(data_user, function () {
                            //App.Set('pass_store_time', modal.data.linkset.value, true);
                            App.SetPass(pass);
                            modal.data.attempts = 0;
                            // reset value
                            modal.data.pass.value = '';
                            modal.Close();
                            //NoteFilter.SetFocus();
                        });
                        // if ( modal.data.linkset.value ) {
                        //     //fb(modal.data.linkset.value);
                        //     App.Set('pass_store_time', modal.data.linkset.value, true);
                        //     App.SetPassTime(modal.data.linkset.value);
                        // }
                    } else {
                        modal.data.pass.focus();
                        modal.data.attempts++;
                        if ( modal.data.attempts == 1 )
                            modal.SetMessage('Password is invalid!');
                        else
                            modal.SetMessage(['Password is invalid!', element('br'), 'Logged attempts: ' + modal.data.attempts]);
                    }
                }
            }
        }
    });


    DlgUserLogin = new DialogModal({
        width : 500,
        title : 'Authentication',
        hint  : "Welcome back! Please authorize.",
        data  : {attempts:0},

        onCreate : function(){
            this.data.fldlist = new FieldList({
                cols: [
                    {className:'colname'},
                    {className:'colvalue'}],
                attr: {}
            });
            this.data.name = element('input', {className:'line', autocomplete:'username', type:'text', value:App.Get('username_last_used', '')});
            this.data.pass = element('input', {className:'line', autocomplete:'current-password', type:'password'});

            onEnterFocus(this.data.name, this.data.pass);
            onEnterClick(this.data.pass, this.params.controls['Login'].dom);

            this.data.fldlist.AddRow([
                [element('span', {className:'fldname'}, 'username'),
                    element('br'),
                    element('span', {className:'fldhint'}, 'your name or email')],
                this.data.name
            ], {});
            this.data.fldlist.AddRow([
                [element('span', {className:'fldname'}, 'password'),
                    element('br'),
                    element('span', {className:'fldhint'}, 'your secret key')],
                this.data.pass
            ], {});
            this.SetContent(element('form', {}, this.data.fldlist.dom.table));
        },

        controls : {
            'Cancel' : {
                onClick : function(){
                    this.modal.Close();
                }
            },
            'Login' : {
                main    : true,
                onClick : function(){
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
                        $.post('/user/auth', {name:username, pass:password, mode:'login'}, function(data){
                            if ( data ) {
                                // check returned data
                                if ( data && data.id ) {
                                    initData(data, function () {
                                        // save user name of last login
                                        App.Set('username_last_used', modal.data.name.value, true);
                                        App.SetPass(modal.data.pass.value);
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

                                        pageInit.style.display = 'none';
                                        //pageMain.style.display = 'block';
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
        width : 550,
        title : 'Registration',
        hint  : "You are going to register in the system. Please note that the password you are going to enter will be used not only to login but also to encrypt/decrypt your data so choose a strong and long password. Your registration data won't be sent to the server in plain unencrypted form. Only hashes are stored on the server. We don't know your password and will never ask you to send it to us but at the same time we won't be able to remind it to you so please keep that password utmost safe.",
        data  : {attempts:0},

        onShow : function(){
            var self = this;
            $.post('/user/captcha', function(data){
                self.data.cimg.src = data.src;
            });
        },

        onCreate : function(){
            this.data.fldlist = new FieldList({
                cols: [
                    {className:'colname'},
                    {className:'colvalue'}],
                attr: {}
            });
            this.data.name  = element('input', {type:'text', autocomplete:'username', name:'username', className:'line'});
            this.data.pass1 = element('input', {type:'password', autocomplete:'new-password', className:'line'});
            this.data.pass2 = element('input', {type:'password', autocomplete:'new-password', className:'line'});
            this.data.cimg  = element('img',   {width:161, height:75});
            this.data.code  = element('input', {type:'text', autocomplete:'off', className:'line cline', title:'case insensitive code above'});

            onEnterFocus(this.data.name,  this.data.pass1);
            onEnterFocus(this.data.pass1, this.data.pass2);
            onEnterFocus(this.data.pass2, this.data.code);
            onEnterClick(this.data.code,  this.params.controls['Register'].dom);

            this.data.fldlist.AddRow([
                [element('span', {className:'fldname'}, 'username'),
                    element('br'),
                    element('span', {className:'fldhint'}, 'your name or email')],
                this.data.name
            ], {});
            this.data.fldlist.AddRow([
                [element('span', {className:'fldname'}, 'password'),
                    element('br'),
                    element('span', {className:'fldhint'}, 'your secret key')],
                this.data.pass1
            ], {});
            this.data.fldlist.AddRow([
                [element('span', {className:'fldname'}, 'confirm password'),
                    element('br'),
                    element('span', {className:'fldhint'}, 'your secret key once more')],
                this.data.pass2
            ], {});
            this.data.fldlist.AddRow([
                [element('span', {className:'fldname'}, 'captcha'),
                    element('br'),
                    element('span', {className:'fldwhint'}, 'enter the code on the image to make sure this is not an automated registration')],
                [this.data.cimg, element('br'), this.data.code]
            ], {});
            $(this.dom.footer).hide();
            var self = this;
            this.SetContent(element('a', {}, "I understand that my password can't be restored and will keep it safe", {onclick:function(){
                    self.SetHint('Keep your password safe - you are the only one who knows it so there is no way to restore it!');
                    $('#simplemodal-container').css('top', ($('#simplemodal-container').css('top').replace('px','') - 80) + 'px');
                    self.SetContent(element('form', {}, self.data.fldlist.dom.table));
                    $(self.dom.footer).show();
                    self.data.name.focus();
                }}));
        },

        controls : {
            'Cancel' : {
                onClick : function(){
                    this.modal.Close();
                }
            },
            'Register' : {
                main    : true,
                onClick : function(){
                    var modal = this.modal;
                    // get name and pass
                    var password, username = modal.data.name.value;
                    var pass1 = modal.data.pass1.value;
                    var pass2 = modal.data.pass2.value;
                    // verification
                    if ( username && pass1 && pass2 && pass1 == pass2 ) {
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
                        $.post('/user/auth', {name:username, pass:password, code:modal.data.code.value, mode:'register'}, function(data){
                            if ( data ) {
                                if ( data.code !== false ) {
                                    // check returned data
                                    if ( data && data.id ) {
                                        // save user name for future logins
                                        App.Set('username_last_used', modal.data.name.value, true);
                                        App.SetPass(password);
                                        // reset values
                                        modal.data.name.value = '';
                                        modal.data.pass1.value = '';
                                        modal.data.pass2.value = '';
                                        modal.SetHint();
                                        modal.SetContent();
                                        $(modal.dom.footer).hide();
                                        modal.SetMessage(['Registration was completed successfully.', element('br'), 'Entering secure private section ...'], 'auth');
                                        // redirect to home with delay
                                        setTimeout(function(){
                                            //window.location.href = window.location.href;
                                            modal.Close();
                                            initData(data);
                                            pageInit.style.display = 'none';
                                            pageMain.style.display = 'block';
                                        }, 500);
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


    App.Subscribe(DlgExport);
    App.Subscribe(DlgOptions);
    App.Subscribe(DlgPassGet);
});
