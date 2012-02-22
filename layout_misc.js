/**
 * File with misc javascript
 * 
 */

//###########################################################################################//
//Definition of a new jQuery Method that is an extended version of the $.get
$.getADS = function(url_ads, data_ads, success_ads, error_ads, dataType_ads)
{
	$.ajax({
		type: "GET",
		url: url_ads,
		data: data_ads,
		success: success_ads,
		error: error_ads,
		dataType: dataType_ads,
		timeout: 600000
	});
};

$.postADS = function(url_ads, data_ads, success_ads, error_ads, dataType_ads)
{
	$.ajax({
		type: "POST",
		url: url_ads,
		data: data_ads,
		success: success_ads,
		error: error_ads,
		dataType: dataType_ads,
		timeout: 600000
	});
};

//definition of a new jQuery method to set the cursor at a certain point of the textfield
/**** thanks to Mark from StackOverflow ****/
$.fn.selectRange = function(start, end) {
    return this.each(function() {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};

//definition of an escaping method
RegExp.escape = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//###########################################################################################//
var Misc = new Object();

//function that shows the loader
Misc.show_loader = function(where)
{
	var html_for_img = '&nbsp;&nbsp; <img src="'+IMAGE_LOADER+'"/>';
	$('#'+where).html(html_for_img);
};

//function that shows the loader
Misc.remove_loader = function(where)
{
	$('#'+where).empty();
};

//function that manage the icon and the javascript used to expande or collapse the list of facets
Misc.manage_expande_collapse = function(id, mode)
{
	if(mode == 'expand')
	{
		//first of all I show the objects
		$('#'+id).show('slow', function(){Misc.set_main_container_min_height();});
		//then I change the javascript
		$('#expand_collapse_'+id).attr('onclick', '');
		$('#expand_collapse_'+id).unbind();
		$('#expand_collapse_'+id).click(function(){Misc.manage_expande_collapse(id, 'collapse');});
	}
	else if(mode == 'collapse')
	{
		//first of all I show the objects
		$('#'+id).hide('slow', function(){Misc.set_main_container_min_height();});
		//then I change the javascript
		$('#expand_collapse_'+id).attr('onclick', '');
		$('#expand_collapse_'+id).unbind();
		$('#expand_collapse_'+id).click(function(){Misc.manage_expande_collapse(id, 'expand');});
	}
	
	//then I re-set the min height of the page
	//this.set_main_container_min_height();
};

//function that manages the expansion and collapse of the facets
Misc.expand_collapse_facets = function(id_title, id_arrow, id_facets_container, mode)
{
	if (mode == 'collapse')
	{
		//first of all I collapse the facets
		$('#'+id_facets_container).hide('slow', function(){Misc.set_main_container_min_height();});
		//then I change the arrow
		$('#'+id_arrow).attr('src', BASE_URL+'/static/figs/arrow_left.png');
		//then I change the javascript
		$('#'+id_title).attr('onclick', '');
		$('#'+id_title).unbind();
		$('#'+id_title).click(function(){Misc.expand_collapse_facets(id_title, id_arrow, id_facets_container, 'expand');});
		
	}
	else if (mode == 'expand')
	{
		//first of all I show the facets
		$('#'+id_facets_container).show('slow', function(){Misc.set_main_container_min_height();});
		//then I change the arrow
		$('#'+id_arrow).attr('src', BASE_URL+'/static/figs/arrow_expanded.png');
		//then I change the javascript
		$('#'+id_title).attr('onclick', '');
		$('#'+id_title).unbind();
		$('#'+id_title).click(function(){Misc.expand_collapse_facets(id_title, id_arrow, id_facets_container, 'collapse');});
	}
};

//function that manages the expansion and collapse of the fulltext
Misc.expand_collapse_fulltext = function(id_container, mode)
{
	//to use the bibcode I have to escape the dots
	elem = id_container.replace(/\./g, '\\.').replace(/\&/g, '\\&');
	
	if (mode == 'expand')
	{
		//I show the fulltext
		$('#'+elem).show();
		//then I change the javascript
		$('#link_'+elem).attr('onclick', '');
		$('#link_'+elem).unbind();
		$('#link_'+elem).click(function(){Misc.expand_collapse_fulltext(id_container, 'collapse');});
	}
	else if (mode == 'collapse')
	{
		//I show the fulltext
		$('#'+elem).hide();
		//then I change the javascript
		$('#link_'+elem).attr('onclick', '');
		$('#link_'+elem).unbind();
		$('#link_'+elem).click(function(){Misc.expand_collapse_fulltext(id_container, 'expand');});
	}
};

//function that retrieve the absolute position of an element in the page
Misc.getposition = function(obj)
{
	//get the position with jquery
	var pos = $(obj).position();
	
	var obj_pos = {};
	
	obj_pos.left = pos.left;
	obj_pos.top = pos.top;
	
	return  obj_pos;
};

//function that remove spaces from a string
Misc.removeSpaces = function(string)
{
	var string_no_spaces = string.split(' ').join('');
	var string_no_commas = string_no_spaces.split(',').join('');
	var string_no_apostrofe = string_no_commas.split("'").join('');
	return string_no_apostrofe;
};

//function that remove colon from a string
Misc.removeColon = function(string)
{
	return string.split(':').join('____');
};

//function to calculate the length of an associative array
//the associative arrays don't have a length property because they are considered as objects in javascript
Misc.length_assoc = function(assoc_array)
{
	var size = 0;
	for (elem in assoc_array)
		size++;
	return size;
};

//function that return a string with the first letter uppercase
Misc.initialCap = function(str) 
{
	return str.substr(0, 1).toUpperCase() + str.substr(1);
};

//function that, given a number, retrieves the closest one that is divisible by 3
Misc.div_by_three = function(number, mode)
{
	if (mode == '+')
	{
		if ((number % 3) == 0)
			return number;
		else if (((number + 1) % 3) == 0)
			return (number + 1);
		else
			return (number + 2);
	}
	else if (mode == '-')
	{
		if ((number % 3) == 0)
			return number;
		else if (((number - 1) % 3) == 0)
			return (number - 1);
		else
			return (number - 2);
	}
};

//function that sets again the min height of the abs container otherwise when I filter I can have wrapper smaller than the list of simbad objects
Misc.set_main_container_min_height = function()
{
	var increase = 80;
	//I decide how much increase the minimum according to the browser (safari and chrome give problems)
	if ($.browser.webkit)
		increase = increase + 20;
	
	if ($('#'+FACETS_WRAPPER).length > 0)
		increase = increase + $('#'+FACETS_WRAPPER).height();
	if ($('#'+FACETS_SELECTED_BOX).length > 0)
		increase = increase +  $('#'+FACETS_SELECTED_BOX).height();
	if ($('#'+ABSTRACT_FULLTEXT_LINKS).length > 0)
		increase = increase +  $('#'+ABSTRACT_FULLTEXT_LINKS).height();
	if ($('#'+RACCOMANDATION_RESULTS).length > 0)
		increase = increase +  $('#'+RACCOMANDATION_RESULTS).height();
	if ($('#'+BOX_SOCIAL_LINKS).length > 0)
		increase = increase +  $('#'+BOX_SOCIAL_LINKS).height() + 35;
	if ($('#'+BOX_EXPORT_LINKS).length > 0)
		increase = increase +  $('#'+BOX_EXPORT_LINKS).height() + 35;
		
	$('#'+ABS_WRAPPER).css('min-height', increase+'px');
};


//function that propagate the event of clicking the checkbox of a group name to all the objects of its group
Misc.propagate_selection_to_group = function(obj, class_name)
{
	//I .... the information of the checkbox of the group
	var basic_id = $(obj).val();
	var checked_status = $(obj).attr('checked');
	
	//then I propagate the status of the checkbox of the group to all the objects
	var j = 1;
	while($('#check_'+basic_id+'_'+j).length != 0)
	{
		$('#check_'+basic_id+'_'+j).attr('checked', checked_status);
		j++;
	}
	
	//and I lunch the filter of the articles in the center of the page
	eval(class_name+'.show_abstracts();');
};

//function to wrap text inside other tags
/****thanks to richleland from StackOverflow****/
Misc.wrapText = function(elementID, openTag, closeTag) 
{
    var textArea = $('#' + elementID);
    var len = textArea.val().length;
    var start = textArea[0].selectionStart;
    var end = textArea[0].selectionEnd;
    //if start and end are the same number I take the end of the string
    if (start == end)
    {
    	start = textArea.val().length;
    	end = textArea.val().length;
    }
    var selectedText = textArea.val().substring(start, end);
    var replacement = openTag + selectedText + closeTag;
    textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len));
    
    //then I 
    endrepl = start + replacement.length - closeTag.length;
    textArea.selectRange(endrepl, endrepl);
};

