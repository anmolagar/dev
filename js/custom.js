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
var displayItemCnt = 0;
var liveItemCnt = 0;
var DisplayItemrowCnt = 0;
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

function paintLiveFeeds(data) {
	$(data).find("a").each(
			function(a,b) {
				var filename = $(this).attr("href").replace("http:///", "");
				if(filename.indexOf('.jpg')==-1 && filename.indexOf('.png')==-1){
					return;
				}
				
				$('#carousel-indicators').append("<li data-target='#carousel-example-generic' data-slide-to='"+liveItemCnt+"' class='active'/>");
				liveItemCnt = liveItemCnt+1;
				
				/*
				 * $("#display").append( $("<a href='#'><img src=" + url1 +
				 * filename + " class='col-md-3'></img></a>"));
				 */
				
				try{
				var fileOnly = filename.substring(0,filename.lastIndexOf('.'));
				}
				catch(e){
					
				}
				/*var details;
				if(fileOnly){
					details = getDetail(url1 + fileOnly+".txt");
				}*/
				$("#carousel-innerDiv").append("<div class='item hight-inherit"+(liveItemCnt==1?' active':'')+"'>" +
						"							<div class='hight-inherit' id='coarousel-image"+liveItemCnt+"'>" +
						"								<img src='"+url1+filename+"' alt='pic"+liveItemCnt+"'" +
						"									class='hight-inherit'></div>" +
						"							<div class='carousel-caption' id='coarousel-cation"+liveItemCnt+"'></div>" +
						"						</div>");
				
				//getDetail(url1 + fileOnly+".txt",DisplayItemrowCnt);
				$("#coarousel-cation"+liveItemCnt).load(url1 + fileOnly+".txt");
				
	});
}

function paintDisplay(data) {
	$(data).find("a").each(
			function(a,b) {
				var filename = $(this).attr("href").replace("http:///", "");
				if(filename.indexOf('.jpg')==-1 && filename.indexOf('.png')==-1){
					return;
				}
				displayItemCnt = displayItemCnt+1;
				if(displayItemCnt%4==1){
					DisplayItemrowCnt = DisplayItemrowCnt+1;
					$("#display").append("<div id='row"+DisplayItemrowCnt+"' class='row'/>");
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
				/*var details;
				if(fileOnly){
					details = getDetail(url1 + fileOnly+".txt");
				}*/
				$("#display #row"+DisplayItemrowCnt).append("<div class='col-xs-6 col-md-3'>"
								+ "<div class='thumbnail hover-details' id='thumb"+displayItemCnt+"'>"
								+ "<img data-src='holder.js/100%x180' src='" + url1 + filename
								+ "' alt='...'><div class='caption hide' id='details"+displayItemCnt+"'>"+
										"</div></div></div>");
				
				//getDetail(url1 + fileOnly+".txt",DisplayItemrowCnt);
				$("#details"+displayItemCnt).load(url1 + fileOnly+".txt");
				
				

			});
}

function getLiveFeed() {

	var urll = url1 + url2 + live_feeds;
	$.ajax({
		url : urll,
		success : function(data) {
			paintLiveFeeds(populateFromUrl(data));
		},
		error : function(data) {
			alert(data);
		}
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

function getDetail(urll,Dcnt){
	
	$("#details"+Dcnt).load(urll);
	/*var retData;
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
	return retData;*/
}

/*
 * $("#rssFeeds").load(dir, function(data){ $(data).find("a:contains(" +
 * fileextension + ")").each(function () { var filename =
 * this.href.replace(window.location.host, "").replace("http:///", "");
 * $("#rssFeeds").append($("<img src=" + dir + filename + "></img>")); }); });
 */

