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

var url1 = "https://googledrive.com";
// var url2_anmol = "/host/0B37v0cgU8tVPTGhWaEVpU1FnejQ/";
var url2 = "/host/0Bx5cpAhwRTVEUjQxclg3T3dvZ0E/";
var display = "Display";
var live_feeds = "livefeeds";
var products = "Products";
var aboutUs = "About%20Us!/AboutUs.txt";
var contactUs = "Contact%20Us!/ContactUs.txt"
var debug;
var new_data;
var fileextension = ".jpg";
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

function paintLiveFeeds(data, caption) {
	liveItemCnt = 0;
	$(data)
			.find("a")
			.each(
					function(a, b) {
						var filename = $(this).attr("href").replace("http:///",
								"");
						if (filename.indexOf('.jpg') == -1
								&& filename.indexOf('.png') == -1) {
							return;
						}

						$('#carousel-indicators').append(
								"<li data-target='#carousel-example-generic' data-slide-to='"
										+ liveItemCnt + "' class='active'/>");
						liveItemCnt = liveItemCnt + 1;

						/*
						 * $("#display").append( $("<a href='#'><img src=" +
						 * url1 + filename + " class='col-md-3'></img></a>"));
						 */

						try {
							var fileOnly = filename.substring(0, filename
									.lastIndexOf('.'));
						} catch (e) {

						}
						/*
						 * var details; if(fileOnly){ details = getDetail(url1 +
						 * fileOnly+".txt"); }
						 */
						$("#carousel-innerDiv")
								.append(
										"<div class='item hight-inherit"
												+ (liveItemCnt == 1 ? ' active'
														: '')
												+ "'>"
												+ "							<div align='center' class='hight-inherit' id='coarousel-image"
												+ liveItemCnt
												+ "'>"
												+ "								<img src='"
												+ url1
												+ filename
												+ "' alt='pic"
												+ liveItemCnt
												+ "'"
												+ "									class='hight-inherit'></div>"
												+ "							<div class='carousel-caption' id='coarousel-cation"
												+ liveItemCnt + "'></div>"
												+ "						</div>");

						// getDetail(url1 + fileOnly+".txt",DisplayItemrowCnt);
						if (caption) {
							$("#coarousel-cation" + liveItemCnt).load(
									url1 + fileOnly + ".txt");
						}

					});
	$('.carousel').carousel();
}

function paintDisplay(data) {
	$(data)
			.find("a")
			.each(
					function(a, b) {
						var filename = $(this).attr("href").replace("http:///",
								"");
						if (filename.indexOf('.jpg') == -1
								&& filename.indexOf('.png') == -1) {
							return;
						}
						displayItemCnt = displayItemCnt + 1;
						if (displayItemCnt % 4 == 1) {
							DisplayItemrowCnt = DisplayItemrowCnt + 1;
							$("#display").append(
									"<div id='row" + DisplayItemrowCnt
											+ "' class='row'/>");
						}
						/*
						 * $("#display").append( $("<a href='#'><img src=" +
						 * url1 + filename + " class='col-md-3'></img></a>"));
						 */

						try {
							var fileOnly = filename.substring(0, filename
									.lastIndexOf('.'));
						} catch (e) {

						}
						/*
						 * var details; if(fileOnly){ details = getDetail(url1 +
						 * fileOnly+".txt"); }
						 */
						$("#display #row" + DisplayItemrowCnt)
								.append(
										"<div class='col-xs-6 col-md-3'>"
												+ "<div class='thumbnail hover-details' id='thumb"
												+ displayItemCnt
												+ "'>"
												+ "<img data-src='holder.js/100%x180' src='"
												+ url1
												+ filename
												+ "' alt='...'><div class='caption hide' id='details"
												+ displayItemCnt + "'>"
												+ "</div></div></div>");

						// getDetail(url1 + fileOnly+".txt",DisplayItemrowCnt);
						$("#details" + displayItemCnt).load(
								url1 + fileOnly + ".txt");

					});

}

/*
 * function paintProductTree(data) { var treeDiv = $("<div/>");
 * $(data).find("a").each( function(a,b) { var filename =
 * $(this).attr("href").replace("http:///", ""); var tree = $("<div
 * class='tree'><ul><li><a href='#'
 * onclick=\"getChildren1('"+filename+"',this)\">"+filename.substring(filename.lastIndexOf("/")+1).replace(/%20/g,"
 * ")+"</a></li></ul></div>"); treeDiv.append(tree); });
 * $('#product_list').html(treeDiv); }
 */