//function to calculate a generic logarithm
Misc.custLog = function(x,base) 
{
	// Created 1997 by Brian Risk.  http://brianrisk.com
	return (Math.log(x))/(Math.log(base));
};

//###########################################################################################//
//code to create a clear button inside an input text
Misc.clearicon = function(idfield, idicon) 
{
	if ($('#'+idfield).val().length > 0) {
    	$('#'+idicon).fadeIn(300);
    }
	else {
		$('#'+idicon).fadeOut(300);
	}
};

Misc.clearfield = function(idfield, idicon)
{
	$('#'+idfield).val('');
	$('#'+idicon).delay(700).fadeOut(300);
	$('#'+idfield).focus();
};


//###########################################################################################//
//functions that converts the html entities to real characters;
// http://www.prodevtips.com/2008/10/21/jquery-plugin-html-decode-and-encode/
Misc.isEncHTML = function(str) 
{
	if(str.search(/&amp;/g) != -1 || str.search(/&lt;/g) != -1 || str.search(/&gt;/g) != -1)
		return true;
	else
		return false;
};

Misc.decHTMLifEnc = function(str)
{
	if (this.isEncHTML(str))
		return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
	return str;
};
//###########################################################################################//
//code that compresses a list of bibcodes
Misc.compressBibcodeList = function(bibcodeList)
{
	//I define a function that compares two bibcodes and returns the first part in common
	//if the two strings are completely different (in other words they start with 2 different characters), I return an empty string
	function diff_bibcodes(bib1, bib2)
	{
		var in_comm = '';
		for (var idx in bib1)
		{
			if (bib1[idx] == bib2[idx])
				in_comm += bib1[idx];
			else
				break;
		}
		return in_comm;
	};
	
	//I sort the list in desc mode
	bibcodeList.sort(function(x,y){return ((x < y) ? 1 : ((x > y) ? -1 : 0));});
	//console.log(bibcodeList)
	//I define a variable for the final string
	var bibcodestring = '';
	//and another that will contain the previous bibcode
	var prev_bibcode = '';
	//then I process the bibcodes
	for (var i in bibcodeList)
	{
		//I extract the current bibcode
		var cur_bibcode = bibcodeList[i];
		//I compare it with the previous one and I extract the part in common
		var str_in_comm = diff_bibcodes(cur_bibcode, prev_bibcode);
		//then I remove the part in common from the current bibcode
		var new_str = cur_bibcode.substring(str_in_comm.length, cur_bibcode.length);
		//then I append this string to the global string to return with a separator
		bibcodestring = bibcodestring + new_str + '|';
		//then I set the prev bibcode to the current one for the next cicle
		prev_bibcode = cur_bibcode;
	}
	//I remove the last character because is a separator that I don't need
	bibcodestring = bibcodestring.substring(0, (bibcodestring.length - 1));
	//console.log(bibcodestring)
	return bibcodestring;
};






