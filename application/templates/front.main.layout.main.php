<script type="text/javascript">

	/**
	* Parse data and fill the select list
	*/
	function RequestUrlIcon ( url ) {
		var link = url;
		var favicon_xpath = "/html/head/link[@rel='icon'] | /html/head/link[@rel='ICON'] | /html/head/link[@rel='shortcut icon'] | /html/head/link[@rel='SHORTCUT ICON']";
		url = 'http://query.yahooapis.com/v1/public/yql?q=' +
			'select href from html where url="' + encodeURIComponent(url) + '" and xpath="' + favicon_xpath + '"' +
			'&format=json';
		$.ajax(url, {
			crossDomain:true,
			dataType:'json',
			success: function(data){
				var img = null;
				if ( data && data.query && data.query.results && data.query.results ) {
					if ( data.query.results.link instanceof Array ) {
						img = data.query.results.link[0].href;
					} else {
						img = data.query.results.link.href;
					}
					fb(link, img);
				} else {
					fb(link, data.query.results);
				}
			}
		});

		//jsonp(url);
	}

	/**
	 * Comment
	 */
	function NoteTableFill () {
		NoteTable.fnClearTable(true);
		var data = NoteTable.data;
		for ( var id_note in data ) {
			//var id_note = NoteTable.data[i][notes.defn.id];
			var note = [id_note];
			var icon = '';

			var entries = data[id_note].entries;
			for ( var j in entries ) {
				if ( entries[j].id_type == 2 ) {
					//fb(obj.aData[0], entries[j]);
					var url = App.Decode(entries[j].data);
					//fb(data);

					//return;
					url = url.replace('http://', '');
					url = url.replace('https://', '');
					url = url.split('/');
					if ( url[0] ) {
						icon = url[0];
						//RequestUrlIcon(icon);
					}
				}
			}
			note.push(icon);
			note.push(TimestampToDateStr(data[id_note].mtime));
			note.push(TagManager.IDs2Str(data[id_note].tags));
			//note.push(element('div', {}, 'qwe'));
			NoteTable.fnAddData(note);
		}
	}

	/**
	 * Comment
	 */
	function NoteTableFilter ( data ) {
		NoteTable.fnClearTable(true);
		var tags = [];
		//var data = this.value;
		if ( data ) {
			data = data.match(/(\S+)/g);
			//fb(data);
			var i, words = [];
			// check parsed string
			if ( data && data instanceof Array ) {
				// iterate words in the input string
				for ( i = 0; i < data.length; i++ ) {
					// check if this word already processed
					if ( words.indexOf(data[i]) < 0 ) {
						if ( data_tags_nmlist[data[i]] ) {
							// tag found in the global data
							tags.push(data_tags_nmlist[data[i]]);
						} else {
							// not found
						}
						// add word
						words.push(data[i]);
					}
				}
			}
		}
		//fb(tags);
		$.post('/note/search/', {tags:tags}, function(data){
			if ( !data.error ) {
				NoteTable.data = {};
				for ( var i = 0; i < data.length; i++) {
					NoteTable.data[data[i].id] = data[i];
				}
				NoteTableFill();
			}
		});
	}

	$(function(){

	});

</script>

<style type="text/css">
	#search_help {
		background-color: #F9F9F9;
		border: 1px solid #EEEEEE;
		margin: 20px 10px;
		padding: 5px;
		color: #aaa;
	}
</style>

<div style="padding:10px">
	<div id="handle_notemanager"></div>

	<div id="search_help">
		<div class="message hint">
			Please take a quick look at this hint on how to find your information.<br>
			Hope you will find this useful and convenient.<br>
			<br>
			All the note can have any set of tags. It's possible to organize and search notes with the help of tags.<br>
			In the block above you can enter a couple of tags which are present in the note you are going to find at the moment.<br>
			<br>
			There are three ways to do the search.<br>
			<br>
			<b>1</b>. You can just type tag names separated by space. For example type "site work important" and press Enter key.
			This will find all the notes with all the specified tags.<br>
			<br>
			<b>2</b>. Another option is to specify tags with minus in front of them in order to find only the notes where there are no such tags.
			For example type "-icq -msn" and press Enter key. This will find all the notes where there are no tags "icq" and "msn".<br>
			<br>
			<b>3</b>. Combination of the two above methods. The search query "ftp -home -temp" will give you notes with "ftp" tag but exclude the ones having "home" or "temp".<br>
			<br>
			After search performing and receiving some results you can include any new tag into the search by clicking it in the note list.
		</div>

	</div>
</div>