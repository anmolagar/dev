/*http://stackoverflow.com/questions/18480550/how-to-load-all-the-images-from-one-of-my-folder-into-my-web-page-using-jquery*/
/*var dir = "images/";
 var fileextension = ".png";
 $.ajax({
 //This will retrieve the contents of the folder if the folder is configured as 'browsable'
 url: dir,
 success: function (data) {
 //Lsit all png file names in the page
 $(data).find("a:contains(" + fileextension + ")").each(function () {
 var filename = this.href.replace(window.location.host, "").replace("http:///", "");
 $("body").append($("<img src=" + dir + filename + "></img>"));
 });
 }
 });*/

var url1 = "https://www.googledrive.com";
var url2 = "/host/0B37v0cgU8tVPTGhWaEVpU1FnejQ/";
var display = "display";
var live_feeds = "live feeds";
var products = "products";
var debug;
var new_data;
var fileextension = ".JPG";

function populateFromUrl(data) {

	return $(data).map(function(a, d) {
		var cnt = $(d);
		if (cnt.hasClass('folder-content')) {
			return cnt;
		}
	})[0].children().map(function(i, d) {
		if (i > 2)
			return d;
	});
}

function paintDisplay(data) {
	$(data).find("a").each(
			function() {
				var filename = $(this).attr("href").replace("http:///", "");
				if(filename.contains('.txt')){
					return;
				}
				/*
				 * $("#display").append( $("<a href='#'><img src=" + url1 +
				 * filename + " class='col-md-3'></img></a>"));
				 */
				try{
				var fileOnly = filename.substring(0,filename.lastIndexOf('.'));
				}
				catch(e){
					
				}
				var details;
				if(fileOnly){
					details = getDetail(url1 + fileOnly+".txt");
				}
				$("#display").append(
						("<div class='col-xs-6 col-md-3'>"
								+ "<div class='thumbnail'>"
								+ "<img data-src='holder.js/100%x180' src='" + url1 + filename
								+ "' alt='...'><div class='caption hide'>" + details+
										"</div></div></div>"));

			});
}

function getDisplay() {

	var urll = url1 + url2 + display;
	$.ajax({
		url : urll,
		success : function(data) {
			paintDisplay(populateFromUrl(data));
		},
		error : function(data) {
			alert(data);
		}
	});
}

function getDetail(urll){
	var retData;
	$.ajax({
		url : urll,
		async:false,
		success : function(d) {
			retData = d;
		},
		error : function(d) {
			retData = "No details available";
		}
	});
	return retData;
}

/*
 * $("#rssFeeds").load(dir, function(data){ $(data).find("a:contains(" +
 * fileextension + ")").each(function () { var filename =
 * this.href.replace(window.location.host, "").replace("http:///", "");
 * $("#rssFeeds").append($("<img src=" + dir + filename + "></img>")); }); });
 */

