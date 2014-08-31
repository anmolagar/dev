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

function paintDisplay(data)
{
	$(data).find("a").each(
			function() {
				var filename = $(this).attr("href").replace("http:///", "");
				$("#display").append(
						$("<a href=#><img src=" + url1 + filename
								+ " class='col-md-3'></img></a>"));
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

/*
 * $("#rssFeeds").load(dir, function(data){ $(data).find("a:contains(" +
 * fileextension + ")").each(function () { var filename =
 * this.href.replace(window.location.host, "").replace("http:///", "");
 * $("#rssFeeds").append($("<img src=" + dir + filename + "></img>")); }); });
 */