function getChildren1(foldername, elem) {
	var urll = url1 + foldername;
	$.ajax({
		url : urll,
		success : function(data) {
			paintChilren2(populateFromUrl(data), elem);
		},
		error : function(data) {
			alert("Error loading data!");
		}
	});
}

function paintChilren2(data, elem) {
	if ($(elem).parent('li').children().length == 1) {
		var children = $(data).find("a");
		var temp = children.attr('href');
		if (temp.indexOf('.jpg') != -1 || temp.indexOf('.png') != -1) {

			$('#product_detail')
					.html(
							"<div id=\"carousel-example-generic\" "
									+ "class=\"carousel slide hight-inherit\" data-ride=\"carousel\"> "
									+ "<ol class=\"carousel-indicators\" id=\"carousel-indicators\"> "
									+ "</ol>"
									+ "<div class=\"carousel-inner hight-inherit\" id=\"carousel-innerDiv\">"
									+ "</div>"
									+ "<a class=\"left carousel-control\" href=\"#carousel-example-generic\" "
									+ "role=\"button\" data-slide=\"prev\"> <span "
									+ "class=\"glyphicon glyphicon-chevron-left\"></span>"
									+ "</a> <a class=\"right carousel-control\" href=\"#carousel-example-generic\" "
									+ "role=\"button\" data-slide=\"next\"> <span "
									+ "class=\"glyphicon glyphicon-chevron-right\"></span>"
									+ "</a>" + "</div>");

			paintLiveFeeds(data, false);
			var desc = temp.substring(0,temp.lastIndexOf("/"))+"/description.txt";
			$('#product_desc').html("");
			$('#product_desc').load(url1+desc);
			$('#product_list').click();
			return;
		}
		var treeDiv = $(elem).parent('li').append("<ul/>").children('ul');
		children
				.each(function(a, b) {
					var filename = $(this).attr("href").replace("http:///", "");
					var tree = $("<li style=\"display: none;\"><a href='#' onclick=\"getChildren1('"
							+ filename
							+ "',this)\">"
							+ filename.substring(filename.lastIndexOf("/") + 1)
									.replace(/%20/g, " ") + "</a></li>");
					treeDiv.append(tree);
				});
	}
	treeAnimate($(elem).parent('li'));
}

function treeAnimate(elem) {
	var children = elem.find('> ul > li');
	if (children.is(":visible"))
		children.hide('fast');
	else
		children.show('fast');
	/* e.stopPropagation(); */
}
function getLiveFeed() {

	var urll = url1 + url2 + live_feeds;
	$.ajax({
		url : urll,
		success : function(data) {
			paintLiveFeeds(populateFromUrl(data), true);
		},
		error : function(data) {
			alert("Error getting live feeds!");
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
			alert("Error getting fresh display!");
		}
	});
}

function getProduct() {
	var root = $('#product_list a');
	getChildren1(url2 + products, root[0]);
	root.click();
}

function loadAboutUs() {
	$("#about_us_content").load(url1 + url2 + aboutUs)
}

function loadContactUs() {
	$("#about_us_content").load(url1 + url2 + contactUs)
}

function getDetail(urll, Dcnt) {

	$("#details" + Dcnt).load(urll);
	/*
	 * var retData; $.ajax({ url : urll, async:false, success : function(d) {
	 * retData = d; }, error : function(d) { retData = "No details available"; }
	 * }); return retData;
	 */
}

function findBootstrapDeviceSize() {
	  var dsize = ['lg', 'md', 'sm', 'xs'];
	  for (var i = dsize.length - 1; i >= 0; i--) {

	    // Need to add &nbsp; for Chrome. Works fine in Firefox/Safari/Opera without it.
	    // Chrome seem to have an issue with empty div's
	    $el = $('<div id="sizeTest" class="hidden-'+dsize[i]+'">&nbsp;</div>');
	    $el.appendTo($('body'));

	    if ($el.is(':hidden')) {
	      $el.remove();
	      return dsize[i];
	    }
	  }

	  return 'unknown';
	}

function initialise(){
	/*var dev = findBootstrapDeviceSize();
	if(dev=='lg'){
		$(document.body).css('padding-top','122px');
	}
	else if(dev=='md'){
		$(document.body).css('padding-top','163px');
	}*/
	
		$(document.body).css('padding-top',80+Number.parseInt($('#menu-list').css('height').replace('px',''))+'px');
	
	
}

