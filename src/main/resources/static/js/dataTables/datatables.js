/*
 * This combined file was created by the DataTables downloader builder:
 *   https://datatables.net/download
 *
 * To rebuild or modify this file with the latest versions of the included
 * software please visit:
 *   https://datatables.net/download/#dt/dt-1.12.1/e-2.0.10/b-2.2.3/sl-1.4.0
 *
 * Included libraries:
 *   DataTables 1.12.1, Editor 2.0.10, Buttons 2.2.3, Select 1.4.0
 */

/*! DataTables 1.12.1
 * ©2008-2022 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     DataTables
 * @description Paginate, search and order HTML tables
 * @version     1.12.1
 * @author      SpryMedia Ltd
 * @contact     www.datatables.net
 * @copyright   SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

/*jslint evil: true, undef: true, browser: true */
/*globals $,require,jQuery,define,_selector_run,_selector_opts,_selector_first,_selector_row_indexes,_ext,_Api,_api_register,_api_registerPlural,_re_new_lines,_re_html,_re_formatted_numeric,_re_escape_regex,_empty,_intVal,_numToDecimal,_isNumber,_isHtml,_htmlNumeric,_pluck,_pluck_order,_range,_stripHtml,_unique,_fnBuildAjax,_fnAjaxUpdate,_fnAjaxParameters,_fnAjaxUpdateDraw,_fnAjaxDataSrc,_fnAddColumn,_fnColumnOptions,_fnAdjustColumnSizing,_fnVisibleToColumnIndex,_fnColumnIndexToVisible,_fnVisbleColumns,_fnGetColumns,_fnColumnTypes,_fnApplyColumnDefs,_fnHungarianMap,_fnCamelToHungarian,_fnLanguageCompat,_fnBrowserDetect,_fnAddData,_fnAddTr,_fnNodeToDataIndex,_fnNodeToColumnIndex,_fnGetCellData,_fnSetCellData,_fnSplitObjNotation,_fnGetObjectDataFn,_fnSetObjectDataFn,_fnGetDataMaster,_fnClearTable,_fnDeleteIndex,_fnInvalidate,_fnGetRowElements,_fnCreateTr,_fnBuildHead,_fnDrawHead,_fnDraw,_fnReDraw,_fnAddOptionsHtml,_fnDetectHeader,_fnGetUniqueThs,_fnFeatureHtmlFilter,_fnFilterComplete,_fnFilterCustom,_fnFilterColumn,_fnFilter,_fnFilterCreateSearch,_fnEscapeRegex,_fnFilterData,_fnFeatureHtmlInfo,_fnUpdateInfo,_fnInfoMacros,_fnInitialise,_fnInitComplete,_fnLengthChange,_fnFeatureHtmlLength,_fnFeatureHtmlPaginate,_fnPageChange,_fnFeatureHtmlProcessing,_fnProcessingDisplay,_fnFeatureHtmlTable,_fnScrollDraw,_fnApplyToChildren,_fnCalculateColumnWidths,_fnThrottle,_fnConvertToWidth,_fnGetWidestNode,_fnGetMaxLenString,_fnStringToCss,_fnSortFlatten,_fnSort,_fnSortAria,_fnSortListener,_fnSortAttachListener,_fnSortingClasses,_fnSortData,_fnSaveState,_fnLoadState,_fnSettingsFromNode,_fnLog,_fnMap,_fnBindAction,_fnCallbackReg,_fnCallbackFire,_fnLengthOverflow,_fnRenderer,_fnDataSource,_fnRowAttributes*/

(function( factory ) {
	"use strict";

	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				// CommonJS environments without a window global must pass a
				// root. This will give an error otherwise
				root = window;
			}

			if ( ! $ ) {
				$ = typeof window !== 'undefined' ? // jQuery's factory checks for a global window
					require('jquery') :
					require('jquery')( root );
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		window.DataTable = factory( jQuery, window, document );
	}
}
(function( $, window, document, undefined ) {
	"use strict";

	
	var DataTable = function ( selector, options )
	{
		// When creating with `new`, create a new DataTable, returning the API instance
		if (this instanceof DataTable) {
			return $(selector).DataTable(options);
		}
		else {
			// Argument switching
			options = selector;
		}
	
		/**
		 * Perform a jQuery selector action on the table's TR elements (from the tbody) and
		 * return the resulting jQuery object.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select TR elements that meet the current filter
		 *    criterion ("applied") or all TR elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the TR elements in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {object} jQuery object, filtered by the given selector.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Highlight every second row
		 *      oTable.$('tr:odd').css('backgroundColor', 'blue');
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to rows with 'Webkit' in them, add a background colour and then
		 *      // remove the filter, thus highlighting the 'Webkit' rows only.
		 *      oTable.fnFilter('Webkit');
		 *      oTable.$('tr', {"search": "applied"}).css('backgroundColor', 'blue');
		 *      oTable.fnFilter('');
		 *    } );
		 */
		this.$ = function ( sSelector, oOpts )
		{
			return this.api(true).$( sSelector, oOpts );
		};
		
		
		/**
		 * Almost identical to $ in operation, but in this case returns the data for the matched
		 * rows - as such, the jQuery selector used should match TR row nodes or TD/TH cell nodes
		 * rather than any descendants, so the data can be obtained for the row/cell. If matching
		 * rows are found, the data returned is the original data array/object that was used to
		 * create the row (or a generated array if from a DOM source).
		 *
		 * This method is often useful in-combination with $ where both functions are given the
		 * same parameters and the array indexes will match identically.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select elements that meet the current filter
		 *    criterion ("applied") or all elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the data in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {array} Data for the matched elements. If any elements, as a result of the
		 *    selector, were not TR, TD or TH elements in the DataTable, they will have a null
		 *    entry in the array.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the data from the first row in the table
		 *      var data = oTable._('tr:first');
		 *
		 *      // Do something useful with the data
		 *      alert( "First cell is: "+data[0] );
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to 'Webkit' and get all data for
		 *      oTable.fnFilter('Webkit');
		 *      var data = oTable._('tr', {"search": "applied"});
		 *
		 *      // Do something with the data
		 *      alert( data.length+" rows matched the search" );
		 *    } );
		 */
		this._ = function ( sSelector, oOpts )
		{
			return this.api(true).rows( sSelector, oOpts ).data();
		};
		
		
		/**
		 * Create a DataTables Api instance, with the currently selected tables for
		 * the Api's context.
		 * @param {boolean} [traditional=false] Set the API instance's context to be
		 *   only the table referred to by the `DataTable.ext.iApiIndex` option, as was
		 *   used in the API presented by DataTables 1.9- (i.e. the traditional mode),
		 *   or if all tables captured in the jQuery object should be used.
		 * @return {DataTables.Api}
		 */
		this.api = function ( traditional )
		{
			return traditional ?
				new _Api(
					_fnSettingsFromNode( this[ _ext.iApiIndex ] )
				) :
				new _Api( this );
		};
		
		
		/**
		 * Add a single new row or multiple rows of data to the table. Please note
		 * that this is suitable for client-side processing only - if you are using
		 * server-side processing (i.e. "bServerSide": true), then to add data, you
		 * must add it to the data source, i.e. the server-side, through an Ajax call.
		 *  @param {array|object} data The data to be added to the table. This can be:
		 *    <ul>
		 *      <li>1D array of data - add a single row with the data provided</li>
		 *      <li>2D array of arrays - add multiple rows in a single call</li>
		 *      <li>object - data object when using <i>mData</i></li>
		 *      <li>array of objects - multiple data objects when using <i>mData</i></li>
		 *    </ul>
		 *  @param {bool} [redraw=true] redraw the table or not
		 *  @returns {array} An array of integers, representing the list of indexes in
		 *    <i>aoData</i> ({@link DataTable.models.oSettings}) that have been added to
		 *    the table.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Global var for counter
		 *    var giCount = 2;
		 *
		 *    $(document).ready(function() {
		 *      $('#example').dataTable();
		 *    } );
		 *
		 *    function fnClickAddRow() {
		 *      $('#example').dataTable().fnAddData( [
		 *        giCount+".1",
		 *        giCount+".2",
		 *        giCount+".3",
		 *        giCount+".4" ]
		 *      );
		 *
		 *      giCount++;
		 *    }
		 */
		this.fnAddData = function( data, redraw )
		{
			var api = this.api( true );
		
			/* Check if we want to add multiple rows or not */
			var rows = Array.isArray(data) && ( Array.isArray(data[0]) || $.isPlainObject(data[0]) ) ?
				api.rows.add( data ) :
				api.row.add( data );
		
			if ( redraw === undefined || redraw ) {
				api.draw();
			}
		
			return rows.flatten().toArray();
		};
		
		
		/**
		 * This function will make DataTables recalculate the column sizes, based on the data
		 * contained in the table and the sizes applied to the columns (in the DOM, CSS or
		 * through the sWidth parameter). This can be useful when the width of the table's
		 * parent element changes (for example a window resize).
		 *  @param {boolean} [bRedraw=true] Redraw the table or not, you will typically want to
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable( {
		 *        "sScrollY": "200px",
		 *        "bPaginate": false
		 *      } );
		 *
		 *      $(window).on('resize', function () {
		 *        oTable.fnAdjustColumnSizing();
		 *      } );
		 *    } );
		 */
		this.fnAdjustColumnSizing = function ( bRedraw )
		{
			var api = this.api( true ).columns.adjust();
			var settings = api.settings()[0];
			var scroll = settings.oScroll;
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw( false );
			}
			else if ( scroll.sX !== "" || scroll.sY !== "" ) {
				/* If not redrawing, but scrolling, we want to apply the new column sizes anyway */
				_fnScrollDraw( settings );
			}
		};
		
		
		/**
		 * Quickly and simply clear a table
		 *  @param {bool} [bRedraw=true] redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately 'nuke' the current rows (perhaps waiting for an Ajax callback...)
		 *      oTable.fnClearTable();
		 *    } );
		 */
		this.fnClearTable = function( bRedraw )
		{
			var api = this.api( true ).clear();
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
		};
		
		
		/**
		 * The exact opposite of 'opening' a row, this function will close any rows which
		 * are currently 'open'.
		 *  @param {node} nTr the table row to 'close'
		 *  @returns {int} 0 on success, or 1 if failed (can't find the row)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnClose = function( nTr )
		{
			this.api( true ).row( nTr ).child.hide();
		};
		
		
		/**
		 * Remove a row for the table
		 *  @param {mixed} target The index of the row from aoData to be deleted, or
		 *    the TR element you want to delete
		 *  @param {function|null} [callBack] Callback function
		 *  @param {bool} [redraw=true] Redraw the table or not
		 *  @returns {array} The row that was deleted
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately remove the first row
		 *      oTable.fnDeleteRow( 0 );
		 *    } );
		 */
		this.fnDeleteRow = function( target, callback, redraw )
		{
			var api = this.api( true );
			var rows = api.rows( target );
			var settings = rows.settings()[0];
			var data = settings.aoData[ rows[0][0] ];
		
			rows.remove();
		
			if ( callback ) {
				callback.call( this, settings, data );
			}
		
			if ( redraw === undefined || redraw ) {
				api.draw();
			}
		
			return data;
		};
		
		
		/**
		 * Restore the table to it's original state in the DOM by removing all of DataTables
		 * enhancements, alterations to the DOM structure of the table and event listeners.
		 *  @param {boolean} [remove=false] Completely remove the table from the DOM
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      // This example is fairly pointless in reality, but shows how fnDestroy can be used
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnDestroy();
		 *    } );
		 */
		this.fnDestroy = function ( remove )
		{
			this.api( true ).destroy( remove );
		};
		
		
		/**
		 * Redraw the table
		 *  @param {bool} [complete=true] Re-filter and resort (if enabled) the table before the draw.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Re-draw the table - you wouldn't want to do it here, but it's an example :-)
		 *      oTable.fnDraw();
		 *    } );
		 */
		this.fnDraw = function( complete )
		{
			// Note that this isn't an exact match to the old call to _fnDraw - it takes
			// into account the new data, but can hold position.
			this.api( true ).draw( complete );
		};
		
		
		/**
		 * Filter the input based on data
		 *  @param {string} sInput String to filter the table on
		 *  @param {int|null} [iColumn] Column to limit filtering to
		 *  @param {bool} [bRegex=false] Treat as regular expression or not
		 *  @param {bool} [bSmart=true] Perform smart filtering or not
		 *  @param {bool} [bShowGlobal=true] Show the input global filter in it's input box(es)
		 *  @param {bool} [bCaseInsensitive=true] Do case-insensitive matching (true) or not (false)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sometime later - filter...
		 *      oTable.fnFilter( 'test string' );
		 *    } );
		 */
		this.fnFilter = function( sInput, iColumn, bRegex, bSmart, bShowGlobal, bCaseInsensitive )
		{
			var api = this.api( true );
		
			if ( iColumn === null || iColumn === undefined ) {
				api.search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
			else {
				api.column( iColumn ).search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
		
			api.draw();
		};
		
		
		/**
		 * Get the data for the whole table, an individual row or an individual cell based on the
		 * provided parameters.
		 *  @param {int|node} [src] A TR row node, TD/TH cell node or an integer. If given as
		 *    a TR node then the data source for the whole row will be returned. If given as a
		 *    TD/TH cell node then iCol will be automatically calculated and the data for the
		 *    cell returned. If given as an integer, then this is treated as the aoData internal
		 *    data index for the row (see fnGetPosition) and the data for that row used.
		 *  @param {int} [col] Optional column index that you want the data of.
		 *  @returns {array|object|string} If mRow is undefined, then the data for all rows is
		 *    returned. If mRow is defined, just data for that row, and is iCol is
		 *    defined, only data for the designated cell is returned.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Row data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('tr').click( function () {
		 *        var data = oTable.fnGetData( this );
		 *        // ... do something with the array / object of data for the row
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Individual cell data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('td').click( function () {
		 *        var sData = oTable.fnGetData( this );
		 *        alert( 'The cell clicked on had the value of '+sData );
		 *      } );
		 *    } );
		 */
		this.fnGetData = function( src, col )
		{
			var api = this.api( true );
		
			if ( src !== undefined ) {
				var type = src.nodeName ? src.nodeName.toLowerCase() : '';
		
				return col !== undefined || type == 'td' || type == 'th' ?
					api.cell( src, col ).data() :
					api.row( src ).data() || null;
			}
		
			return api.data().toArray();
		};
		
		
		/**
		 * Get an array of the TR nodes that are used in the table's body. Note that you will
		 * typically want to use the '$' API method in preference to this as it is more
		 * flexible.
		 *  @param {int} [iRow] Optional row index for the TR element you want
		 *  @returns {array|node} If iRow is undefined, returns an array of all TR elements
		 *    in the table's body, or iRow is defined, just the TR element requested.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the nodes from the table
		 *      var nNodes = oTable.fnGetNodes( );
		 *    } );
		 */
		this.fnGetNodes = function( iRow )
		{
			var api = this.api( true );
		
			return iRow !== undefined ?
				api.row( iRow ).node() :
				api.rows().nodes().flatten().toArray();
		};
		
		
		/**
		 * Get the array indexes of a particular cell from it's DOM element
		 * and column index including hidden columns
		 *  @param {node} node this can either be a TR, TD or TH in the table's body
		 *  @returns {int} If nNode is given as a TR, then a single index is returned, or
		 *    if given as a cell, an array of [row index, column index (visible),
		 *    column index (all)] is given.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      $('#example tbody td').click( function () {
		 *        // Get the position of the current data from the node
		 *        var aPos = oTable.fnGetPosition( this );
		 *
		 *        // Get the data array for this row
		 *        var aData = oTable.fnGetData( aPos[0] );
		 *
		 *        // Update the data array and return the value
		 *        aData[ aPos[1] ] = 'clicked';
		 *        this.innerHTML = 'clicked';
		 *      } );
		 *
		 *      // Init DataTables
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnGetPosition = function( node )
		{
			var api = this.api( true );
			var nodeName = node.nodeName.toUpperCase();
		
			if ( nodeName == 'TR' ) {
				return api.row( node ).index();
			}
			else if ( nodeName == 'TD' || nodeName == 'TH' ) {
				var cell = api.cell( node ).index();
		
				return [
					cell.row,
					cell.columnVisible,
					cell.column
				];
			}
			return null;
		};
		
		
		/**
		 * Check to see if a row is 'open' or not.
		 *  @param {node} nTr the table row to check
		 *  @returns {boolean} true if the row is currently open, false otherwise
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnIsOpen = function( nTr )
		{
			return this.api( true ).row( nTr ).child.isShown();
		};
		
		
		/**
		 * This function will place a new row directly after a row which is currently
		 * on display on the page, with the HTML contents that is passed into the
		 * function. This can be used, for example, to ask for confirmation that a
		 * particular record should be deleted.
		 *  @param {node} nTr The table row to 'open'
		 *  @param {string|node|jQuery} mHtml The HTML to put into the row
		 *  @param {string} sClass Class to give the new TD cell
		 *  @returns {node} The row opened. Note that if the table row passed in as the
		 *    first parameter, is not found in the table, this method will silently
		 *    return.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnOpen = function( nTr, mHtml, sClass )
		{
			return this.api( true )
				.row( nTr )
				.child( mHtml, sClass )
				.show()
				.child()[0];
		};
		
		
		/**
		 * Change the pagination - provides the internal logic for pagination in a simple API
		 * function. With this function you can have a DataTables table go to the next,
		 * previous, first or last pages.
		 *  @param {string|int} mAction Paging action to take: "first", "previous", "next" or "last"
		 *    or page number to jump to (integer), note that page 0 is the first page.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnPageChange( 'next' );
		 *    } );
		 */
		this.fnPageChange = function ( mAction, bRedraw )
		{
			var api = this.api( true ).page( mAction );
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw(false);
			}
		};
		
		
		/**
		 * Show a particular column
		 *  @param {int} iCol The column whose display should be changed
		 *  @param {bool} bShow Show (true) or hide (false) the column
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Hide the second column after initialisation
		 *      oTable.fnSetColumnVis( 1, false );
		 *    } );
		 */
		this.fnSetColumnVis = function ( iCol, bShow, bRedraw )
		{
			var api = this.api( true ).column( iCol ).visible( bShow );
		
			if ( bRedraw === undefined || bRedraw ) {
				api.columns.adjust().draw();
			}
		};
		
		
		/**
		 * Get the settings for a particular table for external manipulation
		 *  @returns {object} DataTables settings object. See
		 *    {@link DataTable.models.oSettings}
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      var oSettings = oTable.fnSettings();
		 *
		 *      // Show an example parameter from the settings
		 *      alert( oSettings._iDisplayStart );
		 *    } );
		 */
		this.fnSettings = function()
		{
			return _fnSettingsFromNode( this[_ext.iApiIndex] );
		};
		
		
		/**
		 * Sort the table by a particular column
		 *  @param {int} iCol the data index to sort on. Note that this will not match the
		 *    'display index' if you have hidden data entries
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort immediately with columns 0 and 1
		 *      oTable.fnSort( [ [0,'asc'], [1,'asc'] ] );
		 *    } );
		 */
		this.fnSort = function( aaSort )
		{
			this.api( true ).order( aaSort ).draw();
		};
		
		
		/**
		 * Attach a sort listener to an element for a given column
		 *  @param {node} nNode the element to attach the sort listener to
		 *  @param {int} iColumn the column that a click on this node will sort on
		 *  @param {function} [fnCallback] callback function when sort is run
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort on column 1, when 'sorter' is clicked on
		 *      oTable.fnSortListener( document.getElementById('sorter'), 1 );
		 *    } );
		 */
		this.fnSortListener = function( nNode, iColumn, fnCallback )
		{
			this.api( true ).order.listener( nNode, iColumn, fnCallback );
		};
		
		
		/**
		 * Update a table cell or row - this method will accept either a single value to
		 * update the cell with, an array of values with one element for each column or
		 * an object in the same format as the original data source. The function is
		 * self-referencing in order to make the multi column updates easier.
		 *  @param {object|array|string} mData Data to update the cell/row with
		 *  @param {node|int} mRow TR element you want to update or the aoData index
		 *  @param {int} [iColumn] The column to update, give as null or undefined to
		 *    update a whole row.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @param {bool} [bAction=true] Perform pre-draw actions or not
		 *  @returns {int} 0 on success, 1 on error
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnUpdate( 'Example update', 0, 0 ); // Single cell
		 *      oTable.fnUpdate( ['a', 'b', 'c', 'd', 'e'], $('tbody tr')[0] ); // Row
		 *    } );
		 */
		this.fnUpdate = function( mData, mRow, iColumn, bRedraw, bAction )
		{
			var api = this.api( true );
		
			if ( iColumn === undefined || iColumn === null ) {
				api.row( mRow ).data( mData );
			}
			else {
				api.cell( mRow, iColumn ).data( mData );
			}
		
			if ( bAction === undefined || bAction ) {
				api.columns.adjust();
			}
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
			return 0;
		};
		
		
		/**
		 * Provide a common method for plug-ins to check the version of DataTables being used, in order
		 * to ensure compatibility.
		 *  @param {string} sVersion Version string to check for, in the format "X.Y.Z". Note that the
		 *    formats "X" and "X.Y" are also acceptable.
		 *  @returns {boolean} true if this version of DataTables is greater or equal to the required
		 *    version, or false if this version of DataTales is not suitable
		 *  @method
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      alert( oTable.fnVersionCheck( '1.9.0' ) );
		 *    } );
		 */
		this.fnVersionCheck = _ext.fnVersionCheck;
		
	
		var _that = this;
		var emptyInit = options === undefined;
		var len = this.length;
	
		if ( emptyInit ) {
			options = {};
		}
	
		this.oApi = this.internal = _ext.internal;
	
		// Extend with old style plug-in API methods
		for ( var fn in DataTable.ext.internal ) {
			if ( fn ) {
				this[fn] = _fnExternApiFunc(fn);
			}
		}
	
		this.each(function() {
			// For each initialisation we want to give it a clean initialisation
			// object that can be bashed around
			var o = {};
			var oInit = len > 1 ? // optimisation for single table case
				_fnExtend( o, options, true ) :
				options;
	
			/*global oInit,_that,emptyInit*/
			var i=0, iLen, j, jLen, k, kLen;
			var sId = this.getAttribute( 'id' );
			var bInitHandedOff = false;
			var defaults = DataTable.defaults;
			var $this = $(this);
			
			
			/* Sanity check */
			if ( this.nodeName.toLowerCase() != 'table' )
			{
				_fnLog( null, 0, 'Non-table node initialisation ('+this.nodeName+')', 2 );
				return;
			}
			
			/* Backwards compatibility for the defaults */
			_fnCompatOpts( defaults );
			_fnCompatCols( defaults.column );
			
			/* Convert the camel-case defaults to Hungarian */
			_fnCamelToHungarian( defaults, defaults, true );
			_fnCamelToHungarian( defaults.column, defaults.column, true );
			
			/* Setting up the initialisation object */
			_fnCamelToHungarian( defaults, $.extend( oInit, $this.data() ), true );
			
			
			
			/* Check to see if we are re-initialising a table */
			var allSettings = DataTable.settings;
			for ( i=0, iLen=allSettings.length ; i<iLen ; i++ )
			{
				var s = allSettings[i];
			
				/* Base check on table node */
				if (
					s.nTable == this ||
					(s.nTHead && s.nTHead.parentNode == this) ||
					(s.nTFoot && s.nTFoot.parentNode == this)
				) {
					var bRetrieve = oInit.bRetrieve !== undefined ? oInit.bRetrieve : defaults.bRetrieve;
					var bDestroy = oInit.bDestroy !== undefined ? oInit.bDestroy : defaults.bDestroy;
			
					if ( emptyInit || bRetrieve )
					{
						return s.oInstance;
					}
					else if ( bDestroy )
					{
						s.oInstance.fnDestroy();
						break;
					}
					else
					{
						_fnLog( s, 0, 'Cannot reinitialise DataTable', 3 );
						return;
					}
				}
			
				/* If the element we are initialising has the same ID as a table which was previously
				 * initialised, but the table nodes don't match (from before) then we destroy the old
				 * instance by simply deleting it. This is under the assumption that the table has been
				 * destroyed by other methods. Anyone using non-id selectors will need to do this manually
				 */
				if ( s.sTableId == this.id )
				{
					allSettings.splice( i, 1 );
					break;
				}
			}
			
			/* Ensure the table has an ID - required for accessibility */
			if ( sId === null || sId === "" )
			{
				sId = "DataTables_Table_"+(DataTable.ext._unique++);
				this.id = sId;
			}
			
			/* Create the settings object for this table and set some of the default parameters */
			var oSettings = $.extend( true, {}, DataTable.models.oSettings, {
				"sDestroyWidth": $this[0].style.width,
				"sInstance":     sId,
				"sTableId":      sId
			} );
			oSettings.nTable = this;
			oSettings.oApi   = _that.internal;
			oSettings.oInit  = oInit;
			
			allSettings.push( oSettings );
			
			// Need to add the instance after the instance after the settings object has been added
			// to the settings array, so we can self reference the table instance if more than one
			oSettings.oInstance = (_that.length===1) ? _that : $this.dataTable();
			
			// Backwards compatibility, before we apply all the defaults
			_fnCompatOpts( oInit );
			_fnLanguageCompat( oInit.oLanguage );
			
			// If the length menu is given, but the init display length is not, use the length menu
			if ( oInit.aLengthMenu && ! oInit.iDisplayLength )
			{
				oInit.iDisplayLength = Array.isArray( oInit.aLengthMenu[0] ) ?
					oInit.aLengthMenu[0][0] : oInit.aLengthMenu[0];
			}
			
			// Apply the defaults and init options to make a single init object will all
			// options defined from defaults and instance options.
			oInit = _fnExtend( $.extend( true, {}, defaults ), oInit );
			
			
			// Map the initialisation options onto the settings object
			_fnMap( oSettings.oFeatures, oInit, [
				"bPaginate",
				"bLengthChange",
				"bFilter",
				"bSort",
				"bSortMulti",
				"bInfo",
				"bProcessing",
				"bAutoWidth",
				"bSortClasses",
				"bServerSide",
				"bDeferRender"
			] );
			_fnMap( oSettings, oInit, [
				"asStripeClasses",
				"ajax",
				"fnServerData",
				"fnFormatNumber",
				"sServerMethod",
				"aaSorting",
				"aaSortingFixed",
				"aLengthMenu",
				"sPaginationType",
				"sAjaxSource",
				"sAjaxDataProp",
				"iStateDuration",
				"sDom",
				"bSortCellsTop",
				"iTabIndex",
				"fnStateLoadCallback",
				"fnStateSaveCallback",
				"renderer",
				"searchDelay",
				"rowId",
				[ "iCookieDuration", "iStateDuration" ], // backwards compat
				[ "oSearch", "oPreviousSearch" ],
				[ "aoSearchCols", "aoPreSearchCols" ],
				[ "iDisplayLength", "_iDisplayLength" ]
			] );
			_fnMap( oSettings.oScroll, oInit, [
				[ "sScrollX", "sX" ],
				[ "sScrollXInner", "sXInner" ],
				[ "sScrollY", "sY" ],
				[ "bScrollCollapse", "bCollapse" ]
			] );
			_fnMap( oSettings.oLanguage, oInit, "fnInfoCallback" );
			
			/* Callback functions which are array driven */
			_fnCallbackReg( oSettings, 'aoDrawCallback',       oInit.fnDrawCallback,      'user' );
			_fnCallbackReg( oSettings, 'aoServerParams',       oInit.fnServerParams,      'user' );
			_fnCallbackReg( oSettings, 'aoStateSaveParams',    oInit.fnStateSaveParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoadParams',    oInit.fnStateLoadParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoaded',        oInit.fnStateLoaded,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCallback',        oInit.fnRowCallback,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCreatedCallback', oInit.fnCreatedRow,        'user' );
			_fnCallbackReg( oSettings, 'aoHeaderCallback',     oInit.fnHeaderCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoFooterCallback',     oInit.fnFooterCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoInitComplete',       oInit.fnInitComplete,      'user' );
			_fnCallbackReg( oSettings, 'aoPreDrawCallback',    oInit.fnPreDrawCallback,   'user' );
			
			oSettings.rowIdFn = _fnGetObjectDataFn( oInit.rowId );
			
			/* Browser support detection */
			_fnBrowserDetect( oSettings );
			
			var oClasses = oSettings.oClasses;
			
			$.extend( oClasses, DataTable.ext.classes, oInit.oClasses );
			$this.addClass( oClasses.sTable );
			
			
			if ( oSettings.iInitDisplayStart === undefined )
			{
				/* Display start point, taking into account the save saving */
				oSettings.iInitDisplayStart = oInit.iDisplayStart;
				oSettings._iDisplayStart = oInit.iDisplayStart;
			}
			
			if ( oInit.iDeferLoading !== null )
			{
				oSettings.bDeferLoading = true;
				var tmp = Array.isArray( oInit.iDeferLoading );
				oSettings._iRecordsDisplay = tmp ? oInit.iDeferLoading[0] : oInit.iDeferLoading;
				oSettings._iRecordsTotal = tmp ? oInit.iDeferLoading[1] : oInit.iDeferLoading;
			}
			
			/* Language definitions */
			var oLanguage = oSettings.oLanguage;
			$.extend( true, oLanguage, oInit.oLanguage );
			
			if ( oLanguage.sUrl )
			{
				/* Get the language definitions from a file - because this Ajax call makes the language
				 * get async to the remainder of this function we use bInitHandedOff to indicate that
				 * _fnInitialise will be fired by the returned Ajax handler, rather than the constructor
				 */
				$.ajax( {
					dataType: 'json',
					url: oLanguage.sUrl,
					success: function ( json ) {
						_fnCamelToHungarian( defaults.oLanguage, json );
						_fnLanguageCompat( json );
						$.extend( true, oLanguage, json, oSettings.oInit.oLanguage );
			
						_fnCallbackFire( oSettings, null, 'i18n', [oSettings]);
						_fnInitialise( oSettings );
					},
					error: function () {
						// Error occurred loading language file, continue on as best we can
						_fnInitialise( oSettings );
					}
				} );
				bInitHandedOff = true;
			}
			else {
				_fnCallbackFire( oSettings, null, 'i18n', [oSettings]);
			}
			
			/*
			 * Stripes
			 */
			if ( oInit.asStripeClasses === null )
			{
				oSettings.asStripeClasses =[
					oClasses.sStripeOdd,
					oClasses.sStripeEven
				];
			}
			
			/* Remove row stripe classes if they are already on the table row */
			var stripeClasses = oSettings.asStripeClasses;
			var rowOne = $this.children('tbody').find('tr').eq(0);
			if ( $.inArray( true, $.map( stripeClasses, function(el, i) {
				return rowOne.hasClass(el);
			} ) ) !== -1 ) {
				$('tbody tr', this).removeClass( stripeClasses.join(' ') );
				oSettings.asDestroyStripes = stripeClasses.slice();
			}
			
			/*
			 * Columns
			 * See if we should load columns automatically or use defined ones
			 */
			var anThs = [];
			var aoColumnsInit;
			var nThead = this.getElementsByTagName('thead');
			if ( nThead.length !== 0 )
			{
				_fnDetectHeader( oSettings.aoHeader, nThead[0] );
				anThs = _fnGetUniqueThs( oSettings );
			}
			
			/* If not given a column array, generate one with nulls */
			if ( oInit.aoColumns === null )
			{
				aoColumnsInit = [];
				for ( i=0, iLen=anThs.length ; i<iLen ; i++ )
				{
					aoColumnsInit.push( null );
				}
			}
			else
			{
				aoColumnsInit = oInit.aoColumns;
			}
			
			/* Add the columns */
			for ( i=0, iLen=aoColumnsInit.length ; i<iLen ; i++ )
			{
				_fnAddColumn( oSettings, anThs ? anThs[i] : null );
			}
			
			/* Apply the column definitions */
			_fnApplyColumnDefs( oSettings, oInit.aoColumnDefs, aoColumnsInit, function (iCol, oDef) {
				_fnColumnOptions( oSettings, iCol, oDef );
			} );
			
			/* HTML5 attribute detection - build an mData object automatically if the
			 * attributes are found
			 */
			if ( rowOne.length ) {
				var a = function ( cell, name ) {
					return cell.getAttribute( 'data-'+name ) !== null ? name : null;
				};
			
				$( rowOne[0] ).children('th, td').each( function (i, cell) {
					var col = oSettings.aoColumns[i];
			
					if ( col.mData === i ) {
						var sort = a( cell, 'sort' ) || a( cell, 'order' );
						var filter = a( cell, 'filter' ) || a( cell, 'search' );
			
						if ( sort !== null || filter !== null ) {
							col.mData = {
								_:      i+'.display',
								sort:   sort !== null   ? i+'.@data-'+sort   : undefined,
								type:   sort !== null   ? i+'.@data-'+sort   : undefined,
								filter: filter !== null ? i+'.@data-'+filter : undefined
							};
			
							_fnColumnOptions( oSettings, i );
						}
					}
				} );
			}
			
			var features = oSettings.oFeatures;
			var loadedInit = function () {
				/*
				 * Sorting
				 * @todo For modularisation (1.11) this needs to do into a sort start up handler
				 */
			
				// If aaSorting is not defined, then we use the first indicator in asSorting
				// in case that has been altered, so the default sort reflects that option
				if ( oInit.aaSorting === undefined ) {
					var sorting = oSettings.aaSorting;
					for ( i=0, iLen=sorting.length ; i<iLen ; i++ ) {
						sorting[i][1] = oSettings.aoColumns[ i ].asSorting[0];
					}
				}
			
				/* Do a first pass on the sorting classes (allows any size changes to be taken into
				 * account, and also will apply sorting disabled classes if disabled
				 */
				_fnSortingClasses( oSettings );
			
				if ( features.bSort ) {
					_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
						if ( oSettings.bSorted ) {
							var aSort = _fnSortFlatten( oSettings );
							var sortedColumns = {};
			
							$.each( aSort, function (i, val) {
								sortedColumns[ val.src ] = val.dir;
							} );
			
							_fnCallbackFire( oSettings, null, 'order', [oSettings, aSort, sortedColumns] );
							_fnSortAria( oSettings );
						}
					} );
				}
			
				_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
					if ( oSettings.bSorted || _fnDataSource( oSettings ) === 'ssp' || features.bDeferRender ) {
						_fnSortingClasses( oSettings );
					}
				}, 'sc' );
			
			
				/*
				 * Final init
				 * Cache the header, body and footer as required, creating them if needed
				 */
			
				// Work around for Webkit bug 83867 - store the caption-side before removing from doc
				var captions = $this.children('caption').each( function () {
					this._captionSide = $(this).css('caption-side');
				} );
			
				var thead = $this.children('thead');
				if ( thead.length === 0 ) {
					thead = $('<thead/>').appendTo($this);
				}
				oSettings.nTHead = thead[0];
			
				var tbody = $this.children('tbody');
				if ( tbody.length === 0 ) {
					tbody = $('<tbody/>').insertAfter(thead);
				}
				oSettings.nTBody = tbody[0];
			
				var tfoot = $this.children('tfoot');
				if ( tfoot.length === 0 && captions.length > 0 && (oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "") ) {
					// If we are a scrolling table, and no footer has been given, then we need to create
					// a tfoot element for the caption element to be appended to
					tfoot = $('<tfoot/>').appendTo($this);
				}
			
				if ( tfoot.length === 0 || tfoot.children().length === 0 ) {
					$this.addClass( oClasses.sNoFooter );
				}
				else if ( tfoot.length > 0 ) {
					oSettings.nTFoot = tfoot[0];
					_fnDetectHeader( oSettings.aoFooter, oSettings.nTFoot );
				}
			
				/* Check if there is data passing into the constructor */
				if ( oInit.aaData ) {
					for ( i=0 ; i<oInit.aaData.length ; i++ ) {
						_fnAddData( oSettings, oInit.aaData[ i ] );
					}
				}
				else if ( oSettings.bDeferLoading || _fnDataSource( oSettings ) == 'dom' ) {
					/* Grab the data from the page - only do this when deferred loading or no Ajax
					 * source since there is no point in reading the DOM data if we are then going
					 * to replace it with Ajax data
					 */
					_fnAddTr( oSettings, $(oSettings.nTBody).children('tr') );
				}
			
				/* Copy the data index array */
				oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
			
				/* Initialisation complete - table can be drawn */
				oSettings.bInitialised = true;
			
				/* Check if we need to initialise the table (it might not have been handed off to the
				 * language processor)
				 */
				if ( bInitHandedOff === false ) {
					_fnInitialise( oSettings );
				}
			};
			
			/* Must be done after everything which can be overridden by the state saving! */
			_fnCallbackReg( oSettings, 'aoDrawCallback', _fnSaveState, 'state_save' );
			
			if ( oInit.bStateSave )
			{
				features.bStateSave = true;
				_fnLoadState( oSettings, oInit, loadedInit );
			}
			else {
				loadedInit();
			}
			
		} );
		_that = null;
		return this;
	};
	
	
	/*
	 * It is useful to have variables which are scoped locally so only the
	 * DataTables functions can access them and they don't leak into global space.
	 * At the same time these functions are often useful over multiple files in the
	 * core and API, so we list, or at least document, all variables which are used
	 * by DataTables as private variables here. This also ensures that there is no
	 * clashing of variable names and that they can easily referenced for reuse.
	 */
	
	
	// Defined else where
	//  _selector_run
	//  _selector_opts
	//  _selector_first
	//  _selector_row_indexes
	
	var _ext; // DataTable.ext
	var _Api; // DataTable.Api
	var _api_register; // DataTable.Api.register
	var _api_registerPlural; // DataTable.Api.registerPlural
	
	var _re_dic = {};
	var _re_new_lines = /[\r\n\u2028]/g;
	var _re_html = /<.*?>/g;
	
	// This is not strict ISO8601 - Date.parse() is quite lax, although
	// implementations differ between browsers.
	var _re_date = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/;
	
	// Escape regular expression special characters
	var _re_escape_regex = new RegExp( '(\\' + [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-' ].join('|\\') + ')', 'g' );
	
	// http://en.wikipedia.org/wiki/Foreign_exchange_market
	// - \u20BD - Russian ruble.
	// - \u20a9 - South Korean Won
	// - \u20BA - Turkish Lira
	// - \u20B9 - Indian Rupee
	// - R - Brazil (R$) and South Africa
	// - fr - Swiss Franc
	// - kr - Swedish krona, Norwegian krone and Danish krone
	// - \u2009 is thin space and \u202F is narrow no-break space, both used in many
	// - Ƀ - Bitcoin
	// - Ξ - Ethereum
	//   standards as thousands separators.
	var _re_formatted_numeric = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi;
	
	
	var _empty = function ( d ) {
		return !d || d === true || d === '-' ? true : false;
	};
	
	
	var _intVal = function ( s ) {
		var integer = parseInt( s, 10 );
		return !isNaN(integer) && isFinite(s) ? integer : null;
	};
	
	// Convert from a formatted number with characters other than `.` as the
	// decimal place, to a Javascript number
	var _numToDecimal = function ( num, decimalPoint ) {
		// Cache created regular expressions for speed as this function is called often
		if ( ! _re_dic[ decimalPoint ] ) {
			_re_dic[ decimalPoint ] = new RegExp( _fnEscapeRegex( decimalPoint ), 'g' );
		}
		return typeof num === 'string' && decimalPoint !== '.' ?
			num.replace( /\./g, '' ).replace( _re_dic[ decimalPoint ], '.' ) :
			num;
	};
	
	
	var _isNumber = function ( d, decimalPoint, formatted ) {
		var strType = typeof d === 'string';
	
		// If empty return immediately so there must be a number if it is a
		// formatted string (this stops the string "k", or "kr", etc being detected
		// as a formatted number for currency
		if ( _empty( d ) ) {
			return true;
		}
	
		if ( decimalPoint && strType ) {
			d = _numToDecimal( d, decimalPoint );
		}
	
		if ( formatted && strType ) {
			d = d.replace( _re_formatted_numeric, '' );
		}
	
		return !isNaN( parseFloat(d) ) && isFinite( d );
	};
	
	
	// A string without HTML in it can be considered to be HTML still
	var _isHtml = function ( d ) {
		return _empty( d ) || typeof d === 'string';
	};
	
	
	var _htmlNumeric = function ( d, decimalPoint, formatted ) {
		if ( _empty( d ) ) {
			return true;
		}
	
		var html = _isHtml( d );
		return ! html ?
			null :
			_isNumber( _stripHtml( d ), decimalPoint, formatted ) ?
				true :
				null;
	};
	
	
	var _pluck = function ( a, prop, prop2 ) {
		var out = [];
		var i=0, ien=a.length;
	
		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[i] && a[i][ prop ] ) {
					out.push( a[i][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				if ( a[i] ) {
					out.push( a[i][ prop ] );
				}
			}
		}
	
		return out;
	};
	
	
	// Basically the same as _pluck, but rather than looping over `a` we use `order`
	// as the indexes to pick from `a`
	var _pluck_order = function ( a, order, prop, prop2 )
	{
		var out = [];
		var i=0, ien=order.length;
	
		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[ order[i] ][ prop ] ) {
					out.push( a[ order[i] ][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				out.push( a[ order[i] ][ prop ] );
			}
		}
	
		return out;
	};
	
	
	var _range = function ( len, start )
	{
		var out = [];
		var end;
	
		if ( start === undefined ) {
			start = 0;
			end = len;
		}
		else {
			end = start;
			start = len;
		}
	
		for ( var i=start ; i<end ; i++ ) {
			out.push( i );
		}
	
		return out;
	};
	
	
	var _removeEmpty = function ( a )
	{
		var out = [];
	
		for ( var i=0, ien=a.length ; i<ien ; i++ ) {
			if ( a[i] ) { // careful - will remove all falsy values!
				out.push( a[i] );
			}
		}
	
		return out;
	};
	
	
	var _stripHtml = function ( d ) {
		return d.replace( _re_html, '' );
	};
	
	
	/**
	 * Determine if all values in the array are unique. This means we can short
	 * cut the _unique method at the cost of a single loop. A sorted array is used
	 * to easily check the values.
	 *
	 * @param  {array} src Source array
	 * @return {boolean} true if all unique, false otherwise
	 * @ignore
	 */
	var _areAllUnique = function ( src ) {
		if ( src.length < 2 ) {
			return true;
		}
	
		var sorted = src.slice().sort();
		var last = sorted[0];
	
		for ( var i=1, ien=sorted.length ; i<ien ; i++ ) {
			if ( sorted[i] === last ) {
				return false;
			}
	
			last = sorted[i];
		}
	
		return true;
	};
	
	
	/**
	 * Find the unique elements in a source array.
	 *
	 * @param  {array} src Source array
	 * @return {array} Array of unique items
	 * @ignore
	 */
	var _unique = function ( src )
	{
		if ( _areAllUnique( src ) ) {
			return src.slice();
		}
	
		// A faster unique method is to use object keys to identify used values,
		// but this doesn't work with arrays or objects, which we must also
		// consider. See jsperf.com/compare-array-unique-versions/4 for more
		// information.
		var
			out = [],
			val,
			i, ien=src.length,
			j, k=0;
	
		again: for ( i=0 ; i<ien ; i++ ) {
			val = src[i];
	
			for ( j=0 ; j<k ; j++ ) {
				if ( out[j] === val ) {
					continue again;
				}
			}
	
			out.push( val );
			k++;
		}
	
		return out;
	};
	
	// Surprisingly this is faster than [].concat.apply
	// https://jsperf.com/flatten-an-array-loop-vs-reduce/2
	var _flatten = function (out, val) {
		if (Array.isArray(val)) {
			for (var i=0 ; i<val.length ; i++) {
				_flatten(out, val[i]);
			}
		}
		else {
			out.push(val);
		}
	  
		return out;
	}
	
	var _includes = function (search, start) {
		if (start === undefined) {
			start = 0;
		}
	
		return this.indexOf(search, start) !== -1;	
	};
	
	// Array.isArray polyfill.
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
	if (! Array.isArray) {
	    Array.isArray = function(arg) {
	        return Object.prototype.toString.call(arg) === '[object Array]';
	    };
	}
	
	if (! Array.prototype.includes) {
		Array.prototype.includes = _includes;
	}
	
	// .trim() polyfill
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
	if (!String.prototype.trim) {
	  String.prototype.trim = function () {
	    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	  };
	}
	
	if (! String.prototype.includes) {
		String.prototype.includes = _includes;
	}
	
	/**
	 * DataTables utility methods
	 * 
	 * This namespace provides helper methods that DataTables uses internally to
	 * create a DataTable, but which are not exclusively used only for DataTables.
	 * These methods can be used by extension authors to save the duplication of
	 * code.
	 *
	 *  @namespace
	 */
	DataTable.util = {
		/**
		 * Throttle the calls to a function. Arguments and context are maintained
		 * for the throttled function.
		 *
		 * @param {function} fn Function to be called
		 * @param {integer} freq Call frequency in mS
		 * @return {function} Wrapped function
		 */
		throttle: function ( fn, freq ) {
			var
				frequency = freq !== undefined ? freq : 200,
				last,
				timer;
	
			return function () {
				var
					that = this,
					now  = +new Date(),
					args = arguments;
	
				if ( last && now < last + frequency ) {
					clearTimeout( timer );
	
					timer = setTimeout( function () {
						last = undefined;
						fn.apply( that, args );
					}, frequency );
				}
				else {
					last = now;
					fn.apply( that, args );
				}
			};
		},
	
	
		/**
		 * Escape a string such that it can be used in a regular expression
		 *
		 *  @param {string} val string to escape
		 *  @returns {string} escaped string
		 */
		escapeRegex: function ( val ) {
			return val.replace( _re_escape_regex, '\\$1' );
		},
	
		/**
		 * Create a function that will write to a nested object or array
		 * @param {*} source JSON notation string
		 * @returns Write function
		 */
		set: function ( source ) {
			if ( $.isPlainObject( source ) ) {
				/* Unlike get, only the underscore (global) option is used for for
				 * setting data since we don't know the type here. This is why an object
				 * option is not documented for `mData` (which is read/write), but it is
				 * for `mRender` which is read only.
				 */
				return DataTable.util.set( source._ );
			}
			else if ( source === null ) {
				// Nothing to do when the data source is null
				return function () {};
			}
			else if ( typeof source === 'function' ) {
				return function (data, val, meta) {
					source( data, 'set', val, meta );
				};
			}
			else if ( typeof source === 'string' && (source.indexOf('.') !== -1 ||
					  source.indexOf('[') !== -1 || source.indexOf('(') !== -1) )
			{
				// Like the get, we need to get data from a nested object
				var setData = function (data, val, src) {
					var a = _fnSplitObjNotation( src ), b;
					var aLast = a[a.length-1];
					var arrayNotation, funcNotation, o, innerSrc;
		
					for ( var i=0, iLen=a.length-1 ; i<iLen ; i++ ) {
						// Protect against prototype pollution
						if (a[i] === '__proto__' || a[i] === 'constructor') {
							throw new Error('Cannot set prototype values');
						}
		
						// Check if we are dealing with an array notation request
						arrayNotation = a[i].match(__reArray);
						funcNotation = a[i].match(__reFn);
		
						if ( arrayNotation ) {
							a[i] = a[i].replace(__reArray, '');
							data[ a[i] ] = [];
		
							// Get the remainder of the nested object to set so we can recurse
							b = a.slice();
							b.splice( 0, i+1 );
							innerSrc = b.join('.');
		
							// Traverse each entry in the array setting the properties requested
							if ( Array.isArray( val ) ) {
								for ( var j=0, jLen=val.length ; j<jLen ; j++ ) {
									o = {};
									setData( o, val[j], innerSrc );
									data[ a[i] ].push( o );
								}
							}
							else {
								// We've been asked to save data to an array, but it
								// isn't array data to be saved. Best that can be done
								// is to just save the value.
								data[ a[i] ] = val;
							}
		
							// The inner call to setData has already traversed through the remainder
							// of the source and has set the data, thus we can exit here
							return;
						}
						else if ( funcNotation ) {
							// Function call
							a[i] = a[i].replace(__reFn, '');
							data = data[ a[i] ]( val );
						}
		
						// If the nested object doesn't currently exist - since we are
						// trying to set the value - create it
						if ( data[ a[i] ] === null || data[ a[i] ] === undefined ) {
							data[ a[i] ] = {};
						}
						data = data[ a[i] ];
					}
		
					// Last item in the input - i.e, the actual set
					if ( aLast.match(__reFn ) ) {
						// Function call
						data = data[ aLast.replace(__reFn, '') ]( val );
					}
					else {
						// If array notation is used, we just want to strip it and use the property name
						// and assign the value. If it isn't used, then we get the result we want anyway
						data[ aLast.replace(__reArray, '') ] = val;
					}
				};
		
				return function (data, val) { // meta is also passed in, but not used
					return setData( data, val, source );
				};
			}
			else {
				// Array or flat object mapping
				return function (data, val) { // meta is also passed in, but not used
					data[source] = val;
				};
			}
		},
	
		/**
		 * Create a function that will read nested objects from arrays, based on JSON notation
		 * @param {*} source JSON notation string
		 * @returns Value read
		 */
		get: function ( source ) {
			if ( $.isPlainObject( source ) ) {
				// Build an object of get functions, and wrap them in a single call
				var o = {};
				$.each( source, function (key, val) {
					if ( val ) {
						o[key] = DataTable.util.get( val );
					}
				} );
		
				return function (data, type, row, meta) {
					var t = o[type] || o._;
					return t !== undefined ?
						t(data, type, row, meta) :
						data;
				};
			}
			else if ( source === null ) {
				// Give an empty string for rendering / sorting etc
				return function (data) { // type, row and meta also passed, but not used
					return data;
				};
			}
			else if ( typeof source === 'function' ) {
				return function (data, type, row, meta) {
					return source( data, type, row, meta );
				};
			}
			else if ( typeof source === 'string' && (source.indexOf('.') !== -1 ||
					  source.indexOf('[') !== -1 || source.indexOf('(') !== -1) )
			{
				/* If there is a . in the source string then the data source is in a
				 * nested object so we loop over the data for each level to get the next
				 * level down. On each loop we test for undefined, and if found immediately
				 * return. This allows entire objects to be missing and sDefaultContent to
				 * be used if defined, rather than throwing an error
				 */
				var fetchData = function (data, type, src) {
					var arrayNotation, funcNotation, out, innerSrc;
		
					if ( src !== "" ) {
						var a = _fnSplitObjNotation( src );
		
						for ( var i=0, iLen=a.length ; i<iLen ; i++ ) {
							// Check if we are dealing with special notation
							arrayNotation = a[i].match(__reArray);
							funcNotation = a[i].match(__reFn);
		
							if ( arrayNotation ) {
								// Array notation
								a[i] = a[i].replace(__reArray, '');
		
								// Condition allows simply [] to be passed in
								if ( a[i] !== "" ) {
									data = data[ a[i] ];
								}
								out = [];
		
								// Get the remainder of the nested object to get
								a.splice( 0, i+1 );
								innerSrc = a.join('.');
		
								// Traverse each entry in the array getting the properties requested
								if ( Array.isArray( data ) ) {
									for ( var j=0, jLen=data.length ; j<jLen ; j++ ) {
										out.push( fetchData( data[j], type, innerSrc ) );
									}
								}
		
								// If a string is given in between the array notation indicators, that
								// is used to join the strings together, otherwise an array is returned
								var join = arrayNotation[0].substring(1, arrayNotation[0].length-1);
								data = (join==="") ? out : out.join(join);
		
								// The inner call to fetchData has already traversed through the remainder
								// of the source requested, so we exit from the loop
								break;
							}
							else if ( funcNotation ) {
								// Function call
								a[i] = a[i].replace(__reFn, '');
								data = data[ a[i] ]();
								continue;
							}
		
							if ( data === null || data[ a[i] ] === undefined ) {
								return undefined;
							}
	
							data = data[ a[i] ];
						}
					}
		
					return data;
				};
		
				return function (data, type) { // row and meta also passed, but not used
					return fetchData( data, type, source );
				};
			}
			else {
				// Array or flat object mapping
				return function (data, type) { // row and meta also passed, but not used
					return data[source];
				};
			}
		}
	};
	
	
	
	/**
	 * Create a mapping object that allows camel case parameters to be looked up
	 * for their Hungarian counterparts. The mapping is stored in a private
	 * parameter called `_hungarianMap` which can be accessed on the source object.
	 *  @param {object} o
	 *  @memberof DataTable#oApi
	 */
	function _fnHungarianMap ( o )
	{
		var
			hungarian = 'a aa ai ao as b fn i m o s ',
			match,
			newKey,
			map = {};
	
		$.each( o, function (key, val) {
			match = key.match(/^([^A-Z]+?)([A-Z])/);
	
			if ( match && hungarian.indexOf(match[1]+' ') !== -1 )
			{
				newKey = key.replace( match[0], match[2].toLowerCase() );
				map[ newKey ] = key;
	
				if ( match[1] === 'o' )
				{
					_fnHungarianMap( o[key] );
				}
			}
		} );
	
		o._hungarianMap = map;
	}
	
	
	/**
	 * Convert from camel case parameters to Hungarian, based on a Hungarian map
	 * created by _fnHungarianMap.
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 *  @memberof DataTable#oApi
	 */
	function _fnCamelToHungarian ( src, user, force )
	{
		if ( ! src._hungarianMap ) {
			_fnHungarianMap( src );
		}
	
		var hungarianKey;
	
		$.each( user, function (key, val) {
			hungarianKey = src._hungarianMap[ key ];
	
			if ( hungarianKey !== undefined && (force || user[hungarianKey] === undefined) )
			{
				// For objects, we need to buzz down into the object to copy parameters
				if ( hungarianKey.charAt(0) === 'o' )
				{
					// Copy the camelCase options over to the hungarian
					if ( ! user[ hungarianKey ] ) {
						user[ hungarianKey ] = {};
					}
					$.extend( true, user[hungarianKey], user[key] );
	
					_fnCamelToHungarian( src[hungarianKey], user[hungarianKey], force );
				}
				else {
					user[hungarianKey] = user[ key ];
				}
			}
		} );
	}
	
	
	/**
	 * Language compatibility - when certain options are given, and others aren't, we
	 * need to duplicate the values over, in order to provide backwards compatibility
	 * with older language files.
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnLanguageCompat( lang )
	{
		// Note the use of the Hungarian notation for the parameters in this method as
		// this is called after the mapping of camelCase to Hungarian
		var defaults = DataTable.defaults.oLanguage;
	
		// Default mapping
		var defaultDecimal = defaults.sDecimal;
		if ( defaultDecimal ) {
			_addNumericSort( defaultDecimal );
		}
	
		if ( lang ) {
			var zeroRecords = lang.sZeroRecords;
	
			// Backwards compatibility - if there is no sEmptyTable given, then use the same as
			// sZeroRecords - assuming that is given.
			if ( ! lang.sEmptyTable && zeroRecords &&
				defaults.sEmptyTable === "No data available in table" )
			{
				_fnMap( lang, lang, 'sZeroRecords', 'sEmptyTable' );
			}
	
			// Likewise with loading records
			if ( ! lang.sLoadingRecords && zeroRecords &&
				defaults.sLoadingRecords === "Loading..." )
			{
				_fnMap( lang, lang, 'sZeroRecords', 'sLoadingRecords' );
			}
	
			// Old parameter name of the thousands separator mapped onto the new
			if ( lang.sInfoThousands ) {
				lang.sThousands = lang.sInfoThousands;
			}
	
			var decimal = lang.sDecimal;
			if ( decimal && defaultDecimal !== decimal ) {
				_addNumericSort( decimal );
			}
		}
	}
	
	
	/**
	 * Map one parameter onto another
	 *  @param {object} o Object to map
	 *  @param {*} knew The new parameter name
	 *  @param {*} old The old parameter name
	 */
	var _fnCompatMap = function ( o, knew, old ) {
		if ( o[ knew ] !== undefined ) {
			o[ old ] = o[ knew ];
		}
	};
	
	
	/**
	 * Provide backwards compatibility for the main DT options. Note that the new
	 * options are mapped onto the old parameters, so this is an external interface
	 * change only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatOpts ( init )
	{
		_fnCompatMap( init, 'ordering',      'bSort' );
		_fnCompatMap( init, 'orderMulti',    'bSortMulti' );
		_fnCompatMap( init, 'orderClasses',  'bSortClasses' );
		_fnCompatMap( init, 'orderCellsTop', 'bSortCellsTop' );
		_fnCompatMap( init, 'order',         'aaSorting' );
		_fnCompatMap( init, 'orderFixed',    'aaSortingFixed' );
		_fnCompatMap( init, 'paging',        'bPaginate' );
		_fnCompatMap( init, 'pagingType',    'sPaginationType' );
		_fnCompatMap( init, 'pageLength',    'iDisplayLength' );
		_fnCompatMap( init, 'searching',     'bFilter' );
	
		// Boolean initialisation of x-scrolling
		if ( typeof init.sScrollX === 'boolean' ) {
			init.sScrollX = init.sScrollX ? '100%' : '';
		}
		if ( typeof init.scrollX === 'boolean' ) {
			init.scrollX = init.scrollX ? '100%' : '';
		}
	
		// Column search objects are in an array, so it needs to be converted
		// element by element
		var searchCols = init.aoSearchCols;
	
		if ( searchCols ) {
			for ( var i=0, ien=searchCols.length ; i<ien ; i++ ) {
				if ( searchCols[i] ) {
					_fnCamelToHungarian( DataTable.models.oSearch, searchCols[i] );
				}
			}
		}
	}
	
	
	/**
	 * Provide backwards compatibility for column options. Note that the new options
	 * are mapped onto the old parameters, so this is an external interface change
	 * only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatCols ( init )
	{
		_fnCompatMap( init, 'orderable',     'bSortable' );
		_fnCompatMap( init, 'orderData',     'aDataSort' );
		_fnCompatMap( init, 'orderSequence', 'asSorting' );
		_fnCompatMap( init, 'orderDataType', 'sortDataType' );
	
		// orderData can be given as an integer
		var dataSort = init.aDataSort;
		if ( typeof dataSort === 'number' && ! Array.isArray( dataSort ) ) {
			init.aDataSort = [ dataSort ];
		}
	}
	
	
	/**
	 * Browser feature detection for capabilities, quirks
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBrowserDetect( settings )
	{
		// We don't need to do this every time DataTables is constructed, the values
		// calculated are specific to the browser and OS configuration which we
		// don't expect to change between initialisations
		if ( ! DataTable.__browser ) {
			var browser = {};
			DataTable.__browser = browser;
	
			// Scrolling feature / quirks detection
			var n = $('<div/>')
				.css( {
					position: 'fixed',
					top: 0,
					left: $(window).scrollLeft()*-1, // allow for scrolling
					height: 1,
					width: 1,
					overflow: 'hidden'
				} )
				.append(
					$('<div/>')
						.css( {
							position: 'absolute',
							top: 1,
							left: 1,
							width: 100,
							overflow: 'scroll'
						} )
						.append(
							$('<div/>')
								.css( {
									width: '100%',
									height: 10
								} )
						)
				)
				.appendTo( 'body' );
	
			var outer = n.children();
			var inner = outer.children();
	
			// Numbers below, in order, are:
			// inner.offsetWidth, inner.clientWidth, outer.offsetWidth, outer.clientWidth
			//
			// IE6 XP:                           100 100 100  83
			// IE7 Vista:                        100 100 100  83
			// IE 8+ Windows:                     83  83 100  83
			// Evergreen Windows:                 83  83 100  83
			// Evergreen Mac with scrollbars:     85  85 100  85
			// Evergreen Mac without scrollbars: 100 100 100 100
	
			// Get scrollbar width
			browser.barWidth = outer[0].offsetWidth - outer[0].clientWidth;
	
			// IE6/7 will oversize a width 100% element inside a scrolling element, to
			// include the width of the scrollbar, while other browsers ensure the inner
			// element is contained without forcing scrolling
			browser.bScrollOversize = inner[0].offsetWidth === 100 && outer[0].clientWidth !== 100;
	
			// In rtl text layout, some browsers (most, but not all) will place the
			// scrollbar on the left, rather than the right.
			browser.bScrollbarLeft = Math.round( inner.offset().left ) !== 1;
	
			// IE8- don't provide height and width for getBoundingClientRect
			browser.bBounding = n[0].getBoundingClientRect().width ? true : false;
	
			n.remove();
		}
	
		$.extend( settings.oBrowser, DataTable.__browser );
		settings.oScroll.iBarWidth = DataTable.__browser.barWidth;
	}
	
	
	/**
	 * Array.prototype reduce[Right] method, used for browsers which don't support
	 * JS 1.6. Done this way to reduce code size, since we iterate either way
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnReduce ( that, fn, init, start, end, inc )
	{
		var
			i = start,
			value,
			isSet = false;
	
		if ( init !== undefined ) {
			value = init;
			isSet = true;
		}
	
		while ( i !== end ) {
			if ( ! that.hasOwnProperty(i) ) {
				continue;
			}
	
			value = isSet ?
				fn( value, that[i], i, that ) :
				that[i];
	
			isSet = true;
			i += inc;
		}
	
		return value;
	}
	
	/**
	 * Add a column to the list used for the table with default values
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nTh The th element for this column
	 *  @memberof DataTable#oApi
	 */
	function _fnAddColumn( oSettings, nTh )
	{
		// Add column to aoColumns array
		var oDefaults = DataTable.defaults.column;
		var iCol = oSettings.aoColumns.length;
		var oCol = $.extend( {}, DataTable.models.oColumn, oDefaults, {
			"nTh": nTh ? nTh : document.createElement('th'),
			"sTitle":    oDefaults.sTitle    ? oDefaults.sTitle    : nTh ? nTh.innerHTML : '',
			"aDataSort": oDefaults.aDataSort ? oDefaults.aDataSort : [iCol],
			"mData": oDefaults.mData ? oDefaults.mData : iCol,
			idx: iCol
		} );
		oSettings.aoColumns.push( oCol );
	
		// Add search object for column specific search. Note that the `searchCols[ iCol ]`
		// passed into extend can be undefined. This allows the user to give a default
		// with only some of the parameters defined, and also not give a default
		var searchCols = oSettings.aoPreSearchCols;
		searchCols[ iCol ] = $.extend( {}, DataTable.models.oSearch, searchCols[ iCol ] );
	
		// Use the default column options function to initialise classes etc
		_fnColumnOptions( oSettings, iCol, $(nTh).data() );
	}
	
	
	/**
	 * Apply options for a column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iCol column index to consider
	 *  @param {object} oOptions object with sType, bVisible and bSearchable etc
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnOptions( oSettings, iCol, oOptions )
	{
		var oCol = oSettings.aoColumns[ iCol ];
		var oClasses = oSettings.oClasses;
		var th = $(oCol.nTh);
	
		// Try to get width information from the DOM. We can't get it from CSS
		// as we'd need to parse the CSS stylesheet. `width` option can override
		if ( ! oCol.sWidthOrig ) {
			// Width attribute
			oCol.sWidthOrig = th.attr('width') || null;
	
			// Style attribute
			var t = (th.attr('style') || '').match(/width:\s*(\d+[pxem%]+)/);
			if ( t ) {
				oCol.sWidthOrig = t[1];
			}
		}
	
		/* User specified column options */
		if ( oOptions !== undefined && oOptions !== null )
		{
			// Backwards compatibility
			_fnCompatCols( oOptions );
	
			// Map camel case parameters to their Hungarian counterparts
			_fnCamelToHungarian( DataTable.defaults.column, oOptions, true );
	
			/* Backwards compatibility for mDataProp */
			if ( oOptions.mDataProp !== undefined && !oOptions.mData )
			{
				oOptions.mData = oOptions.mDataProp;
			}
	
			if ( oOptions.sType )
			{
				oCol._sManualType = oOptions.sType;
			}
	
			// `class` is a reserved word in Javascript, so we need to provide
			// the ability to use a valid name for the camel case input
			if ( oOptions.className && ! oOptions.sClass )
			{
				oOptions.sClass = oOptions.className;
			}
			if ( oOptions.sClass ) {
				th.addClass( oOptions.sClass );
			}
	
			var origClass = oCol.sClass;
	
			$.extend( oCol, oOptions );
			_fnMap( oCol, oOptions, "sWidth", "sWidthOrig" );
	
			// Merge class from previously defined classes with this one, rather than just
			// overwriting it in the extend above
			if (origClass !== oCol.sClass) {
				oCol.sClass = origClass + ' ' + oCol.sClass;
			}
	
			/* iDataSort to be applied (backwards compatibility), but aDataSort will take
			 * priority if defined
			 */
			if ( oOptions.iDataSort !== undefined )
			{
				oCol.aDataSort = [ oOptions.iDataSort ];
			}
			_fnMap( oCol, oOptions, "aDataSort" );
		}
	
		/* Cache the data get and set functions for speed */
		var mDataSrc = oCol.mData;
		var mData = _fnGetObjectDataFn( mDataSrc );
		var mRender = oCol.mRender ? _fnGetObjectDataFn( oCol.mRender ) : null;
	
		var attrTest = function( src ) {
			return typeof src === 'string' && src.indexOf('@') !== -1;
		};
		oCol._bAttrSrc = $.isPlainObject( mDataSrc ) && (
			attrTest(mDataSrc.sort) || attrTest(mDataSrc.type) || attrTest(mDataSrc.filter)
		);
		oCol._setter = null;
	
		oCol.fnGetData = function (rowData, type, meta) {
			var innerData = mData( rowData, type, undefined, meta );
	
			return mRender && type ?
				mRender( innerData, type, rowData, meta ) :
				innerData;
		};
		oCol.fnSetData = function ( rowData, val, meta ) {
			return _fnSetObjectDataFn( mDataSrc )( rowData, val, meta );
		};
	
		// Indicate if DataTables should read DOM data as an object or array
		// Used in _fnGetRowElements
		if ( typeof mDataSrc !== 'number' ) {
			oSettings._rowReadObject = true;
		}
	
		/* Feature sorting overrides column specific when off */
		if ( !oSettings.oFeatures.bSort )
		{
			oCol.bSortable = false;
			th.addClass( oClasses.sSortableNone ); // Have to add class here as order event isn't called
		}
	
		/* Check that the class assignment is correct for sorting */
		var bAsc = $.inArray('asc', oCol.asSorting) !== -1;
		var bDesc = $.inArray('desc', oCol.asSorting) !== -1;
		if ( !oCol.bSortable || (!bAsc && !bDesc) )
		{
			oCol.sSortingClass = oClasses.sSortableNone;
			oCol.sSortingClassJUI = "";
		}
		else if ( bAsc && !bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableAsc;
			oCol.sSortingClassJUI = oClasses.sSortJUIAscAllowed;
		}
		else if ( !bAsc && bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableDesc;
			oCol.sSortingClassJUI = oClasses.sSortJUIDescAllowed;
		}
		else
		{
			oCol.sSortingClass = oClasses.sSortable;
			oCol.sSortingClassJUI = oClasses.sSortJUI;
		}
	}
	
	
	/**
	 * Adjust the table column widths for new data. Note: you would probably want to
	 * do a redraw after calling this function!
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAdjustColumnSizing ( settings )
	{
		/* Not interested in doing column width calculation if auto-width is disabled */
		if ( settings.oFeatures.bAutoWidth !== false )
		{
			var columns = settings.aoColumns;
	
			_fnCalculateColumnWidths( settings );
			for ( var i=0 , iLen=columns.length ; i<iLen ; i++ )
			{
				columns[i].nTh.style.width = columns[i].sWidth;
			}
		}
	
		var scroll = settings.oScroll;
		if ( scroll.sY !== '' || scroll.sX !== '')
		{
			_fnScrollDraw( settings );
		}
	
		_fnCallbackFire( settings, null, 'column-sizing', [settings] );
	}
	
	
	/**
	 * Convert the index of a visible column to the index in the data array (take account
	 * of hidden columns)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iMatch Visible column index to lookup
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnVisibleToColumnIndex( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
	
		return typeof aiVis[iMatch] === 'number' ?
			aiVis[iMatch] :
			null;
	}
	
	
	/**
	 * Convert the index of an index in the data array and convert it to the visible
	 *   column index (take account of hidden columns)
	 *  @param {int} iMatch Column index to lookup
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnIndexToVisible( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
		var iPos = $.inArray( iMatch, aiVis );
	
		return iPos !== -1 ? iPos : null;
	}
	
	
	/**
	 * Get the number of visible columns
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the number of visible columns
	 *  @memberof DataTable#oApi
	 */
	function _fnVisbleColumns( oSettings )
	{
		var vis = 0;
	
		// No reduce in IE8, use a loop for now
		$.each( oSettings.aoColumns, function ( i, col ) {
			if ( col.bVisible && $(col.nTh).css('display') !== 'none' ) {
				vis++;
			}
		} );
	
		return vis;
	}
	
	
	/**
	 * Get an array of column indexes that match a given property
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sParam Parameter in aoColumns to look for - typically
	 *    bVisible or bSearchable
	 *  @returns {array} Array of indexes with matched properties
	 *  @memberof DataTable#oApi
	 */
	function _fnGetColumns( oSettings, sParam )
	{
		var a = [];
	
		$.map( oSettings.aoColumns, function(val, i) {
			if ( val[sParam] ) {
				a.push( i );
			}
		} );
	
		return a;
	}
	
	
	/**
	 * Calculate the 'type' of a column
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnTypes ( settings )
	{
		var columns = settings.aoColumns;
		var data = settings.aoData;
		var types = DataTable.ext.type.detect;
		var i, ien, j, jen, k, ken;
		var col, cell, detectedType, cache;
	
		// For each column, spin over the 
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			col = columns[i];
			cache = [];
	
			if ( ! col.sType && col._sManualType ) {
				col.sType = col._sManualType;
			}
			else if ( ! col.sType ) {
				for ( j=0, jen=types.length ; j<jen ; j++ ) {
					for ( k=0, ken=data.length ; k<ken ; k++ ) {
						// Use a cache array so we only need to get the type data
						// from the formatter once (when using multiple detectors)
						if ( cache[k] === undefined ) {
							cache[k] = _fnGetCellData( settings, k, i, 'type' );
						}
	
						detectedType = types[j]( cache[k], settings );
	
						// If null, then this type can't apply to this column, so
						// rather than testing all cells, break out. There is an
						// exception for the last type which is `html`. We need to
						// scan all rows since it is possible to mix string and HTML
						// types
						if ( ! detectedType && j !== types.length-1 ) {
							break;
						}
	
						// Only a single match is needed for html type since it is
						// bottom of the pile and very similar to string - but it
						// must not be empty
						if ( detectedType === 'html' && ! _empty(cache[k]) ) {
							break;
						}
					}
	
					// Type is valid for all data points in the column - use this
					// type
					if ( detectedType ) {
						col.sType = detectedType;
						break;
					}
				}
	
				// Fall back - if no type was detected, always use string
				if ( ! col.sType ) {
					col.sType = 'string';
				}
			}
		}
	}
	
	
	/**
	 * Take the column definitions and static columns arrays and calculate how
	 * they relate to column indexes. The callback function will then apply the
	 * definition found for a column to a suitable configuration object.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aoColDefs The aoColumnDefs array that is to be applied
	 *  @param {array} aoCols The aoColumns array that defines columns individually
	 *  @param {function} fn Callback function - takes two parameters, the calculated
	 *    column index and the definition for that column.
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyColumnDefs( oSettings, aoColDefs, aoCols, fn )
	{
		var i, iLen, j, jLen, k, kLen, def;
		var columns = oSettings.aoColumns;
	
		// Column definitions with aTargets
		if ( aoColDefs )
		{
			/* Loop over the definitions array - loop in reverse so first instance has priority */
			for ( i=aoColDefs.length-1 ; i>=0 ; i-- )
			{
				def = aoColDefs[i];
	
				/* Each definition can target multiple columns, as it is an array */
				var aTargets = def.target !== undefined
					? def.target
					: def.targets !== undefined
						? def.targets
						: def.aTargets;
	
				if ( ! Array.isArray( aTargets ) )
				{
					aTargets = [ aTargets ];
				}
	
				for ( j=0, jLen=aTargets.length ; j<jLen ; j++ )
				{
					if ( typeof aTargets[j] === 'number' && aTargets[j] >= 0 )
					{
						/* Add columns that we don't yet know about */
						while( columns.length <= aTargets[j] )
						{
							_fnAddColumn( oSettings );
						}
	
						/* Integer, basic index */
						fn( aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'number' && aTargets[j] < 0 )
					{
						/* Negative integer, right to left column counting */
						fn( columns.length+aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'string' )
					{
						/* Class name matching on TH element */
						for ( k=0, kLen=columns.length ; k<kLen ; k++ )
						{
							if ( aTargets[j] == "_all" ||
							     $(columns[k].nTh).hasClass( aTargets[j] ) )
							{
								fn( k, def );
							}
						}
					}
				}
			}
		}
	
		// Statically defined columns array
		if ( aoCols )
		{
			for ( i=0, iLen=aoCols.length ; i<iLen ; i++ )
			{
				fn( i, aoCols[i] );
			}
		}
	}
	
	/**
	 * Add a data array to the table, creating DOM node etc. This is the parallel to
	 * _fnGatherData, but for adding rows from a Javascript source, rather than a
	 * DOM source.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aData data array to be added
	 *  @param {node} [nTr] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @returns {int} >=0 if successful (index of new aoData entry), -1 if failed
	 *  @memberof DataTable#oApi
	 */
	function _fnAddData ( oSettings, aDataIn, nTr, anTds )
	{
		/* Create the object for storing information about this new row */
		var iRow = oSettings.aoData.length;
		var oData = $.extend( true, {}, DataTable.models.oRow, {
			src: nTr ? 'dom' : 'data',
			idx: iRow
		} );
	
		oData._aData = aDataIn;
		oSettings.aoData.push( oData );
	
		/* Create the cells */
		var nTd, sThisType;
		var columns = oSettings.aoColumns;
	
		// Invalidate the column types as the new data needs to be revalidated
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			columns[i].sType = null;
		}
	
		/* Add to the display array */
		oSettings.aiDisplayMaster.push( iRow );
	
		var id = oSettings.rowIdFn( aDataIn );
		if ( id !== undefined ) {
			oSettings.aIds[ id ] = oData;
		}
	
		/* Create the DOM information, or register it if already present */
		if ( nTr || ! oSettings.oFeatures.bDeferRender )
		{
			_fnCreateTr( oSettings, iRow, nTr, anTds );
		}
	
		return iRow;
	}
	
	
	/**
	 * Add one or more TR elements to the table. Generally we'd expect to
	 * use this for reading data from a DOM sourced table, but it could be
	 * used for an TR element. Note that if a TR is given, it is used (i.e.
	 * it is not cloned).
	 *  @param {object} settings dataTables settings object
	 *  @param {array|node|jQuery} trs The TR element(s) to add to the table
	 *  @returns {array} Array of indexes for the added rows
	 *  @memberof DataTable#oApi
	 */
	function _fnAddTr( settings, trs )
	{
		var row;
	
		// Allow an individual node to be passed in
		if ( ! (trs instanceof $) ) {
			trs = $(trs);
		}
	
		return trs.map( function (i, el) {
			row = _fnGetRowElements( settings, el );
			return _fnAddData( settings, row.data, el, row.cells );
		} );
	}
	
	
	/**
	 * Take a TR element and convert it to an index in aoData
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} n the TR element to find
	 *  @returns {int} index if the node is found, null if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToDataIndex( oSettings, n )
	{
		return (n._DT_RowIndex!==undefined) ? n._DT_RowIndex : null;
	}
	
	
	/**
	 * Take a TD element and convert it into a column data index (not the visible index)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow The row number the TD/TH can be found in
	 *  @param {node} n The TD/TH element to find
	 *  @returns {int} index if the node is found, -1 if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToColumnIndex( oSettings, iRow, n )
	{
		return $.inArray( n, oSettings.aoData[ iRow ].anCells );
	}
	
	
	/**
	 * Get the data for a given cell from the internal cache, taking into account data mapping
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {string} type data get type ('display', 'type' 'filter|search' 'sort|order')
	 *  @returns {*} Cell data
	 *  @memberof DataTable#oApi
	 */
	function _fnGetCellData( settings, rowIdx, colIdx, type )
	{
		if (type === 'search') {
			type = 'filter';
		}
		else if (type === 'order') {
			type = 'sort';
		}
	
		var draw           = settings.iDraw;
		var col            = settings.aoColumns[colIdx];
		var rowData        = settings.aoData[rowIdx]._aData;
		var defaultContent = col.sDefaultContent;
		var cellData       = col.fnGetData( rowData, type, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		} );
	
		if ( cellData === undefined ) {
			if ( settings.iDrawError != draw && defaultContent === null ) {
				_fnLog( settings, 0, "Requested unknown parameter "+
					(typeof col.mData=='function' ? '{function}' : "'"+col.mData+"'")+
					" for row "+rowIdx+", column "+colIdx, 4 );
				settings.iDrawError = draw;
			}
			return defaultContent;
		}
	
		// When the data source is null and a specific data type is requested (i.e.
		// not the original data), we can use default column data
		if ( (cellData === rowData || cellData === null) && defaultContent !== null && type !== undefined ) {
			cellData = defaultContent;
		}
		else if ( typeof cellData === 'function' ) {
			// If the data source is a function, then we run it and use the return,
			// executing in the scope of the data object (for instances)
			return cellData.call( rowData );
		}
	
		if ( cellData === null && type === 'display' ) {
			return '';
		}
	
		if ( type === 'filter' ) {
			var fomatters = DataTable.ext.type.search;
	
			if ( fomatters[ col.sType ] ) {
				cellData = fomatters[ col.sType ]( cellData );
			}
		}
	
		return cellData;
	}
	
	
	/**
	 * Set the value for a specific cell, into the internal data cache
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {*} val Value to set
	 *  @memberof DataTable#oApi
	 */
	function _fnSetCellData( settings, rowIdx, colIdx, val )
	{
		var col     = settings.aoColumns[colIdx];
		var rowData = settings.aoData[rowIdx]._aData;
	
		col.fnSetData( rowData, val, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		}  );
	}
	
	
	// Private variable that is used to match action syntax in the data property object
	var __reArray = /\[.*?\]$/;
	var __reFn = /\(\)$/;
	
	/**
	 * Split string on periods, taking into account escaped periods
	 * @param  {string} str String to split
	 * @return {array} Split string
	 */
	function _fnSplitObjNotation( str )
	{
		return $.map( str.match(/(\\.|[^\.])+/g) || [''], function ( s ) {
			return s.replace(/\\\./g, '.');
		} );
	}
	
	
	/**
	 * Return a function that can be used to get data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data get function
	 *  @memberof DataTable#oApi
	 */
	var _fnGetObjectDataFn = DataTable.util.get;
	
	
	/**
	 * Return a function that can be used to set data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data set function
	 *  @memberof DataTable#oApi
	 */
	var _fnSetObjectDataFn = DataTable.util.set;
	
	
	/**
	 * Return an array with the full table data
	 *  @param {object} oSettings dataTables settings object
	 *  @returns array {array} aData Master data array
	 *  @memberof DataTable#oApi
	 */
	function _fnGetDataMaster ( settings )
	{
		return _pluck( settings.aoData, '_aData' );
	}
	
	
	/**
	 * Nuke the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnClearTable( settings )
	{
		settings.aoData.length = 0;
		settings.aiDisplayMaster.length = 0;
		settings.aiDisplay.length = 0;
		settings.aIds = {};
	}
	
	
	 /**
	 * Take an array of integers (index array) and remove a target integer (value - not
	 * the key!)
	 *  @param {array} a Index array to target
	 *  @param {int} iTarget value to find
	 *  @memberof DataTable#oApi
	 */
	function _fnDeleteIndex( a, iTarget, splice )
	{
		var iTargetIndex = -1;
	
		for ( var i=0, iLen=a.length ; i<iLen ; i++ )
		{
			if ( a[i] == iTarget )
			{
				iTargetIndex = i;
			}
			else if ( a[i] > iTarget )
			{
				a[i]--;
			}
		}
	
		if ( iTargetIndex != -1 && splice === undefined )
		{
			a.splice( iTargetIndex, 1 );
		}
	}
	
	
	/**
	 * Mark cached data as invalid such that a re-read of the data will occur when
	 * the cached data is next requested. Also update from the data source object.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {int}    rowIdx   Row index to invalidate
	 * @param {string} [src]    Source to invalidate from: undefined, 'auto', 'dom'
	 *     or 'data'
	 * @param {int}    [colIdx] Column index to invalidate. If undefined the whole
	 *     row will be invalidated
	 * @memberof DataTable#oApi
	 *
	 * @todo For the modularisation of v1.11 this will need to become a callback, so
	 *   the sort and filter methods can subscribe to it. That will required
	 *   initialisation options for sorting, which is why it is not already baked in
	 */
	function _fnInvalidate( settings, rowIdx, src, colIdx )
	{
		var row = settings.aoData[ rowIdx ];
		var i, ien;
		var cellWrite = function ( cell, col ) {
			// This is very frustrating, but in IE if you just write directly
			// to innerHTML, and elements that are overwritten are GC'ed,
			// even if there is a reference to them elsewhere
			while ( cell.childNodes.length ) {
				cell.removeChild( cell.firstChild );
			}
	
			cell.innerHTML = _fnGetCellData( settings, rowIdx, col, 'display' );
		};
	
		// Are we reading last data from DOM or the data object?
		if ( src === 'dom' || ((! src || src === 'auto') && row.src === 'dom') ) {
			// Read the data from the DOM
			row._aData = _fnGetRowElements(
					settings, row, colIdx, colIdx === undefined ? undefined : row._aData
				)
				.data;
		}
		else {
			// Reading from data object, update the DOM
			var cells = row.anCells;
	
			if ( cells ) {
				if ( colIdx !== undefined ) {
					cellWrite( cells[colIdx], colIdx );
				}
				else {
					for ( i=0, ien=cells.length ; i<ien ; i++ ) {
						cellWrite( cells[i], i );
					}
				}
			}
		}
	
		// For both row and cell invalidation, the cached data for sorting and
		// filtering is nulled out
		row._aSortData = null;
		row._aFilterData = null;
	
		// Invalidate the type for a specific column (if given) or all columns since
		// the data might have changed
		var cols = settings.aoColumns;
		if ( colIdx !== undefined ) {
			cols[ colIdx ].sType = null;
		}
		else {
			for ( i=0, ien=cols.length ; i<ien ; i++ ) {
				cols[i].sType = null;
			}
	
			// Update DataTables special `DT_*` attributes for the row
			_fnRowAttributes( settings, row );
		}
	}
	
	
	/**
	 * Build a data source object from an HTML row, reading the contents of the
	 * cells that are in the row.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {node|object} TR element from which to read data or existing row
	 *   object from which to re-read the data from the cells
	 * @param {int} [colIdx] Optional column index
	 * @param {array|object} [d] Data source object. If `colIdx` is given then this
	 *   parameter should also be given and will be used to write the data into.
	 *   Only the column in question will be written
	 * @returns {object} Object with two parameters: `data` the data read, in
	 *   document order, and `cells` and array of nodes (they can be useful to the
	 *   caller, so rather than needing a second traversal to get them, just return
	 *   them from here).
	 * @memberof DataTable#oApi
	 */
	function _fnGetRowElements( settings, row, colIdx, d )
	{
		var
			tds = [],
			td = row.firstChild,
			name, col, o, i=0, contents,
			columns = settings.aoColumns,
			objectRead = settings._rowReadObject;
	
		// Allow the data object to be passed in, or construct
		d = d !== undefined ?
			d :
			objectRead ?
				{} :
				[];
	
		var attr = function ( str, td  ) {
			if ( typeof str === 'string' ) {
				var idx = str.indexOf('@');
	
				if ( idx !== -1 ) {
					var attr = str.substring( idx+1 );
					var setter = _fnSetObjectDataFn( str );
					setter( d, td.getAttribute( attr ) );
				}
			}
		};
	
		// Read data from a cell and store into the data object
		var cellProcess = function ( cell ) {
			if ( colIdx === undefined || colIdx === i ) {
				col = columns[i];
				contents = (cell.innerHTML).trim();
	
				if ( col && col._bAttrSrc ) {
					var setter = _fnSetObjectDataFn( col.mData._ );
					setter( d, contents );
	
					attr( col.mData.sort, cell );
					attr( col.mData.type, cell );
					attr( col.mData.filter, cell );
				}
				else {
					// Depending on the `data` option for the columns the data can
					// be read to either an object or an array.
					if ( objectRead ) {
						if ( ! col._setter ) {
							// Cache the setter function
							col._setter = _fnSetObjectDataFn( col.mData );
						}
						col._setter( d, contents );
					}
					else {
						d[i] = contents;
					}
				}
			}
	
			i++;
		};
	
		if ( td ) {
			// `tr` element was passed in
			while ( td ) {
				name = td.nodeName.toUpperCase();
	
				if ( name == "TD" || name == "TH" ) {
					cellProcess( td );
					tds.push( td );
				}
	
				td = td.nextSibling;
			}
		}
		else {
			// Existing row object passed in
			tds = row.anCells;
	
			for ( var j=0, jen=tds.length ; j<jen ; j++ ) {
				cellProcess( tds[j] );
			}
		}
	
		// Read the ID from the DOM if present
		var rowNode = row.firstChild ? row : row.nTr;
	
		if ( rowNode ) {
			var id = rowNode.getAttribute( 'id' );
	
			if ( id ) {
				_fnSetObjectDataFn( settings.rowId )( d, id );
			}
		}
	
		return {
			data: d,
			cells: tds
		};
	}
	/**
	 * Create a new TR element (and it's TD children) for a row
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow Row to consider
	 *  @param {node} [nTrIn] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @memberof DataTable#oApi
	 */
	function _fnCreateTr ( oSettings, iRow, nTrIn, anTds )
	{
		var
			row = oSettings.aoData[iRow],
			rowData = row._aData,
			cells = [],
			nTr, nTd, oCol,
			i, iLen, create;
	
		if ( row.nTr === null )
		{
			nTr = nTrIn || document.createElement('tr');
	
			row.nTr = nTr;
			row.anCells = cells;
	
			/* Use a private property on the node to allow reserve mapping from the node
			 * to the aoData array for fast look up
			 */
			nTr._DT_RowIndex = iRow;
	
			/* Special parameters can be given by the data source to be used on the row */
			_fnRowAttributes( oSettings, row );
	
			/* Process each column */
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				oCol = oSettings.aoColumns[i];
				create = nTrIn ? false : true;
	
				nTd = create ? document.createElement( oCol.sCellType ) : anTds[i];
				nTd._DT_CellIndex = {
					row: iRow,
					column: i
				};
				
				cells.push( nTd );
	
				// Need to create the HTML if new, or if a rendering function is defined
				if ( create || ((oCol.mRender || oCol.mData !== i) &&
					 (!$.isPlainObject(oCol.mData) || oCol.mData._ !== i+'.display')
				)) {
					nTd.innerHTML = _fnGetCellData( oSettings, iRow, i, 'display' );
				}
	
				/* Add user defined class */
				if ( oCol.sClass )
				{
					nTd.className += ' '+oCol.sClass;
				}
	
				// Visibility - add or remove as required
				if ( oCol.bVisible && ! nTrIn )
				{
					nTr.appendChild( nTd );
				}
				else if ( ! oCol.bVisible && nTrIn )
				{
					nTd.parentNode.removeChild( nTd );
				}
	
				if ( oCol.fnCreatedCell )
				{
					oCol.fnCreatedCell.call( oSettings.oInstance,
						nTd, _fnGetCellData( oSettings, iRow, i ), rowData, iRow, i
					);
				}
			}
	
			_fnCallbackFire( oSettings, 'aoRowCreatedCallback', null, [nTr, rowData, iRow, cells] );
		}
	}
	
	
	/**
	 * Add attributes to a row based on the special `DT_*` parameters in a data
	 * source object.
	 *  @param {object} settings DataTables settings object
	 *  @param {object} DataTables row object for the row to be modified
	 *  @memberof DataTable#oApi
	 */
	function _fnRowAttributes( settings, row )
	{
		var tr = row.nTr;
		var data = row._aData;
	
		if ( tr ) {
			var id = settings.rowIdFn( data );
	
			if ( id ) {
				tr.id = id;
			}
	
			if ( data.DT_RowClass ) {
				// Remove any classes added by DT_RowClass before
				var a = data.DT_RowClass.split(' ');
				row.__rowc = row.__rowc ?
					_unique( row.__rowc.concat( a ) ) :
					a;
	
				$(tr)
					.removeClass( row.__rowc.join(' ') )
					.addClass( data.DT_RowClass );
			}
	
			if ( data.DT_RowAttr ) {
				$(tr).attr( data.DT_RowAttr );
			}
	
			if ( data.DT_RowData ) {
				$(tr).data( data.DT_RowData );
			}
		}
	}
	
	
	/**
	 * Create the HTML header for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBuildHead( oSettings )
	{
		var i, ien, cell, row, column;
		var thead = oSettings.nTHead;
		var tfoot = oSettings.nTFoot;
		var createHeader = $('th, td', thead).length === 0;
		var classes = oSettings.oClasses;
		var columns = oSettings.aoColumns;
	
		if ( createHeader ) {
			row = $('<tr/>').appendTo( thead );
		}
	
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			column = columns[i];
			cell = $( column.nTh ).addClass( column.sClass );
	
			if ( createHeader ) {
				cell.appendTo( row );
			}
	
			// 1.11 move into sorting
			if ( oSettings.oFeatures.bSort ) {
				cell.addClass( column.sSortingClass );
	
				if ( column.bSortable !== false ) {
					cell
						.attr( 'tabindex', oSettings.iTabIndex )
						.attr( 'aria-controls', oSettings.sTableId );
	
					_fnSortAttachListener( oSettings, column.nTh, i );
				}
			}
	
			if ( column.sTitle != cell[0].innerHTML ) {
				cell.html( column.sTitle );
			}
	
			_fnRenderer( oSettings, 'header' )(
				oSettings, cell, column, classes
			);
		}
	
		if ( createHeader ) {
			_fnDetectHeader( oSettings.aoHeader, thead );
		}
	
		/* Deal with the footer - add classes if required */
		$(thead).children('tr').children('th, td').addClass( classes.sHeaderTH );
		$(tfoot).children('tr').children('th, td').addClass( classes.sFooterTH );
	
		// Cache the footer cells. Note that we only take the cells from the first
		// row in the footer. If there is more than one row the user wants to
		// interact with, they need to use the table().foot() method. Note also this
		// allows cells to be used for multiple columns using colspan
		if ( tfoot !== null ) {
			var cells = oSettings.aoFooter[0];
	
			for ( i=0, ien=cells.length ; i<ien ; i++ ) {
				column = columns[i];
				column.nTf = cells[i].cell;
	
				if ( column.sClass ) {
					$(column.nTf).addClass( column.sClass );
				}
			}
		}
	}
	
	
	/**
	 * Draw the header (or footer) element based on the column visibility states. The
	 * methodology here is to use the layout array from _fnDetectHeader, modified for
	 * the instantaneous column visibility, to construct the new layout. The grid is
	 * traversed over cell at a time in a rows x columns grid fashion, although each
	 * cell insert can cover multiple elements in the grid - which is tracks using the
	 * aApplied array. Cell inserts in the grid will only occur where there isn't
	 * already a cell in that position.
	 *  @param {object} oSettings dataTables settings object
	 *  @param array {objects} aoSource Layout array from _fnDetectHeader
	 *  @param {boolean} [bIncludeHidden=false] If true then include the hidden columns in the calc,
	 *  @memberof DataTable#oApi
	 */
	function _fnDrawHead( oSettings, aoSource, bIncludeHidden )
	{
		var i, iLen, j, jLen, k, kLen, n, nLocalTr;
		var aoLocal = [];
		var aApplied = [];
		var iColumns = oSettings.aoColumns.length;
		var iRowspan, iColspan;
	
		if ( ! aoSource )
		{
			return;
		}
	
		if (  bIncludeHidden === undefined )
		{
			bIncludeHidden = false;
		}
	
		/* Make a copy of the master layout array, but without the visible columns in it */
		for ( i=0, iLen=aoSource.length ; i<iLen ; i++ )
		{
			aoLocal[i] = aoSource[i].slice();
			aoLocal[i].nTr = aoSource[i].nTr;
	
			/* Remove any columns which are currently hidden */
			for ( j=iColumns-1 ; j>=0 ; j-- )
			{
				if ( !oSettings.aoColumns[j].bVisible && !bIncludeHidden )
				{
					aoLocal[i].splice( j, 1 );
				}
			}
	
			/* Prep the applied array - it needs an element for each row */
			aApplied.push( [] );
		}
	
		for ( i=0, iLen=aoLocal.length ; i<iLen ; i++ )
		{
			nLocalTr = aoLocal[i].nTr;
	
			/* All cells are going to be replaced, so empty out the row */
			if ( nLocalTr )
			{
				while( (n = nLocalTr.firstChild) )
				{
					nLocalTr.removeChild( n );
				}
			}
	
			for ( j=0, jLen=aoLocal[i].length ; j<jLen ; j++ )
			{
				iRowspan = 1;
				iColspan = 1;
	
				/* Check to see if there is already a cell (row/colspan) covering our target
				 * insert point. If there is, then there is nothing to do.
				 */
				if ( aApplied[i][j] === undefined )
				{
					nLocalTr.appendChild( aoLocal[i][j].cell );
					aApplied[i][j] = 1;
	
					/* Expand the cell to cover as many rows as needed */
					while ( aoLocal[i+iRowspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i+iRowspan][j].cell )
					{
						aApplied[i+iRowspan][j] = 1;
						iRowspan++;
					}
	
					/* Expand the cell to cover as many columns as needed */
					while ( aoLocal[i][j+iColspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i][j+iColspan].cell )
					{
						/* Must update the applied array over the rows for the columns */
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aApplied[i+k][j+iColspan] = 1;
						}
						iColspan++;
					}
	
					/* Do the actual expansion in the DOM */
					$(aoLocal[i][j].cell)
						.attr('rowspan', iRowspan)
						.attr('colspan', iColspan);
				}
			}
		}
	}
	
	
	/**
	 * Insert the required TR nodes into the table for display
	 *  @param {object} oSettings dataTables settings object
	 *  @param ajaxComplete true after ajax call to complete rendering
	 *  @memberof DataTable#oApi
	 */
	function _fnDraw( oSettings, ajaxComplete )
	{
		// Allow for state saving and a custom start position
		_fnStart( oSettings );
	
		/* Provide a pre-callback function which can be used to cancel the draw is false is returned */
		var aPreDraw = _fnCallbackFire( oSettings, 'aoPreDrawCallback', 'preDraw', [oSettings] );
		if ( $.inArray( false, aPreDraw ) !== -1 )
		{
			_fnProcessingDisplay( oSettings, false );
			return;
		}
	
		var anRows = [];
		var iRowCount = 0;
		var asStripeClasses = oSettings.asStripeClasses;
		var iStripes = asStripeClasses.length;
		var oLang = oSettings.oLanguage;
		var bServerSide = _fnDataSource( oSettings ) == 'ssp';
		var aiDisplay = oSettings.aiDisplay;
		var iDisplayStart = oSettings._iDisplayStart;
		var iDisplayEnd = oSettings.fnDisplayEnd();
	
		oSettings.bDrawing = true;
	
		/* Server-side processing draw intercept */
		if ( oSettings.bDeferLoading )
		{
			oSettings.bDeferLoading = false;
			oSettings.iDraw++;
			_fnProcessingDisplay( oSettings, false );
		}
		else if ( !bServerSide )
		{
			oSettings.iDraw++;
		}
		else if ( !oSettings.bDestroying && !ajaxComplete)
		{
			_fnAjaxUpdate( oSettings );
			return;
		}
	
		if ( aiDisplay.length !== 0 )
		{
			var iStart = bServerSide ? 0 : iDisplayStart;
			var iEnd = bServerSide ? oSettings.aoData.length : iDisplayEnd;
	
			for ( var j=iStart ; j<iEnd ; j++ )
			{
				var iDataIndex = aiDisplay[j];
				var aoData = oSettings.aoData[ iDataIndex ];
				if ( aoData.nTr === null )
				{
					_fnCreateTr( oSettings, iDataIndex );
				}
	
				var nRow = aoData.nTr;
	
				/* Remove the old striping classes and then add the new one */
				if ( iStripes !== 0 )
				{
					var sStripe = asStripeClasses[ iRowCount % iStripes ];
					if ( aoData._sRowStripe != sStripe )
					{
						$(nRow).removeClass( aoData._sRowStripe ).addClass( sStripe );
						aoData._sRowStripe = sStripe;
					}
				}
	
				// Row callback functions - might want to manipulate the row
				// iRowCount and j are not currently documented. Are they at all
				// useful?
				_fnCallbackFire( oSettings, 'aoRowCallback', null,
					[nRow, aoData._aData, iRowCount, j, iDataIndex] );
	
				anRows.push( nRow );
				iRowCount++;
			}
		}
		else
		{
			/* Table is empty - create a row with an empty message in it */
			var sZero = oLang.sZeroRecords;
			if ( oSettings.iDraw == 1 &&  _fnDataSource( oSettings ) == 'ajax' )
			{
				sZero = oLang.sLoadingRecords;
			}
			else if ( oLang.sEmptyTable && oSettings.fnRecordsTotal() === 0 )
			{
				sZero = oLang.sEmptyTable;
			}
	
			anRows[ 0 ] = $( '<tr/>', { 'class': iStripes ? asStripeClasses[0] : '' } )
				.append( $('<td />', {
					'valign':  'top',
					'colSpan': _fnVisbleColumns( oSettings ),
					'class':   oSettings.oClasses.sRowEmpty
				} ).html( sZero ) )[0];
		}
	
		/* Header and footer callbacks */
		_fnCallbackFire( oSettings, 'aoHeaderCallback', 'header', [ $(oSettings.nTHead).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );
	
		_fnCallbackFire( oSettings, 'aoFooterCallback', 'footer', [ $(oSettings.nTFoot).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );
	
		var body = $(oSettings.nTBody);
	
		body.children().detach();
		body.append( $(anRows) );
	
		/* Call all required callback functions for the end of a draw */
		_fnCallbackFire( oSettings, 'aoDrawCallback', 'draw', [oSettings] );
	
		/* Draw is complete, sorting and filtering must be as well */
		oSettings.bSorted = false;
		oSettings.bFiltered = false;
		oSettings.bDrawing = false;
	}
	
	
	/**
	 * Redraw the table - taking account of the various features which are enabled
	 *  @param {object} oSettings dataTables settings object
	 *  @param {boolean} [holdPosition] Keep the current paging position. By default
	 *    the paging is reset to the first page
	 *  @memberof DataTable#oApi
	 */
	function _fnReDraw( settings, holdPosition )
	{
		var
			features = settings.oFeatures,
			sort     = features.bSort,
			filter   = features.bFilter;
	
		if ( sort ) {
			_fnSort( settings );
		}
	
		if ( filter ) {
			_fnFilterComplete( settings, settings.oPreviousSearch );
		}
		else {
			// No filtering, so we want to just use the display master
			settings.aiDisplay = settings.aiDisplayMaster.slice();
		}
	
		if ( holdPosition !== true ) {
			settings._iDisplayStart = 0;
		}
	
		// Let any modules know about the draw hold position state (used by
		// scrolling internally)
		settings._drawHold = holdPosition;
	
		_fnDraw( settings );
	
		settings._drawHold = false;
	}
	
	
	/**
	 * Add the options to the page HTML for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAddOptionsHtml ( oSettings )
	{
		var classes = oSettings.oClasses;
		var table = $(oSettings.nTable);
		var holding = $('<div/>').insertBefore( table ); // Holding element for speed
		var features = oSettings.oFeatures;
	
		// All DataTables are wrapped in a div
		var insert = $('<div/>', {
			id:      oSettings.sTableId+'_wrapper',
			'class': classes.sWrapper + (oSettings.nTFoot ? '' : ' '+classes.sNoFooter)
		} );
	
		oSettings.nHolding = holding[0];
		oSettings.nTableWrapper = insert[0];
		oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;
	
		/* Loop over the user set positioning and place the elements as needed */
		var aDom = oSettings.sDom.split('');
		var featureNode, cOption, nNewNode, cNext, sAttr, j;
		for ( var i=0 ; i<aDom.length ; i++ )
		{
			featureNode = null;
			cOption = aDom[i];
	
			if ( cOption == '<' )
			{
				/* New container div */
				nNewNode = $('<div/>')[0];
	
				/* Check to see if we should append an id and/or a class name to the container */
				cNext = aDom[i+1];
				if ( cNext == "'" || cNext == '"' )
				{
					sAttr = "";
					j = 2;
					while ( aDom[i+j] != cNext )
					{
						sAttr += aDom[i+j];
						j++;
					}
	
					/* Replace jQuery UI constants @todo depreciated */
					if ( sAttr == "H" )
					{
						sAttr = classes.sJUIHeader;
					}
					else if ( sAttr == "F" )
					{
						sAttr = classes.sJUIFooter;
					}
	
					/* The attribute can be in the format of "#id.class", "#id" or "class" This logic
					 * breaks the string into parts and applies them as needed
					 */
					if ( sAttr.indexOf('.') != -1 )
					{
						var aSplit = sAttr.split('.');
						nNewNode.id = aSplit[0].substr(1, aSplit[0].length-1);
						nNewNode.className = aSplit[1];
					}
					else if ( sAttr.charAt(0) == "#" )
					{
						nNewNode.id = sAttr.substr(1, sAttr.length-1);
					}
					else
					{
						nNewNode.className = sAttr;
					}
	
					i += j; /* Move along the position array */
				}
	
				insert.append( nNewNode );
				insert = $(nNewNode);
			}
			else if ( cOption == '>' )
			{
				/* End container div */
				insert = insert.parent();
			}
			// @todo Move options into their own plugins?
			else if ( cOption == 'l' && features.bPaginate && features.bLengthChange )
			{
				/* Length */
				featureNode = _fnFeatureHtmlLength( oSettings );
			}
			else if ( cOption == 'f' && features.bFilter )
			{
				/* Filter */
				featureNode = _fnFeatureHtmlFilter( oSettings );
			}
			else if ( cOption == 'r' && features.bProcessing )
			{
				/* pRocessing */
				featureNode = _fnFeatureHtmlProcessing( oSettings );
			}
			else if ( cOption == 't' )
			{
				/* Table */
				featureNode = _fnFeatureHtmlTable( oSettings );
			}
			else if ( cOption ==  'i' && features.bInfo )
			{
				/* Info */
				featureNode = _fnFeatureHtmlInfo( oSettings );
			}
			else if ( cOption == 'p' && features.bPaginate )
			{
				/* Pagination */
				featureNode = _fnFeatureHtmlPaginate( oSettings );
			}
			else if ( DataTable.ext.feature.length !== 0 )
			{
				/* Plug-in features */
				var aoFeatures = DataTable.ext.feature;
				for ( var k=0, kLen=aoFeatures.length ; k<kLen ; k++ )
				{
					if ( cOption == aoFeatures[k].cFeature )
					{
						featureNode = aoFeatures[k].fnInit( oSettings );
						break;
					}
				}
			}
	
			/* Add to the 2D features array */
			if ( featureNode )
			{
				var aanFeatures = oSettings.aanFeatures;
	
				if ( ! aanFeatures[cOption] )
				{
					aanFeatures[cOption] = [];
				}
	
				aanFeatures[cOption].push( featureNode );
				insert.append( featureNode );
			}
		}
	
		/* Built our DOM structure - replace the holding div with what we want */
		holding.replaceWith( insert );
		oSettings.nHolding = null;
	}
	
	
	/**
	 * Use the DOM source to create up an array of header cells. The idea here is to
	 * create a layout grid (array) of rows x columns, which contains a reference
	 * to the cell that that point in the grid (regardless of col/rowspan), such that
	 * any column / row could be removed and the new grid constructed
	 *  @param array {object} aLayout Array to store the calculated layout in
	 *  @param {node} nThead The header/footer element for the table
	 *  @memberof DataTable#oApi
	 */
	function _fnDetectHeader ( aLayout, nThead )
	{
		var nTrs = $(nThead).children('tr');
		var nTr, nCell;
		var i, k, l, iLen, jLen, iColShifted, iColumn, iColspan, iRowspan;
		var bUnique;
		var fnShiftCol = function ( a, i, j ) {
			var k = a[i];
	                while ( k[j] ) {
				j++;
			}
			return j;
		};
	
		aLayout.splice( 0, aLayout.length );
	
		/* We know how many rows there are in the layout - so prep it */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			aLayout.push( [] );
		}
	
		/* Calculate a layout array */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			nTr = nTrs[i];
			iColumn = 0;
	
			/* For every cell in the row... */
			nCell = nTr.firstChild;
			while ( nCell ) {
				if ( nCell.nodeName.toUpperCase() == "TD" ||
				     nCell.nodeName.toUpperCase() == "TH" )
				{
					/* Get the col and rowspan attributes from the DOM and sanitise them */
					iColspan = nCell.getAttribute('colspan') * 1;
					iRowspan = nCell.getAttribute('rowspan') * 1;
					iColspan = (!iColspan || iColspan===0 || iColspan===1) ? 1 : iColspan;
					iRowspan = (!iRowspan || iRowspan===0 || iRowspan===1) ? 1 : iRowspan;
	
					/* There might be colspan cells already in this row, so shift our target
					 * accordingly
					 */
					iColShifted = fnShiftCol( aLayout, i, iColumn );
	
					/* Cache calculation for unique columns */
					bUnique = iColspan === 1 ? true : false;
	
					/* If there is col / rowspan, copy the information into the layout grid */
					for ( l=0 ; l<iColspan ; l++ )
					{
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aLayout[i+k][iColShifted+l] = {
								"cell": nCell,
								"unique": bUnique
							};
							aLayout[i+k].nTr = nTr;
						}
					}
				}
				nCell = nCell.nextSibling;
			}
		}
	}
	
	
	/**
	 * Get an array of unique th elements, one for each column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nHeader automatically detect the layout from this node - optional
	 *  @param {array} aLayout thead/tfoot layout from _fnDetectHeader - optional
	 *  @returns array {node} aReturn list of unique th's
	 *  @memberof DataTable#oApi
	 */
	function _fnGetUniqueThs ( oSettings, nHeader, aLayout )
	{
		var aReturn = [];
		if ( !aLayout )
		{
			aLayout = oSettings.aoHeader;
			if ( nHeader )
			{
				aLayout = [];
				_fnDetectHeader( aLayout, nHeader );
			}
		}
	
		for ( var i=0, iLen=aLayout.length ; i<iLen ; i++ )
		{
			for ( var j=0, jLen=aLayout[i].length ; j<jLen ; j++ )
			{
				if ( aLayout[i][j].unique &&
					 (!aReturn[j] || !oSettings.bSortCellsTop) )
				{
					aReturn[j] = aLayout[i][j].cell;
				}
			}
		}
	
		return aReturn;
	}
	
	/**
	 * Set the start position for draw
	 *  @param {object} oSettings dataTables settings object
	 */
	function _fnStart( oSettings )
	{
		var bServerSide = _fnDataSource( oSettings ) == 'ssp';
		var iInitDisplayStart = oSettings.iInitDisplayStart;
	
		// Check and see if we have an initial draw position from state saving
		if ( iInitDisplayStart !== undefined && iInitDisplayStart !== -1 )
		{
			oSettings._iDisplayStart = bServerSide ?
				iInitDisplayStart :
				iInitDisplayStart >= oSettings.fnRecordsDisplay() ?
					0 :
					iInitDisplayStart;
	
			oSettings.iInitDisplayStart = -1;
		}
	}
	
	/**
	 * Create an Ajax call based on the table's settings, taking into account that
	 * parameters can have multiple forms, and backwards compatibility.
	 *
	 * @param {object} oSettings dataTables settings object
	 * @param {array} data Data to send to the server, required by
	 *     DataTables - may be augmented by developer callbacks
	 * @param {function} fn Callback function to run when data is obtained
	 */
	function _fnBuildAjax( oSettings, data, fn )
	{
		// Compatibility with 1.9-, allow fnServerData and event to manipulate
		_fnCallbackFire( oSettings, 'aoServerParams', 'serverParams', [data] );
	
		// Convert to object based for 1.10+ if using the old array scheme which can
		// come from server-side processing or serverParams
		if ( data && Array.isArray(data) ) {
			var tmp = {};
			var rbracket = /(.*?)\[\]$/;
	
			$.each( data, function (key, val) {
				var match = val.name.match(rbracket);
	
				if ( match ) {
					// Support for arrays
					var name = match[0];
	
					if ( ! tmp[ name ] ) {
						tmp[ name ] = [];
					}
					tmp[ name ].push( val.value );
				}
				else {
					tmp[val.name] = val.value;
				}
			} );
			data = tmp;
		}
	
		var ajaxData;
		var ajax = oSettings.ajax;
		var instance = oSettings.oInstance;
		var callback = function ( json ) {
			var status = oSettings.jqXHR
				? oSettings.jqXHR.status
				: null;
	
			if ( json === null || (typeof status === 'number' && status == 204 ) ) {
				json = {};
				_fnAjaxDataSrc( oSettings, json, [] );
			}
	
			var error = json.error || json.sError;
			if ( error ) {
				_fnLog( oSettings, 0, error );
			}
	
			oSettings.json = json;
	
			_fnCallbackFire( oSettings, null, 'xhr', [oSettings, json, oSettings.jqXHR] );
			fn( json );
		};
	
		if ( $.isPlainObject( ajax ) && ajax.data )
		{
			ajaxData = ajax.data;
	
			var newData = typeof ajaxData === 'function' ?
				ajaxData( data, oSettings ) :  // fn can manipulate data or return
				ajaxData;                      // an object object or array to merge
	
			// If the function returned something, use that alone
			data = typeof ajaxData === 'function' && newData ?
				newData :
				$.extend( true, data, newData );
	
			// Remove the data property as we've resolved it already and don't want
			// jQuery to do it again (it is restored at the end of the function)
			delete ajax.data;
		}
	
		var baseAjax = {
			"data": data,
			"success": callback,
			"dataType": "json",
			"cache": false,
			"type": oSettings.sServerMethod,
			"error": function (xhr, error, thrown) {
				var ret = _fnCallbackFire( oSettings, null, 'xhr', [oSettings, null, oSettings.jqXHR] );
	
				if ( $.inArray( true, ret ) === -1 ) {
					if ( error == "parsererror" ) {
						_fnLog( oSettings, 0, 'Invalid JSON response', 1 );
					}
					else if ( xhr.readyState === 4 ) {
						_fnLog( oSettings, 0, 'Ajax error', 7 );
					}
				}
	
				_fnProcessingDisplay( oSettings, false );
			}
		};
	
		// Store the data submitted for the API
		oSettings.oAjaxData = data;
	
		// Allow plug-ins and external processes to modify the data
		_fnCallbackFire( oSettings, null, 'preXhr', [oSettings, data] );
	
		if ( oSettings.fnServerData )
		{
			// DataTables 1.9- compatibility
			oSettings.fnServerData.call( instance,
				oSettings.sAjaxSource,
				$.map( data, function (val, key) { // Need to convert back to 1.9 trad format
					return { name: key, value: val };
				} ),
				callback,
				oSettings
			);
		}
		else if ( oSettings.sAjaxSource || typeof ajax === 'string' )
		{
			// DataTables 1.9- compatibility
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, {
				url: ajax || oSettings.sAjaxSource
			} ) );
		}
		else if ( typeof ajax === 'function' )
		{
			// Is a function - let the caller define what needs to be done
			oSettings.jqXHR = ajax.call( instance, data, callback, oSettings );
		}
		else
		{
			// Object to extend the base settings
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, ajax ) );
	
			// Restore for next time around
			ajax.data = ajaxData;
		}
	}
	
	
	/**
	 * Update the table using an Ajax call
	 *  @param {object} settings dataTables settings object
	 *  @returns {boolean} Block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdate( settings )
	{
		settings.iDraw++;
		_fnProcessingDisplay( settings, true );
	
		_fnBuildAjax(
			settings,
			_fnAjaxParameters( settings ),
			function(json) {
				_fnAjaxUpdateDraw( settings, json );
			}
		);
	}
	
	
	/**
	 * Build up the parameters in an object needed for a server-side processing
	 * request. Note that this is basically done twice, is different ways - a modern
	 * method which is used by default in DataTables 1.10 which uses objects and
	 * arrays, or the 1.9- method with is name / value pairs. 1.9 method is used if
	 * the sAjaxSource option is used in the initialisation, or the legacyAjax
	 * option is set.
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {bool} block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxParameters( settings )
	{
		var
			columns = settings.aoColumns,
			columnCount = columns.length,
			features = settings.oFeatures,
			preSearch = settings.oPreviousSearch,
			preColSearch = settings.aoPreSearchCols,
			i, data = [], dataProp, column, columnSearch,
			sort = _fnSortFlatten( settings ),
			displayStart = settings._iDisplayStart,
			displayLength = features.bPaginate !== false ?
				settings._iDisplayLength :
				-1;
	
		var param = function ( name, value ) {
			data.push( { 'name': name, 'value': value } );
		};
	
		// DataTables 1.9- compatible method
		param( 'sEcho',          settings.iDraw );
		param( 'iColumns',       columnCount );
		param( 'sColumns',       _pluck( columns, 'sName' ).join(',') );
		param( 'iDisplayStart',  displayStart );
		param( 'iDisplayLength', displayLength );
	
		// DataTables 1.10+ method
		var d = {
			draw:    settings.iDraw,
			columns: [],
			order:   [],
			start:   displayStart,
			length:  displayLength,
			search:  {
				value: preSearch.sSearch,
				regex: preSearch.bRegex
			}
		};
	
		for ( i=0 ; i<columnCount ; i++ ) {
			column = columns[i];
			columnSearch = preColSearch[i];
			dataProp = typeof column.mData=="function" ? 'function' : column.mData ;
	
			d.columns.push( {
				data:       dataProp,
				name:       column.sName,
				searchable: column.bSearchable,
				orderable:  column.bSortable,
				search:     {
					value: columnSearch.sSearch,
					regex: columnSearch.bRegex
				}
			} );
	
			param( "mDataProp_"+i, dataProp );
	
			if ( features.bFilter ) {
				param( 'sSearch_'+i,     columnSearch.sSearch );
				param( 'bRegex_'+i,      columnSearch.bRegex );
				param( 'bSearchable_'+i, column.bSearchable );
			}
	
			if ( features.bSort ) {
				param( 'bSortable_'+i, column.bSortable );
			}
		}
	
		if ( features.bFilter ) {
			param( 'sSearch', preSearch.sSearch );
			param( 'bRegex', preSearch.bRegex );
		}
	
		if ( features.bSort ) {
			$.each( sort, function ( i, val ) {
				d.order.push( { column: val.col, dir: val.dir } );
	
				param( 'iSortCol_'+i, val.col );
				param( 'sSortDir_'+i, val.dir );
			} );
	
			param( 'iSortingCols', sort.length );
		}
	
		// If the legacy.ajax parameter is null, then we automatically decide which
		// form to use, based on sAjaxSource
		var legacy = DataTable.ext.legacy.ajax;
		if ( legacy === null ) {
			return settings.sAjaxSource ? data : d;
		}
	
		// Otherwise, if legacy has been specified then we use that to decide on the
		// form
		return legacy ? data : d;
	}
	
	
	/**
	 * Data the data from the server (nuking the old) and redraw the table
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} json json data return from the server.
	 *  @param {string} json.sEcho Tracking flag for DataTables to match requests
	 *  @param {int} json.iTotalRecords Number of records in the data set, not accounting for filtering
	 *  @param {int} json.iTotalDisplayRecords Number of records in the data set, accounting for filtering
	 *  @param {array} json.aaData The data to display on this page
	 *  @param {string} [json.sColumns] Column ordering (sName, comma separated)
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdateDraw ( settings, json )
	{
		// v1.10 uses camelCase variables, while 1.9 uses Hungarian notation.
		// Support both
		var compat = function ( old, modern ) {
			return json[old] !== undefined ? json[old] : json[modern];
		};
	
		var data = _fnAjaxDataSrc( settings, json );
		var draw            = compat( 'sEcho',                'draw' );
		var recordsTotal    = compat( 'iTotalRecords',        'recordsTotal' );
		var recordsFiltered = compat( 'iTotalDisplayRecords', 'recordsFiltered' );
	
		if ( draw !== undefined ) {
			// Protect against out of sequence returns
			if ( draw*1 < settings.iDraw ) {
				return;
			}
			settings.iDraw = draw * 1;
		}
	
		// No data in returned object, so rather than an array, we show an empty table
		if ( ! data ) {
			data = [];
		}
	
		_fnClearTable( settings );
		settings._iRecordsTotal   = parseInt(recordsTotal, 10);
		settings._iRecordsDisplay = parseInt(recordsFiltered, 10);
	
		for ( var i=0, ien=data.length ; i<ien ; i++ ) {
			_fnAddData( settings, data[i] );
		}
		settings.aiDisplay = settings.aiDisplayMaster.slice();
	
		_fnDraw( settings, true );
	
		if ( ! settings._bInitComplete ) {
			_fnInitComplete( settings, json );
		}
	
		_fnProcessingDisplay( settings, false );
	}
	
	
	/**
	 * Get the data from the JSON data source to use for drawing a table. Using
	 * `_fnGetObjectDataFn` allows the data to be sourced from a property of the
	 * source object, or from a processing function.
	 *  @param {object} oSettings dataTables settings object
	 *  @param  {object} json Data source object / array from the server
	 *  @return {array} Array of data to use
	 */
	 function _fnAjaxDataSrc ( oSettings, json, write )
	 {
		var dataSrc = $.isPlainObject( oSettings.ajax ) && oSettings.ajax.dataSrc !== undefined ?
			oSettings.ajax.dataSrc :
			oSettings.sAjaxDataProp; // Compatibility with 1.9-.
	
		if ( ! write ) {
			if ( dataSrc === 'data' ) {
				// If the default, then we still want to support the old style, and safely ignore
				// it if possible
				return json.aaData || json[dataSrc];
			}
	
			return dataSrc !== "" ?
				_fnGetObjectDataFn( dataSrc )( json ) :
				json;
		}
	
		// set
		_fnSetObjectDataFn( dataSrc )( json, write );
	}
	
	/**
	 * Generate the node required for filtering text
	 *  @returns {node} Filter control element
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlFilter ( settings )
	{
		var classes = settings.oClasses;
		var tableId = settings.sTableId;
		var language = settings.oLanguage;
		var previousSearch = settings.oPreviousSearch;
		var features = settings.aanFeatures;
		var input = '<input type="search" class="'+classes.sFilterInput+'"/>';
	
		var str = language.sSearch;
		str = str.match(/_INPUT_/) ?
			str.replace('_INPUT_', input) :
			str+input;
	
		var filter = $('<div/>', {
				'id': ! features.f ? tableId+'_filter' : null,
				'class': classes.sFilter
			} )
			.append( $('<label/>' ).append( str ) );
	
		var searchFn = function(event) {
			/* Update all other filter input elements for the new display */
			var n = features.f;
			var val = !this.value ? "" : this.value; // mental IE8 fix :-(
			if(previousSearch.return && event.key !== "Enter") {
				return;
			}
			/* Now do the filter */
			if ( val != previousSearch.sSearch ) {
				_fnFilterComplete( settings, {
					"sSearch": val,
					"bRegex": previousSearch.bRegex,
					"bSmart": previousSearch.bSmart ,
					"bCaseInsensitive": previousSearch.bCaseInsensitive,
					"return": previousSearch.return
				} );
	
				// Need to redraw, without resorting
				settings._iDisplayStart = 0;
				_fnDraw( settings );
			}
		};
	
		var searchDelay = settings.searchDelay !== null ?
			settings.searchDelay :
			_fnDataSource( settings ) === 'ssp' ?
				400 :
				0;
	
		var jqFilter = $('input', filter)
			.val( previousSearch.sSearch )
			.attr( 'placeholder', language.sSearchPlaceholder )
			.on(
				'keyup.DT search.DT input.DT paste.DT cut.DT',
				searchDelay ?
					_fnThrottle( searchFn, searchDelay ) :
					searchFn
			)
			.on( 'mouseup', function(e) {
				// Edge fix! Edge 17 does not trigger anything other than mouse events when clicking
				// on the clear icon (Edge bug 17584515). This is safe in other browsers as `searchFn`
				// checks the value to see if it has changed. In other browsers it won't have.
				setTimeout( function () {
					searchFn.call(jqFilter[0], e);
				}, 10);
			} )
			.on( 'keypress.DT', function(e) {
				/* Prevent form submission */
				if ( e.keyCode == 13 ) {
					return false;
				}
			} )
			.attr('aria-controls', tableId);
	
		// Update the input elements whenever the table is filtered
		$(settings.nTable).on( 'search.dt.DT', function ( ev, s ) {
			if ( settings === s ) {
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame...
				try {
					if ( jqFilter[0] !== document.activeElement ) {
						jqFilter.val( previousSearch.sSearch );
					}
				}
				catch ( e ) {}
			}
		} );
	
		return filter[0];
	}
	
	
	/**
	 * Filter the table using both the global filter and column based filtering
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oSearch search information
	 *  @param {int} [iForce] force a research of the master array (1) or not (undefined or 0)
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterComplete ( oSettings, oInput, iForce )
	{
		var oPrevSearch = oSettings.oPreviousSearch;
		var aoPrevSearch = oSettings.aoPreSearchCols;
		var fnSaveFilter = function ( oFilter ) {
			/* Save the filtering values */
			oPrevSearch.sSearch = oFilter.sSearch;
			oPrevSearch.bRegex = oFilter.bRegex;
			oPrevSearch.bSmart = oFilter.bSmart;
			oPrevSearch.bCaseInsensitive = oFilter.bCaseInsensitive;
			oPrevSearch.return = oFilter.return;
		};
		var fnRegex = function ( o ) {
			// Backwards compatibility with the bEscapeRegex option
			return o.bEscapeRegex !== undefined ? !o.bEscapeRegex : o.bRegex;
		};
	
		// Resolve any column types that are unknown due to addition or invalidation
		// @todo As per sort - can this be moved into an event handler?
		_fnColumnTypes( oSettings );
	
		/* In server-side processing all filtering is done by the server, so no point hanging around here */
		if ( _fnDataSource( oSettings ) != 'ssp' )
		{
			/* Global filter */
			_fnFilter( oSettings, oInput.sSearch, iForce, fnRegex(oInput), oInput.bSmart, oInput.bCaseInsensitive, oInput.return );
			fnSaveFilter( oInput );
	
			/* Now do the individual column filter */
			for ( var i=0 ; i<aoPrevSearch.length ; i++ )
			{
				_fnFilterColumn( oSettings, aoPrevSearch[i].sSearch, i, fnRegex(aoPrevSearch[i]),
					aoPrevSearch[i].bSmart, aoPrevSearch[i].bCaseInsensitive );
			}
	
			/* Custom filtering */
			_fnFilterCustom( oSettings );
		}
		else
		{
			fnSaveFilter( oInput );
		}
	
		/* Tell the draw function we have been filtering */
		oSettings.bFiltered = true;
		_fnCallbackFire( oSettings, null, 'search', [oSettings] );
	}
	
	
	/**
	 * Apply custom filtering functions
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCustom( settings )
	{
		var filters = DataTable.ext.search;
		var displayRows = settings.aiDisplay;
		var row, rowIdx;
	
		for ( var i=0, ien=filters.length ; i<ien ; i++ ) {
			var rows = [];
	
			// Loop over each row and see if it should be included
			for ( var j=0, jen=displayRows.length ; j<jen ; j++ ) {
				rowIdx = displayRows[ j ];
				row = settings.aoData[ rowIdx ];
	
				if ( filters[i]( settings, row._aFilterData, rowIdx, row._aData, j ) ) {
					rows.push( rowIdx );
				}
			}
	
			// So the array reference doesn't break set the results into the
			// existing array
			displayRows.length = 0;
			$.merge( displayRows, rows );
		}
	}
	
	
	/**
	 * Filter the table on a per-column basis
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sInput string to filter on
	 *  @param {int} iColumn column to filter
	 *  @param {bool} bRegex treat search string as a regular expression or not
	 *  @param {bool} bSmart use smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insensitive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterColumn ( settings, searchStr, colIdx, regex, smart, caseInsensitive )
	{
		if ( searchStr === '' ) {
			return;
		}
	
		var data;
		var out = [];
		var display = settings.aiDisplay;
		var rpSearch = _fnFilterCreateSearch( searchStr, regex, smart, caseInsensitive );
	
		for ( var i=0 ; i<display.length ; i++ ) {
			data = settings.aoData[ display[i] ]._aFilterData[ colIdx ];
	
			if ( rpSearch.test( data ) ) {
				out.push( display[i] );
			}
		}
	
		settings.aiDisplay = out;
	}
	
	
	/**
	 * Filter the data table based on user input and draw the table
	 *  @param {object} settings dataTables settings object
	 *  @param {string} input string to filter on
	 *  @param {int} force optional - force a research of the master array (1) or not (undefined or 0)
	 *  @param {bool} regex treat as a regular expression or not
	 *  @param {bool} smart perform smart filtering or not
	 *  @param {bool} caseInsensitive Do case insensitive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilter( settings, input, force, regex, smart, caseInsensitive )
	{
		var rpSearch = _fnFilterCreateSearch( input, regex, smart, caseInsensitive );
		var prevSearch = settings.oPreviousSearch.sSearch;
		var displayMaster = settings.aiDisplayMaster;
		var display, invalidated, i;
		var filtered = [];
	
		// Need to take account of custom filtering functions - always filter
		if ( DataTable.ext.search.length !== 0 ) {
			force = true;
		}
	
		// Check if any of the rows were invalidated
		invalidated = _fnFilterData( settings );
	
		// If the input is blank - we just want the full data set
		if ( input.length <= 0 ) {
			settings.aiDisplay = displayMaster.slice();
		}
		else {
			// New search - start from the master array
			if ( invalidated ||
				 force ||
				 regex ||
				 prevSearch.length > input.length ||
				 input.indexOf(prevSearch) !== 0 ||
				 settings.bSorted // On resort, the display master needs to be
				                  // re-filtered since indexes will have changed
			) {
				settings.aiDisplay = displayMaster.slice();
			}
	
			// Search the display array
			display = settings.aiDisplay;
	
			for ( i=0 ; i<display.length ; i++ ) {
				if ( rpSearch.test( settings.aoData[ display[i] ]._sFilterRow ) ) {
					filtered.push( display[i] );
				}
			}
	
			settings.aiDisplay = filtered;
		}
	}
	
	
	/**
	 * Build a regular expression object suitable for searching a table
	 *  @param {string} sSearch string to search for
	 *  @param {bool} bRegex treat as a regular expression or not
	 *  @param {bool} bSmart perform smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insensitive matching or not
	 *  @returns {RegExp} constructed object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCreateSearch( search, regex, smart, caseInsensitive )
	{
		search = regex ?
			search :
			_fnEscapeRegex( search );
		
		if ( smart ) {
			/* For smart filtering we want to allow the search to work regardless of
			 * word order. We also want double quoted text to be preserved, so word
			 * order is important - a la google. So this is what we want to
			 * generate:
			 * 
			 * ^(?=.*?\bone\b)(?=.*?\btwo three\b)(?=.*?\bfour\b).*$
			 */
			var a = $.map( search.match( /"[^"]+"|[^ ]+/g ) || [''], function ( word ) {
				if ( word.charAt(0) === '"' ) {
					var m = word.match( /^"(.*)"$/ );
					word = m ? m[1] : word;
				}
	
				return word.replace('"', '');
			} );
	
			search = '^(?=.*?'+a.join( ')(?=.*?' )+').*$';
		}
	
		return new RegExp( search, caseInsensitive ? 'i' : '' );
	}
	
	
	/**
	 * Escape a string such that it can be used in a regular expression
	 *  @param {string} sVal string to escape
	 *  @returns {string} escaped string
	 *  @memberof DataTable#oApi
	 */
	var _fnEscapeRegex = DataTable.util.escapeRegex;
	
	var __filter_div = $('<div>')[0];
	var __filter_div_textContent = __filter_div.textContent !== undefined;
	
	// Update the filtering data for each row if needed (by invalidation or first run)
	function _fnFilterData ( settings )
	{
		var columns = settings.aoColumns;
		var column;
		var i, j, ien, jen, filterData, cellData, row;
		var wasInvalidated = false;
	
		for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];
	
			if ( ! row._aFilterData ) {
				filterData = [];
	
				for ( j=0, jen=columns.length ; j<jen ; j++ ) {
					column = columns[j];
	
					if ( column.bSearchable ) {
						cellData = _fnGetCellData( settings, i, j, 'filter' );
	
						// Search in DataTables 1.10 is string based. In 1.11 this
						// should be altered to also allow strict type checking.
						if ( cellData === null ) {
							cellData = '';
						}
	
						if ( typeof cellData !== 'string' && cellData.toString ) {
							cellData = cellData.toString();
						}
					}
					else {
						cellData = '';
					}
	
					// If it looks like there is an HTML entity in the string,
					// attempt to decode it so sorting works as expected. Note that
					// we could use a single line of jQuery to do this, but the DOM
					// method used here is much faster http://jsperf.com/html-decode
					if ( cellData.indexOf && cellData.indexOf('&') !== -1 ) {
						__filter_div.innerHTML = cellData;
						cellData = __filter_div_textContent ?
							__filter_div.textContent :
							__filter_div.innerText;
					}
	
					if ( cellData.replace ) {
						cellData = cellData.replace(/[\r\n\u2028]/g, '');
					}
	
					filterData.push( cellData );
				}
	
				row._aFilterData = filterData;
				row._sFilterRow = filterData.join('  ');
				wasInvalidated = true;
			}
		}
	
		return wasInvalidated;
	}
	
	
	/**
	 * Convert from the internal Hungarian notation to camelCase for external
	 * interaction
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToCamel ( obj )
	{
		return {
			search:          obj.sSearch,
			smart:           obj.bSmart,
			regex:           obj.bRegex,
			caseInsensitive: obj.bCaseInsensitive
		};
	}
	
	
	
	/**
	 * Convert from camelCase notation to the internal Hungarian. We could use the
	 * Hungarian convert function here, but this is cleaner
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToHung ( obj )
	{
		return {
			sSearch:          obj.search,
			bSmart:           obj.smart,
			bRegex:           obj.regex,
			bCaseInsensitive: obj.caseInsensitive
		};
	}
	
	/**
	 * Generate the node required for the info display
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Information element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlInfo ( settings )
	{
		var
			tid = settings.sTableId,
			nodes = settings.aanFeatures.i,
			n = $('<div/>', {
				'class': settings.oClasses.sInfo,
				'id': ! nodes ? tid+'_info' : null
			} );
	
		if ( ! nodes ) {
			// Update display on each draw
			settings.aoDrawCallback.push( {
				"fn": _fnUpdateInfo,
				"sName": "information"
			} );
	
			n
				.attr( 'role', 'status' )
				.attr( 'aria-live', 'polite' );
	
			// Table is described by our info div
			$(settings.nTable).attr( 'aria-describedby', tid+'_info' );
		}
	
		return n[0];
	}
	
	
	/**
	 * Update the information elements in the display
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnUpdateInfo ( settings )
	{
		/* Show information about the table */
		var nodes = settings.aanFeatures.i;
		if ( nodes.length === 0 ) {
			return;
		}
	
		var
			lang  = settings.oLanguage,
			start = settings._iDisplayStart+1,
			end   = settings.fnDisplayEnd(),
			max   = settings.fnRecordsTotal(),
			total = settings.fnRecordsDisplay(),
			out   = total ?
				lang.sInfo :
				lang.sInfoEmpty;
	
		if ( total !== max ) {
			/* Record set after filtering */
			out += ' ' + lang.sInfoFiltered;
		}
	
		// Convert the macros
		out += lang.sInfoPostFix;
		out = _fnInfoMacros( settings, out );
	
		var callback = lang.fnInfoCallback;
		if ( callback !== null ) {
			out = callback.call( settings.oInstance,
				settings, start, end, max, total, out
			);
		}
	
		$(nodes).html( out );
	}
	
	
	function _fnInfoMacros ( settings, str )
	{
		// When infinite scrolling, we are always starting at 1. _iDisplayStart is used only
		// internally
		var
			formatter  = settings.fnFormatNumber,
			start      = settings._iDisplayStart+1,
			len        = settings._iDisplayLength,
			vis        = settings.fnRecordsDisplay(),
			all        = len === -1;
	
		return str.
			replace(/_START_/g, formatter.call( settings, start ) ).
			replace(/_END_/g,   formatter.call( settings, settings.fnDisplayEnd() ) ).
			replace(/_MAX_/g,   formatter.call( settings, settings.fnRecordsTotal() ) ).
			replace(/_TOTAL_/g, formatter.call( settings, vis ) ).
			replace(/_PAGE_/g,  formatter.call( settings, all ? 1 : Math.ceil( start / len ) ) ).
			replace(/_PAGES_/g, formatter.call( settings, all ? 1 : Math.ceil( vis / len ) ) );
	}
	
	
	
	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnInitialise ( settings )
	{
		var i, iLen, iAjaxStart=settings.iInitDisplayStart;
		var columns = settings.aoColumns, column;
		var features = settings.oFeatures;
		var deferLoading = settings.bDeferLoading; // value modified by the draw
	
		/* Ensure that the table data is fully initialised */
		if ( ! settings.bInitialised ) {
			setTimeout( function(){ _fnInitialise( settings ); }, 200 );
			return;
		}
	
		/* Show the display HTML options */
		_fnAddOptionsHtml( settings );
	
		/* Build and draw the header / footer for the table */
		_fnBuildHead( settings );
		_fnDrawHead( settings, settings.aoHeader );
		_fnDrawHead( settings, settings.aoFooter );
	
		/* Okay to show that something is going on now */
		_fnProcessingDisplay( settings, true );
	
		/* Calculate sizes for columns */
		if ( features.bAutoWidth ) {
			_fnCalculateColumnWidths( settings );
		}
	
		for ( i=0, iLen=columns.length ; i<iLen ; i++ ) {
			column = columns[i];
	
			if ( column.sWidth ) {
				column.nTh.style.width = _fnStringToCss( column.sWidth );
			}
		}
	
		_fnCallbackFire( settings, null, 'preInit', [settings] );
	
		// If there is default sorting required - let's do it. The sort function
		// will do the drawing for us. Otherwise we draw the table regardless of the
		// Ajax source - this allows the table to look initialised for Ajax sourcing
		// data (show 'loading' message possibly)
		_fnReDraw( settings );
	
		// Server-side processing init complete is done by _fnAjaxUpdateDraw
		var dataSrc = _fnDataSource( settings );
		if ( dataSrc != 'ssp' || deferLoading ) {
			// if there is an ajax source load the data
			if ( dataSrc == 'ajax' ) {
				_fnBuildAjax( settings, [], function(json) {
					var aData = _fnAjaxDataSrc( settings, json );
	
					// Got the data - add it to the table
					for ( i=0 ; i<aData.length ; i++ ) {
						_fnAddData( settings, aData[i] );
					}
	
					// Reset the init display for cookie saving. We've already done
					// a filter, and therefore cleared it before. So we need to make
					// it appear 'fresh'
					settings.iInitDisplayStart = iAjaxStart;
	
					_fnReDraw( settings );
	
					_fnProcessingDisplay( settings, false );
					_fnInitComplete( settings, json );
				}, settings );
			}
			else {
				_fnProcessingDisplay( settings, false );
				_fnInitComplete( settings );
			}
		}
	}
	
	
	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} [json] JSON from the server that completed the table, if using Ajax source
	 *    with client-side processing (optional)
	 *  @memberof DataTable#oApi
	 */
	function _fnInitComplete ( settings, json )
	{
		settings._bInitComplete = true;
	
		// When data was added after the initialisation (data or Ajax) we need to
		// calculate the column sizing
		if ( json || settings.oInit.aaData ) {
			_fnAdjustColumnSizing( settings );
		}
	
		_fnCallbackFire( settings, null, 'plugin-init', [settings, json] );
		_fnCallbackFire( settings, 'aoInitComplete', 'init', [settings, json] );
	}
	
	
	function _fnLengthChange ( settings, val )
	{
		var len = parseInt( val, 10 );
		settings._iDisplayLength = len;
	
		_fnLengthOverflow( settings );
	
		// Fire length change event
		_fnCallbackFire( settings, null, 'length', [settings, len] );
	}
	
	
	/**
	 * Generate the node required for user display length changing
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Display length feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlLength ( settings )
	{
		var
			classes  = settings.oClasses,
			tableId  = settings.sTableId,
			menu     = settings.aLengthMenu,
			d2       = Array.isArray( menu[0] ),
			lengths  = d2 ? menu[0] : menu,
			language = d2 ? menu[1] : menu;
	
		var select = $('<select/>', {
			'name':          tableId+'_length',
			'aria-controls': tableId,
			'class':         classes.sLengthSelect
		} );
	
		for ( var i=0, ien=lengths.length ; i<ien ; i++ ) {
			select[0][ i ] = new Option(
				typeof language[i] === 'number' ?
					settings.fnFormatNumber( language[i] ) :
					language[i],
				lengths[i]
			);
		}
	
		var div = $('<div><label/></div>').addClass( classes.sLength );
		if ( ! settings.aanFeatures.l ) {
			div[0].id = tableId+'_length';
		}
	
		div.children().append(
			settings.oLanguage.sLengthMenu.replace( '_MENU_', select[0].outerHTML )
		);
	
		// Can't use `select` variable as user might provide their own and the
		// reference is broken by the use of outerHTML
		$('select', div)
			.val( settings._iDisplayLength )
			.on( 'change.DT', function(e) {
				_fnLengthChange( settings, $(this).val() );
				_fnDraw( settings );
			} );
	
		// Update node value whenever anything changes the table's length
		$(settings.nTable).on( 'length.dt.DT', function (e, s, len) {
			if ( settings === s ) {
				$('select', div).val( len );
			}
		} );
	
		return div[0];
	}
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Note that most of the paging logic is done in
	 * DataTable.ext.pager
	 */
	
	/**
	 * Generate the node required for default pagination
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Pagination feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlPaginate ( settings )
	{
		var
			type   = settings.sPaginationType,
			plugin = DataTable.ext.pager[ type ],
			modern = typeof plugin === 'function',
			redraw = function( settings ) {
				_fnDraw( settings );
			},
			node = $('<div/>').addClass( settings.oClasses.sPaging + type )[0],
			features = settings.aanFeatures;
	
		if ( ! modern ) {
			plugin.fnInit( settings, node, redraw );
		}
	
		/* Add a draw callback for the pagination on first instance, to update the paging display */
		if ( ! features.p )
		{
			node.id = settings.sTableId+'_paginate';
	
			settings.aoDrawCallback.push( {
				"fn": function( settings ) {
					if ( modern ) {
						var
							start      = settings._iDisplayStart,
							len        = settings._iDisplayLength,
							visRecords = settings.fnRecordsDisplay(),
							all        = len === -1,
							page = all ? 0 : Math.ceil( start / len ),
							pages = all ? 1 : Math.ceil( visRecords / len ),
							buttons = plugin(page, pages),
							i, ien;
	
						for ( i=0, ien=features.p.length ; i<ien ; i++ ) {
							_fnRenderer( settings, 'pageButton' )(
								settings, features.p[i], i, buttons, page, pages
							);
						}
					}
					else {
						plugin.fnUpdate( settings, redraw );
					}
				},
				"sName": "pagination"
			} );
		}
	
		return node;
	}
	
	
	/**
	 * Alter the display settings to change the page
	 *  @param {object} settings DataTables settings object
	 *  @param {string|int} action Paging action to take: "first", "previous",
	 *    "next" or "last" or page number to jump to (integer)
	 *  @param [bool] redraw Automatically draw the update or not
	 *  @returns {bool} true page has changed, false - no change
	 *  @memberof DataTable#oApi
	 */
	function _fnPageChange ( settings, action, redraw )
	{
		var
			start     = settings._iDisplayStart,
			len       = settings._iDisplayLength,
			records   = settings.fnRecordsDisplay();
	
		if ( records === 0 || len === -1 )
		{
			start = 0;
		}
		else if ( typeof action === "number" )
		{
			start = action * len;
	
			if ( start > records )
			{
				start = 0;
			}
		}
		else if ( action == "first" )
		{
			start = 0;
		}
		else if ( action == "previous" )
		{
			start = len >= 0 ?
				start - len :
				0;
	
			if ( start < 0 )
			{
			  start = 0;
			}
		}
		else if ( action == "next" )
		{
			if ( start + len < records )
			{
				start += len;
			}
		}
		else if ( action == "last" )
		{
			start = Math.floor( (records-1) / len) * len;
		}
		else
		{
			_fnLog( settings, 0, "Unknown paging action: "+action, 5 );
		}
	
		var changed = settings._iDisplayStart !== start;
		settings._iDisplayStart = start;
	
		if ( changed ) {
			_fnCallbackFire( settings, null, 'page', [settings] );
	
			if ( redraw ) {
				_fnDraw( settings );
			}
		}
	
		return changed;
	}
	
	
	
	/**
	 * Generate the node required for the processing node
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Processing element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlProcessing ( settings )
	{
		return $('<div/>', {
				'id': ! settings.aanFeatures.r ? settings.sTableId+'_processing' : null,
				'class': settings.oClasses.sProcessing
			} )
			.html( settings.oLanguage.sProcessing )
			.append('<div><div></div><div></div><div></div><div></div></div>')
			.insertBefore( settings.nTable )[0];
	}
	
	
	/**
	 * Display or hide the processing indicator
	 *  @param {object} settings dataTables settings object
	 *  @param {bool} show Show the processing indicator (true) or not (false)
	 *  @memberof DataTable#oApi
	 */
	function _fnProcessingDisplay ( settings, show )
	{
		if ( settings.oFeatures.bProcessing ) {
			$(settings.aanFeatures.r).css( 'display', show ? 'block' : 'none' );
		}
	
		_fnCallbackFire( settings, null, 'processing', [settings, show] );
	}
	
	/**
	 * Add any control elements for the table - specifically scrolling
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Node to add to the DOM
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlTable ( settings )
	{
		var table = $(settings.nTable);
	
		// Scrolling from here on in
		var scroll = settings.oScroll;
	
		if ( scroll.sX === '' && scroll.sY === '' ) {
			return settings.nTable;
		}
	
		var scrollX = scroll.sX;
		var scrollY = scroll.sY;
		var classes = settings.oClasses;
		var caption = table.children('caption');
		var captionSide = caption.length ? caption[0]._captionSide : null;
		var headerClone = $( table[0].cloneNode(false) );
		var footerClone = $( table[0].cloneNode(false) );
		var footer = table.children('tfoot');
		var _div = '<div/>';
		var size = function ( s ) {
			return !s ? null : _fnStringToCss( s );
		};
	
		if ( ! footer.length ) {
			footer = null;
		}
	
		/*
		 * The HTML structure that we want to generate in this function is:
		 *  div - scroller
		 *    div - scroll head
		 *      div - scroll head inner
		 *        table - scroll head table
		 *          thead - thead
		 *    div - scroll body
		 *      table - table (master table)
		 *        thead - thead clone for sizing
		 *        tbody - tbody
		 *    div - scroll foot
		 *      div - scroll foot inner
		 *        table - scroll foot table
		 *          tfoot - tfoot
		 */
		var scroller = $( _div, { 'class': classes.sScrollWrapper } )
			.append(
				$(_div, { 'class': classes.sScrollHead } )
					.css( {
						overflow: 'hidden',
						position: 'relative',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollHeadInner } )
							.css( {
								'box-sizing': 'content-box',
								width: scroll.sXInner || '100%'
							} )
							.append(
								headerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'top' ? caption : null )
									.append(
										table.children('thead')
									)
							)
					)
			)
			.append(
				$(_div, { 'class': classes.sScrollBody } )
					.css( {
						position: 'relative',
						overflow: 'auto',
						width: size( scrollX )
					} )
					.append( table )
			);
	
		if ( footer ) {
			scroller.append(
				$(_div, { 'class': classes.sScrollFoot } )
					.css( {
						overflow: 'hidden',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollFootInner } )
							.append(
								footerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'bottom' ? caption : null )
									.append(
										table.children('tfoot')
									)
							)
					)
			);
		}
	
		var children = scroller.children();
		var scrollHead = children[0];
		var scrollBody = children[1];
		var scrollFoot = footer ? children[2] : null;
	
		// When the body is scrolled, then we also want to scroll the headers
		if ( scrollX ) {
			$(scrollBody).on( 'scroll.DT', function (e) {
				var scrollLeft = this.scrollLeft;
	
				scrollHead.scrollLeft = scrollLeft;
	
				if ( footer ) {
					scrollFoot.scrollLeft = scrollLeft;
				}
			} );
		}
	
		$(scrollBody).css('max-height', scrollY);
		if (! scroll.bCollapse) {
			$(scrollBody).css('height', scrollY);
		}
	
		settings.nScrollHead = scrollHead;
		settings.nScrollBody = scrollBody;
		settings.nScrollFoot = scrollFoot;
	
		// On redraw - align columns
		settings.aoDrawCallback.push( {
			"fn": _fnScrollDraw,
			"sName": "scrolling"
		} );
	
		return scroller[0];
	}
	
	
	
	/**
	 * Update the header, footer and body tables for resizing - i.e. column
	 * alignment.
	 *
	 * Welcome to the most horrible function DataTables. The process that this
	 * function follows is basically:
	 *   1. Re-create the table inside the scrolling div
	 *   2. Take live measurements from the DOM
	 *   3. Apply the measurements to align the columns
	 *   4. Clean up
	 *
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnScrollDraw ( settings )
	{
		// Given that this is such a monster function, a lot of variables are use
		// to try and keep the minimised size as small as possible
		var
			scroll         = settings.oScroll,
			scrollX        = scroll.sX,
			scrollXInner   = scroll.sXInner,
			scrollY        = scroll.sY,
			barWidth       = scroll.iBarWidth,
			divHeader      = $(settings.nScrollHead),
			divHeaderStyle = divHeader[0].style,
			divHeaderInner = divHeader.children('div'),
			divHeaderInnerStyle = divHeaderInner[0].style,
			divHeaderTable = divHeaderInner.children('table'),
			divBodyEl      = settings.nScrollBody,
			divBody        = $(divBodyEl),
			divBodyStyle   = divBodyEl.style,
			divFooter      = $(settings.nScrollFoot),
			divFooterInner = divFooter.children('div'),
			divFooterTable = divFooterInner.children('table'),
			header         = $(settings.nTHead),
			table          = $(settings.nTable),
			tableEl        = table[0],
			tableStyle     = tableEl.style,
			footer         = settings.nTFoot ? $(settings.nTFoot) : null,
			browser        = settings.oBrowser,
			ie67           = browser.bScrollOversize,
			dtHeaderCells  = _pluck( settings.aoColumns, 'nTh' ),
			headerTrgEls, footerTrgEls,
			headerSrcEls, footerSrcEls,
			headerCopy, footerCopy,
			headerWidths=[], footerWidths=[],
			headerContent=[], footerContent=[],
			idx, correction, sanityWidth,
			zeroOut = function(nSizer) {
				var style = nSizer.style;
				style.paddingTop = "0";
				style.paddingBottom = "0";
				style.borderTopWidth = "0";
				style.borderBottomWidth = "0";
				style.height = 0;
			};
	
		// If the scrollbar visibility has changed from the last draw, we need to
		// adjust the column sizes as the table width will have changed to account
		// for the scrollbar
		var scrollBarVis = divBodyEl.scrollHeight > divBodyEl.clientHeight;
		
		if ( settings.scrollBarVis !== scrollBarVis && settings.scrollBarVis !== undefined ) {
			settings.scrollBarVis = scrollBarVis;
			_fnAdjustColumnSizing( settings );
			return; // adjust column sizing will call this function again
		}
		else {
			settings.scrollBarVis = scrollBarVis;
		}
	
		/*
		 * 1. Re-create the table inside the scrolling div
		 */
	
		// Remove the old minimised thead and tfoot elements in the inner table
		table.children('thead, tfoot').remove();
	
		if ( footer ) {
			footerCopy = footer.clone().prependTo( table );
			footerTrgEls = footer.find('tr'); // the original tfoot is in its own table and must be sized
			footerSrcEls = footerCopy.find('tr');
			footerCopy.find('[id]').removeAttr('id');
		}
	
		// Clone the current header and footer elements and then place it into the inner table
		headerCopy = header.clone().prependTo( table );
		headerTrgEls = header.find('tr'); // original header is in its own table
		headerSrcEls = headerCopy.find('tr');
		headerCopy.find('th, td').removeAttr('tabindex');
		headerCopy.find('[id]').removeAttr('id');
	
	
		/*
		 * 2. Take live measurements from the DOM - do not alter the DOM itself!
		 */
	
		// Remove old sizing and apply the calculated column widths
		// Get the unique column headers in the newly created (cloned) header. We want to apply the
		// calculated sizes to this header
		if ( ! scrollX )
		{
			divBodyStyle.width = '100%';
			divHeader[0].style.width = '100%';
		}
	
		$.each( _fnGetUniqueThs( settings, headerCopy ), function ( i, el ) {
			idx = _fnVisibleToColumnIndex( settings, i );
			el.style.width = settings.aoColumns[idx].sWidth;
		} );
	
		if ( footer ) {
			_fnApplyToChildren( function(n) {
				n.style.width = "";
			}, footerSrcEls );
		}
	
		// Size the table as a whole
		sanityWidth = table.outerWidth();
		if ( scrollX === "" ) {
			// No x scrolling
			tableStyle.width = "100%";
	
			// IE7 will make the width of the table when 100% include the scrollbar
			// - which is shouldn't. When there is a scrollbar we need to take this
			// into account.
			if ( ie67 && (table.find('tbody').height() > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( table.outerWidth() - barWidth);
			}
	
			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}
		else if ( scrollXInner !== "" ) {
			// legacy x scroll inner has been given - use it
			tableStyle.width = _fnStringToCss(scrollXInner);
	
			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}
	
		// Hidden header should have zero height, so remove padding and borders. Then
		// set the width based on the real headers
	
		// Apply all styles in one pass
		_fnApplyToChildren( zeroOut, headerSrcEls );
	
		// Read all widths in next pass
		_fnApplyToChildren( function(nSizer) {
			var style = window.getComputedStyle ?
				window.getComputedStyle(nSizer).width :
				_fnStringToCss( $(nSizer).width() );
	
			headerContent.push( nSizer.innerHTML );
			headerWidths.push( style );
		}, headerSrcEls );
	
		// Apply all widths in final pass
		_fnApplyToChildren( function(nToSize, i) {
			nToSize.style.width = headerWidths[i];
		}, headerTrgEls );
	
		$(headerSrcEls).css('height', 0);
	
		/* Same again with the footer if we have one */
		if ( footer )
		{
			_fnApplyToChildren( zeroOut, footerSrcEls );
	
			_fnApplyToChildren( function(nSizer) {
				footerContent.push( nSizer.innerHTML );
				footerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
			}, footerSrcEls );
	
			_fnApplyToChildren( function(nToSize, i) {
				nToSize.style.width = footerWidths[i];
			}, footerTrgEls );
	
			$(footerSrcEls).height(0);
		}
	
	
		/*
		 * 3. Apply the measurements
		 */
	
		// "Hide" the header and footer that we used for the sizing. We need to keep
		// the content of the cell so that the width applied to the header and body
		// both match, but we want to hide it completely. We want to also fix their
		// width to what they currently are
		_fnApplyToChildren( function(nSizer, i) {
			nSizer.innerHTML = '<div class="dataTables_sizing">'+headerContent[i]+'</div>';
			nSizer.childNodes[0].style.height = "0";
			nSizer.childNodes[0].style.overflow = "hidden";
			nSizer.style.width = headerWidths[i];
		}, headerSrcEls );
	
		if ( footer )
		{
			_fnApplyToChildren( function(nSizer, i) {
				nSizer.innerHTML = '<div class="dataTables_sizing">'+footerContent[i]+'</div>';
				nSizer.childNodes[0].style.height = "0";
				nSizer.childNodes[0].style.overflow = "hidden";
				nSizer.style.width = footerWidths[i];
			}, footerSrcEls );
		}
	
		// Sanity check that the table is of a sensible width. If not then we are going to get
		// misalignment - try to prevent this by not allowing the table to shrink below its min width
		if ( Math.round(table.outerWidth()) < Math.round(sanityWidth) )
		{
			// The min width depends upon if we have a vertical scrollbar visible or not */
			correction = ((divBodyEl.scrollHeight > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")) ?
					sanityWidth+barWidth :
					sanityWidth;
	
			// IE6/7 are a law unto themselves...
			if ( ie67 && (divBodyEl.scrollHeight >
				divBodyEl.offsetHeight || divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( correction-barWidth );
			}
	
			// And give the user a warning that we've stopped the table getting too small
			if ( scrollX === "" || scrollXInner !== "" ) {
				_fnLog( settings, 1, 'Possible column misalignment', 6 );
			}
		}
		else
		{
			correction = '100%';
		}
	
		// Apply to the container elements
		divBodyStyle.width = _fnStringToCss( correction );
		divHeaderStyle.width = _fnStringToCss( correction );
	
		if ( footer ) {
			settings.nScrollFoot.style.width = _fnStringToCss( correction );
		}
	
	
		/*
		 * 4. Clean up
		 */
		if ( ! scrollY ) {
			/* IE7< puts a vertical scrollbar in place (when it shouldn't be) due to subtracting
			 * the scrollbar height from the visible display, rather than adding it on. We need to
			 * set the height in order to sort this. Don't want to do it in any other browsers.
			 */
			if ( ie67 ) {
				divBodyStyle.height = _fnStringToCss( tableEl.offsetHeight+barWidth );
			}
		}
	
		/* Finally set the width's of the header and footer tables */
		var iOuterWidth = table.outerWidth();
		divHeaderTable[0].style.width = _fnStringToCss( iOuterWidth );
		divHeaderInnerStyle.width = _fnStringToCss( iOuterWidth );
	
		// Figure out if there are scrollbar present - if so then we need a the header and footer to
		// provide a bit more space to allow "overflow" scrolling (i.e. past the scrollbar)
		var bScrolling = table.height() > divBodyEl.clientHeight || divBody.css('overflow-y') == "scroll";
		var padding = 'padding' + (browser.bScrollbarLeft ? 'Left' : 'Right' );
		divHeaderInnerStyle[ padding ] = bScrolling ? barWidth+"px" : "0px";
	
		if ( footer ) {
			divFooterTable[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style[padding] = bScrolling ? barWidth+"px" : "0px";
		}
	
		// Correct DOM ordering for colgroup - comes before the thead
		table.children('colgroup').insertBefore( table.children('thead') );
	
		/* Adjust the position of the header in case we loose the y-scrollbar */
		divBody.trigger('scroll');
	
		// If sorting or filtering has occurred, jump the scrolling back to the top
		// only if we aren't holding the position
		if ( (settings.bSorted || settings.bFiltered) && ! settings._drawHold ) {
			divBodyEl.scrollTop = 0;
		}
	}
	
	
	
	/**
	 * Apply a given function to the display child nodes of an element array (typically
	 * TD children of TR rows
	 *  @param {function} fn Method to apply to the objects
	 *  @param array {nodes} an1 List of elements to look through for display children
	 *  @param array {nodes} an2 Another list (identical structure to the first) - optional
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyToChildren( fn, an1, an2 )
	{
		var index=0, i=0, iLen=an1.length;
		var nNode1, nNode2;
	
		while ( i < iLen ) {
			nNode1 = an1[i].firstChild;
			nNode2 = an2 ? an2[i].firstChild : null;
	
			while ( nNode1 ) {
				if ( nNode1.nodeType === 1 ) {
					if ( an2 ) {
						fn( nNode1, nNode2, index );
					}
					else {
						fn( nNode1, index );
					}
	
					index++;
				}
	
				nNode1 = nNode1.nextSibling;
				nNode2 = an2 ? nNode2.nextSibling : null;
			}
	
			i++;
		}
	}
	
	
	
	var __re_html_remove = /<.*?>/g;
	
	
	/**
	 * Calculate the width of columns for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnCalculateColumnWidths ( oSettings )
	{
		var
			table = oSettings.nTable,
			columns = oSettings.aoColumns,
			scroll = oSettings.oScroll,
			scrollY = scroll.sY,
			scrollX = scroll.sX,
			scrollXInner = scroll.sXInner,
			columnCount = columns.length,
			visibleColumns = _fnGetColumns( oSettings, 'bVisible' ),
			headerCells = $('th', oSettings.nTHead),
			tableWidthAttr = table.getAttribute('width'), // from DOM element
			tableContainer = table.parentNode,
			userInputs = false,
			i, column, columnIdx, width, outerWidth,
			browser = oSettings.oBrowser,
			ie67 = browser.bScrollOversize;
	
		var styleWidth = table.style.width;
		if ( styleWidth && styleWidth.indexOf('%') !== -1 ) {
			tableWidthAttr = styleWidth;
		}
	
		/* Convert any user input sizes into pixel sizes */
		for ( i=0 ; i<visibleColumns.length ; i++ ) {
			column = columns[ visibleColumns[i] ];
	
			if ( column.sWidth !== null ) {
				column.sWidth = _fnConvertToWidth( column.sWidthOrig, tableContainer );
	
				userInputs = true;
			}
		}
	
		/* If the number of columns in the DOM equals the number that we have to
		 * process in DataTables, then we can use the offsets that are created by
		 * the web- browser. No custom sizes can be set in order for this to happen,
		 * nor scrolling used
		 */
		if ( ie67 || ! userInputs && ! scrollX && ! scrollY &&
		     columnCount == _fnVisbleColumns( oSettings ) &&
		     columnCount == headerCells.length
		) {
			for ( i=0 ; i<columnCount ; i++ ) {
				var colIdx = _fnVisibleToColumnIndex( oSettings, i );
	
				if ( colIdx !== null ) {
					columns[ colIdx ].sWidth = _fnStringToCss( headerCells.eq(i).width() );
				}
			}
		}
		else
		{
			// Otherwise construct a single row, worst case, table with the widest
			// node in the data, assign any user defined widths, then insert it into
			// the DOM and allow the browser to do all the hard work of calculating
			// table widths
			var tmpTable = $(table).clone() // don't use cloneNode - IE8 will remove events on the main table
				.css( 'visibility', 'hidden' )
				.removeAttr( 'id' );
	
			// Clean up the table body
			tmpTable.find('tbody tr').remove();
			var tr = $('<tr/>').appendTo( tmpTable.find('tbody') );
	
			// Clone the table header and footer - we can't use the header / footer
			// from the cloned table, since if scrolling is active, the table's
			// real header and footer are contained in different table tags
			tmpTable.find('thead, tfoot').remove();
			tmpTable
				.append( $(oSettings.nTHead).clone() )
				.append( $(oSettings.nTFoot).clone() );
	
			// Remove any assigned widths from the footer (from scrolling)
			tmpTable.find('tfoot th, tfoot td').css('width', '');
	
			// Apply custom sizing to the cloned header
			headerCells = _fnGetUniqueThs( oSettings, tmpTable.find('thead')[0] );
	
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				column = columns[ visibleColumns[i] ];
	
				headerCells[i].style.width = column.sWidthOrig !== null && column.sWidthOrig !== '' ?
					_fnStringToCss( column.sWidthOrig ) :
					'';
	
				// For scrollX we need to force the column width otherwise the
				// browser will collapse it. If this width is smaller than the
				// width the column requires, then it will have no effect
				if ( column.sWidthOrig && scrollX ) {
					$( headerCells[i] ).append( $('<div/>').css( {
						width: column.sWidthOrig,
						margin: 0,
						padding: 0,
						border: 0,
						height: 1
					} ) );
				}
			}
	
			// Find the widest cell for each column and put it into the table
			if ( oSettings.aoData.length ) {
				for ( i=0 ; i<visibleColumns.length ; i++ ) {
					columnIdx = visibleColumns[i];
					column = columns[ columnIdx ];
	
					$( _fnGetWidestNode( oSettings, columnIdx ) )
						.clone( false )
						.append( column.sContentPadding )
						.appendTo( tr );
				}
			}
	
			// Tidy the temporary table - remove name attributes so there aren't
			// duplicated in the dom (radio elements for example)
			$('[name]', tmpTable).removeAttr('name');
	
			// Table has been built, attach to the document so we can work with it.
			// A holding element is used, positioned at the top of the container
			// with minimal height, so it has no effect on if the container scrolls
			// or not. Otherwise it might trigger scrolling when it actually isn't
			// needed
			var holder = $('<div/>').css( scrollX || scrollY ?
					{
						position: 'absolute',
						top: 0,
						left: 0,
						height: 1,
						right: 0,
						overflow: 'hidden'
					} :
					{}
				)
				.append( tmpTable )
				.appendTo( tableContainer );
	
			// When scrolling (X or Y) we want to set the width of the table as 
			// appropriate. However, when not scrolling leave the table width as it
			// is. This results in slightly different, but I think correct behaviour
			if ( scrollX && scrollXInner ) {
				tmpTable.width( scrollXInner );
			}
			else if ( scrollX ) {
				tmpTable.css( 'width', 'auto' );
				tmpTable.removeAttr('width');
	
				// If there is no width attribute or style, then allow the table to
				// collapse
				if ( tmpTable.width() < tableContainer.clientWidth && tableWidthAttr ) {
					tmpTable.width( tableContainer.clientWidth );
				}
			}
			else if ( scrollY ) {
				tmpTable.width( tableContainer.clientWidth );
			}
			else if ( tableWidthAttr ) {
				tmpTable.width( tableWidthAttr );
			}
	
			// Get the width of each column in the constructed table - we need to
			// know the inner width (so it can be assigned to the other table's
			// cells) and the outer width so we can calculate the full width of the
			// table. This is safe since DataTables requires a unique cell for each
			// column, but if ever a header can span multiple columns, this will
			// need to be modified.
			var total = 0;
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				var cell = $(headerCells[i]);
				var border = cell.outerWidth() - cell.width();
	
				// Use getBounding... where possible (not IE8-) because it can give
				// sub-pixel accuracy, which we then want to round up!
				var bounding = browser.bBounding ?
					Math.ceil( headerCells[i].getBoundingClientRect().width ) :
					cell.outerWidth();
	
				// Total is tracked to remove any sub-pixel errors as the outerWidth
				// of the table might not equal the total given here (IE!).
				total += bounding;
	
				// Width for each column to use
				columns[ visibleColumns[i] ].sWidth = _fnStringToCss( bounding - border );
			}
	
			table.style.width = _fnStringToCss( total );
	
			// Finished with the table - ditch it
			holder.remove();
		}
	
		// If there is a width attr, we want to attach an event listener which
		// allows the table sizing to automatically adjust when the window is
		// resized. Use the width attr rather than CSS, since we can't know if the
		// CSS is a relative value or absolute - DOM read is always px.
		if ( tableWidthAttr ) {
			table.style.width = _fnStringToCss( tableWidthAttr );
		}
	
		if ( (tableWidthAttr || scrollX) && ! oSettings._reszEvt ) {
			var bindResize = function () {
				$(window).on('resize.DT-'+oSettings.sInstance, _fnThrottle( function () {
					_fnAdjustColumnSizing( oSettings );
				} ) );
			};
	
			// IE6/7 will crash if we bind a resize event handler on page load.
			// To be removed in 1.11 which drops IE6/7 support
			if ( ie67 ) {
				setTimeout( bindResize, 1000 );
			}
			else {
				bindResize();
			}
	
			oSettings._reszEvt = true;
		}
	}
	
	
	/**
	 * Throttle the calls to a function. Arguments and context are maintained for
	 * the throttled function
	 *  @param {function} fn Function to be called
	 *  @param {int} [freq=200] call frequency in mS
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#oApi
	 */
	var _fnThrottle = DataTable.util.throttle;
	
	
	/**
	 * Convert a CSS unit width to pixels (e.g. 2em)
	 *  @param {string} width width to be converted
	 *  @param {node} parent parent to get the with for (required for relative widths) - optional
	 *  @returns {int} width in pixels
	 *  @memberof DataTable#oApi
	 */
	function _fnConvertToWidth ( width, parent )
	{
		if ( ! width ) {
			return 0;
		}
	
		var n = $('<div/>')
			.css( 'width', _fnStringToCss( width ) )
			.appendTo( parent || document.body );
	
		var val = n[0].offsetWidth;
		n.remove();
	
		return val;
	}
	
	
	/**
	 * Get the widest node
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {node} widest table node
	 *  @memberof DataTable#oApi
	 */
	function _fnGetWidestNode( settings, colIdx )
	{
		var idx = _fnGetMaxLenString( settings, colIdx );
		if ( idx < 0 ) {
			return null;
		}
	
		var data = settings.aoData[ idx ];
		return ! data.nTr ? // Might not have been created when deferred rendering
			$('<td/>').html( _fnGetCellData( settings, idx, colIdx, 'display' ) )[0] :
			data.anCells[ colIdx ];
	}
	
	
	/**
	 * Get the maximum strlen for each data column
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {string} max string length for each column
	 *  @memberof DataTable#oApi
	 */
	function _fnGetMaxLenString( settings, colIdx )
	{
		var s, max=-1, maxIdx = -1;
	
		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			s = _fnGetCellData( settings, i, colIdx, 'display' )+'';
			s = s.replace( __re_html_remove, '' );
			s = s.replace( /&nbsp;/g, ' ' );
	
			if ( s.length > max ) {
				max = s.length;
				maxIdx = i;
			}
		}
	
		return maxIdx;
	}
	
	
	/**
	 * Append a CSS unit (only if required) to a string
	 *  @param {string} value to css-ify
	 *  @returns {string} value with css unit
	 *  @memberof DataTable#oApi
	 */
	function _fnStringToCss( s )
	{
		if ( s === null ) {
			return '0px';
		}
	
		if ( typeof s == 'number' ) {
			return s < 0 ?
				'0px' :
				s+'px';
		}
	
		// Check it has a unit character already
		return s.match(/\d$/) ?
			s+'px' :
			s;
	}
	
	
	
	function _fnSortFlatten ( settings )
	{
		var
			i, iLen, k, kLen,
			aSort = [],
			aiOrig = [],
			aoColumns = settings.aoColumns,
			aDataSort, iCol, sType, srcCol,
			fixed = settings.aaSortingFixed,
			fixedObj = $.isPlainObject( fixed ),
			nestedSort = [],
			add = function ( a ) {
				if ( a.length && ! Array.isArray( a[0] ) ) {
					// 1D array
					nestedSort.push( a );
				}
				else {
					// 2D array
					$.merge( nestedSort, a );
				}
			};
	
		// Build the sort array, with pre-fix and post-fix options if they have been
		// specified
		if ( Array.isArray( fixed ) ) {
			add( fixed );
		}
	
		if ( fixedObj && fixed.pre ) {
			add( fixed.pre );
		}
	
		add( settings.aaSorting );
	
		if (fixedObj && fixed.post ) {
			add( fixed.post );
		}
	
		for ( i=0 ; i<nestedSort.length ; i++ )
		{
			srcCol = nestedSort[i][0];
			aDataSort = aoColumns[ srcCol ].aDataSort;
	
			for ( k=0, kLen=aDataSort.length ; k<kLen ; k++ )
			{
				iCol = aDataSort[k];
				sType = aoColumns[ iCol ].sType || 'string';
	
				if ( nestedSort[i]._idx === undefined ) {
					nestedSort[i]._idx = $.inArray( nestedSort[i][1], aoColumns[iCol].asSorting );
				}
	
				aSort.push( {
					src:       srcCol,
					col:       iCol,
					dir:       nestedSort[i][1],
					index:     nestedSort[i]._idx,
					type:      sType,
					formatter: DataTable.ext.type.order[ sType+"-pre" ]
				} );
			}
		}
	
		return aSort;
	}
	
	/**
	 * Change the order of the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 *  @todo This really needs split up!
	 */
	function _fnSort ( oSettings )
	{
		var
			i, ien, iLen, j, jLen, k, kLen,
			sDataType, nTh,
			aiOrig = [],
			oExtSort = DataTable.ext.type.order,
			aoData = oSettings.aoData,
			aoColumns = oSettings.aoColumns,
			aDataSort, data, iCol, sType, oSort,
			formatters = 0,
			sortCol,
			displayMaster = oSettings.aiDisplayMaster,
			aSort;
	
		// Resolve any column types that are unknown due to addition or invalidation
		// @todo Can this be moved into a 'data-ready' handler which is called when
		//   data is going to be used in the table?
		_fnColumnTypes( oSettings );
	
		aSort = _fnSortFlatten( oSettings );
	
		for ( i=0, ien=aSort.length ; i<ien ; i++ ) {
			sortCol = aSort[i];
	
			// Track if we can use the fast sort algorithm
			if ( sortCol.formatter ) {
				formatters++;
			}
	
			// Load the data needed for the sort, for each cell
			_fnSortData( oSettings, sortCol.col );
		}
	
		/* No sorting required if server-side or no sorting array */
		if ( _fnDataSource( oSettings ) != 'ssp' && aSort.length !== 0 )
		{
			// Create a value - key array of the current row positions such that we can use their
			// current position during the sort, if values match, in order to perform stable sorting
			for ( i=0, iLen=displayMaster.length ; i<iLen ; i++ ) {
				aiOrig[ displayMaster[i] ] = i;
			}
	
			/* Do the sort - here we want multi-column sorting based on a given data source (column)
			 * and sorting function (from oSort) in a certain direction. It's reasonably complex to
			 * follow on it's own, but this is what we want (example two column sorting):
			 *  fnLocalSorting = function(a,b){
			 *    var iTest;
			 *    iTest = oSort['string-asc']('data11', 'data12');
			 *      if (iTest !== 0)
			 *        return iTest;
			 *    iTest = oSort['numeric-desc']('data21', 'data22');
			 *    if (iTest !== 0)
			 *      return iTest;
			 *    return oSort['numeric-asc']( aiOrig[a], aiOrig[b] );
			 *  }
			 * Basically we have a test for each sorting column, if the data in that column is equal,
			 * test the next column. If all columns match, then we use a numeric sort on the row
			 * positions in the original data array to provide a stable sort.
			 *
			 * Note - I know it seems excessive to have two sorting methods, but the first is around
			 * 15% faster, so the second is only maintained for backwards compatibility with sorting
			 * methods which do not have a pre-sort formatting function.
			 */
			if ( formatters === aSort.length ) {
				// All sort types have formatting functions
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, test, sort,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;
	
					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];
	
						x = dataA[ sort.col ];
						y = dataB[ sort.col ];
	
						test = x<y ? -1 : x>y ? 1 : 0;
						if ( test !== 0 ) {
							return sort.dir === 'asc' ? test : -test;
						}
					}
	
					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
			else {
				// Depreciated - remove in 1.11 (providing a plug-in option)
				// Not all sort types have formatting methods, so we have to call their sorting
				// methods.
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, l, test, sort, fn,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;
	
					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];
	
						x = dataA[ sort.col ];
						y = dataB[ sort.col ];
	
						fn = oExtSort[ sort.type+"-"+sort.dir ] || oExtSort[ "string-"+sort.dir ];
						test = fn( x, y );
						if ( test !== 0 ) {
							return test;
						}
					}
	
					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
		}
	
		/* Tell the draw function that we have sorted the data */
		oSettings.bSorted = true;
	}
	
	
	function _fnSortAria ( settings )
	{
		var label;
		var nextSort;
		var columns = settings.aoColumns;
		var aSort = _fnSortFlatten( settings );
		var oAria = settings.oLanguage.oAria;
	
		// ARIA attributes - need to loop all columns, to update all (removing old
		// attributes as needed)
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			var col = columns[i];
			var asSorting = col.asSorting;
			var sTitle = col.ariaTitle || col.sTitle.replace( /<.*?>/g, "" );
			var th = col.nTh;
	
			// IE7 is throwing an error when setting these properties with jQuery's
			// attr() and removeAttr() methods...
			th.removeAttribute('aria-sort');
	
			/* In ARIA only the first sorting column can be marked as sorting - no multi-sort option */
			if ( col.bSortable ) {
				if ( aSort.length > 0 && aSort[0].col == i ) {
					th.setAttribute('aria-sort', aSort[0].dir=="asc" ? "ascending" : "descending" );
					nextSort = asSorting[ aSort[0].index+1 ] || asSorting[0];
				}
				else {
					nextSort = asSorting[0];
				}
	
				label = sTitle + ( nextSort === "asc" ?
					oAria.sSortAscending :
					oAria.sSortDescending
				);
			}
			else {
				label = sTitle;
			}
	
			th.setAttribute('aria-label', label);
		}
	}
	
	
	/**
	 * Function to run on user sort request
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {boolean} [append=false] Append the requested sort to the existing
	 *    sort if true (i.e. multi-column sort)
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortListener ( settings, colIdx, append, callback )
	{
		var col = settings.aoColumns[ colIdx ];
		var sorting = settings.aaSorting;
		var asSorting = col.asSorting;
		var nextSortIdx;
		var next = function ( a, overflow ) {
			var idx = a._idx;
			if ( idx === undefined ) {
				idx = $.inArray( a[1], asSorting );
			}
	
			return idx+1 < asSorting.length ?
				idx+1 :
				overflow ?
					null :
					0;
		};
	
		// Convert to 2D array if needed
		if ( typeof sorting[0] === 'number' ) {
			sorting = settings.aaSorting = [ sorting ];
		}
	
		// If appending the sort then we are multi-column sorting
		if ( append && settings.oFeatures.bSortMulti ) {
			// Are we already doing some kind of sort on this column?
			var sortIdx = $.inArray( colIdx, _pluck(sorting, '0') );
	
			if ( sortIdx !== -1 ) {
				// Yes, modify the sort
				nextSortIdx = next( sorting[sortIdx], true );
	
				if ( nextSortIdx === null && sorting.length === 1 ) {
					nextSortIdx = 0; // can't remove sorting completely
				}
	
				if ( nextSortIdx === null ) {
					sorting.splice( sortIdx, 1 );
				}
				else {
					sorting[sortIdx][1] = asSorting[ nextSortIdx ];
					sorting[sortIdx]._idx = nextSortIdx;
				}
			}
			else {
				// No sort on this column yet
				sorting.push( [ colIdx, asSorting[0], 0 ] );
				sorting[sorting.length-1]._idx = 0;
			}
		}
		else if ( sorting.length && sorting[0][0] == colIdx ) {
			// Single column - already sorting on this column, modify the sort
			nextSortIdx = next( sorting[0] );
	
			sorting.length = 1;
			sorting[0][1] = asSorting[ nextSortIdx ];
			sorting[0]._idx = nextSortIdx;
		}
		else {
			// Single column - sort only on this column
			sorting.length = 0;
			sorting.push( [ colIdx, asSorting[0] ] );
			sorting[0]._idx = 0;
		}
	
		// Run the sort by calling a full redraw
		_fnReDraw( settings );
	
		// callback used for async user interaction
		if ( typeof callback == 'function' ) {
			callback( settings );
		}
	}
	
	
	/**
	 * Attach a sort handler (click) to a node
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortAttachListener ( settings, attachTo, colIdx, callback )
	{
		var col = settings.aoColumns[ colIdx ];
	
		_fnBindAction( attachTo, {}, function (e) {
			/* If the column is not sortable - don't to anything */
			if ( col.bSortable === false ) {
				return;
			}
	
			// If processing is enabled use a timeout to allow the processing
			// display to be shown - otherwise to it synchronously
			if ( settings.oFeatures.bProcessing ) {
				_fnProcessingDisplay( settings, true );
	
				setTimeout( function() {
					_fnSortListener( settings, colIdx, e.shiftKey, callback );
	
					// In server-side processing, the draw callback will remove the
					// processing display
					if ( _fnDataSource( settings ) !== 'ssp' ) {
						_fnProcessingDisplay( settings, false );
					}
				}, 0 );
			}
			else {
				_fnSortListener( settings, colIdx, e.shiftKey, callback );
			}
		} );
	}
	
	
	/**
	 * Set the sorting classes on table's body, Note: it is safe to call this function
	 * when bSort and bSortClasses are false
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSortingClasses( settings )
	{
		var oldSort = settings.aLastSort;
		var sortClass = settings.oClasses.sSortColumn;
		var sort = _fnSortFlatten( settings );
		var features = settings.oFeatures;
		var i, ien, colIdx;
	
		if ( features.bSort && features.bSortClasses ) {
			// Remove old sorting classes
			for ( i=0, ien=oldSort.length ; i<ien ; i++ ) {
				colIdx = oldSort[i].src;
	
				// Remove column sorting
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.removeClass( sortClass + (i<2 ? i+1 : 3) );
			}
	
			// Add new column sorting
			for ( i=0, ien=sort.length ; i<ien ; i++ ) {
				colIdx = sort[i].src;
	
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.addClass( sortClass + (i<2 ? i+1 : 3) );
			}
		}
	
		settings.aLastSort = sort;
	}
	
	
	// Get the data to sort a column, be it from cache, fresh (populating the
	// cache), or from a sort formatter
	function _fnSortData( settings, idx )
	{
		// Custom sorting function - provided by the sort data type
		var column = settings.aoColumns[ idx ];
		var customSort = DataTable.ext.order[ column.sSortDataType ];
		var customData;
	
		if ( customSort ) {
			customData = customSort.call( settings.oInstance, settings, idx,
				_fnColumnIndexToVisible( settings, idx )
			);
		}
	
		// Use / populate cache
		var row, cellData;
		var formatter = DataTable.ext.type.order[ column.sType+"-pre" ];
	
		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];
	
			if ( ! row._aSortData ) {
				row._aSortData = [];
			}
	
			if ( ! row._aSortData[idx] || customSort ) {
				cellData = customSort ?
					customData[i] : // If there was a custom sort function, use data from there
					_fnGetCellData( settings, i, idx, 'sort' );
	
				row._aSortData[ idx ] = formatter ?
					formatter( cellData ) :
					cellData;
			}
		}
	}
	
	
	
	/**
	 * Save the state of a table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSaveState ( settings )
	{
		if (settings._bLoadingState) {
			return;
		}
	
		/* Store the interesting variables */
		var state = {
			time:    +new Date(),
			start:   settings._iDisplayStart,
			length:  settings._iDisplayLength,
			order:   $.extend( true, [], settings.aaSorting ),
			search:  _fnSearchToCamel( settings.oPreviousSearch ),
			columns: $.map( settings.aoColumns, function ( col, i ) {
				return {
					visible: col.bVisible,
					search: _fnSearchToCamel( settings.aoPreSearchCols[i] )
				};
			} )
		};
	
		settings.oSavedState = state;
		_fnCallbackFire( settings, "aoStateSaveParams", 'stateSaveParams', [settings, state] );
		
		if ( settings.oFeatures.bStateSave && !settings.bDestroying )
		{
			settings.fnStateSaveCallback.call( settings.oInstance, settings, state );
		}	
	}
	
	
	/**
	 * Attempt to load a saved table state
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oInit DataTables init object so we can override settings
	 *  @param {function} callback Callback to execute when the state has been loaded
	 *  @memberof DataTable#oApi
	 */
	function _fnLoadState ( settings, oInit, callback )
	{
		if ( ! settings.oFeatures.bStateSave ) {
			callback();
			return;
		}
	
		var loaded = function(state) {
			_fnImplementState(settings, state, callback);
		}
	
		var state = settings.fnStateLoadCallback.call( settings.oInstance, settings, loaded );
	
		if ( state !== undefined ) {
			_fnImplementState( settings, state, callback );
		}
		// otherwise, wait for the loaded callback to be executed
	
		return true;
	}
	
	function _fnImplementState ( settings, s, callback) {
		var i, ien;
		var columns = settings.aoColumns;
		settings._bLoadingState = true;
	
		// When StateRestore was introduced the state could now be implemented at any time
		// Not just initialisation. To do this an api instance is required in some places
		var api = settings._bInitComplete ? new DataTable.Api(settings) : null;
	
		if ( ! s || ! s.time ) {
			settings._bLoadingState = false;
			callback();
			return;
		}
	
		// Allow custom and plug-in manipulation functions to alter the saved data set and
		// cancelling of loading by returning false
		var abStateLoad = _fnCallbackFire( settings, 'aoStateLoadParams', 'stateLoadParams', [settings, s] );
		if ( $.inArray( false, abStateLoad ) !== -1 ) {
			settings._bLoadingState = false;
			callback();
			return;
		}
	
		// Reject old data
		var duration = settings.iStateDuration;
		if ( duration > 0 && s.time < +new Date() - (duration*1000) ) {
			settings._bLoadingState = false;
			callback();
			return;
		}
	
		// Number of columns have changed - all bets are off, no restore of settings
		if ( s.columns && columns.length !== s.columns.length ) {
			settings._bLoadingState = false;
			callback();
			return;
		}
	
		// Store the saved state so it might be accessed at any time
		settings.oLoadedState = $.extend( true, {}, s );
	
		// Page Length
		if ( s.length !== undefined ) {
			// If already initialised just set the value directly so that the select element is also updated
			if (api) {
				api.page.len(s.length)
			}
			else {
				settings._iDisplayLength   = s.length;
			}
		}
	
		// Restore key features - todo - for 1.11 this needs to be done by
		// subscribed events
		if ( s.start !== undefined ) {
			if(api === null) {
				settings._iDisplayStart    = s.start;
				settings.iInitDisplayStart = s.start;
			}
			else {
				_fnPageChange(settings, s.start/settings._iDisplayLength);
			}
		}
	
		// Order
		if ( s.order !== undefined ) {
			settings.aaSorting = [];
			$.each( s.order, function ( i, col ) {
				settings.aaSorting.push( col[0] >= columns.length ?
					[ 0, col[1] ] :
					col
				);
			} );
		}
	
		// Search
		if ( s.search !== undefined ) {
			$.extend( settings.oPreviousSearch, _fnSearchToHung( s.search ) );
		}
	
		// Columns
		if ( s.columns ) {
			for ( i=0, ien=s.columns.length ; i<ien ; i++ ) {
				var col = s.columns[i];
	
				// Visibility
				if ( col.visible !== undefined ) {
					// If the api is defined, the table has been initialised so we need to use it rather than internal settings
					if (api) {
						// Don't redraw the columns on every iteration of this loop, we will do this at the end instead
						api.column(i).visible(col.visible, false);
					}
					else {
						columns[i].bVisible = col.visible;
					}
				}
	
				// Search
				if ( col.search !== undefined ) {
					$.extend( settings.aoPreSearchCols[i], _fnSearchToHung( col.search ) );
				}
			}
			
			// If the api is defined then we need to adjust the columns once the visibility has been changed
			if (api) {
				api.columns.adjust();
			}
		}
	
		settings._bLoadingState = false;
		_fnCallbackFire( settings, 'aoStateLoaded', 'stateLoaded', [settings, s] );
		callback();
	};
	
	
	/**
	 * Return the settings object for a particular table
	 *  @param {node} table table we are using as a dataTable
	 *  @returns {object} Settings object - or null if not found
	 *  @memberof DataTable#oApi
	 */
	function _fnSettingsFromNode ( table )
	{
		var settings = DataTable.settings;
		var idx = $.inArray( table, _pluck( settings, 'nTable' ) );
	
		return idx !== -1 ?
			settings[ idx ] :
			null;
	}
	
	
	/**
	 * Log an error message
	 *  @param {object} settings dataTables settings object
	 *  @param {int} level log error messages, or display them to the user
	 *  @param {string} msg error message
	 *  @param {int} tn Technical note id to get more information about the error.
	 *  @memberof DataTable#oApi
	 */
	function _fnLog( settings, level, msg, tn )
	{
		msg = 'DataTables warning: '+
			(settings ? 'table id='+settings.sTableId+' - ' : '')+msg;
	
		if ( tn ) {
			msg += '. For more information about this error, please see '+
			'http://datatables.net/tn/'+tn;
		}
	
		if ( ! level  ) {
			// Backwards compatibility pre 1.10
			var ext = DataTable.ext;
			var type = ext.sErrMode || ext.errMode;
	
			if ( settings ) {
				_fnCallbackFire( settings, null, 'error', [ settings, tn, msg ] );
			}
	
			if ( type == 'alert' ) {
				alert( msg );
			}
			else if ( type == 'throw' ) {
				throw new Error(msg);
			}
			else if ( typeof type == 'function' ) {
				type( settings, tn, msg );
			}
		}
		else if ( window.console && console.log ) {
			console.log( msg );
		}
	}
	
	
	/**
	 * See if a property is defined on one object, if so assign it to the other object
	 *  @param {object} ret target object
	 *  @param {object} src source object
	 *  @param {string} name property
	 *  @param {string} [mappedName] name to map too - optional, name used if not given
	 *  @memberof DataTable#oApi
	 */
	function _fnMap( ret, src, name, mappedName )
	{
		if ( Array.isArray( name ) ) {
			$.each( name, function (i, val) {
				if ( Array.isArray( val ) ) {
					_fnMap( ret, src, val[0], val[1] );
				}
				else {
					_fnMap( ret, src, val );
				}
			} );
	
			return;
		}
	
		if ( mappedName === undefined ) {
			mappedName = name;
		}
	
		if ( src[name] !== undefined ) {
			ret[mappedName] = src[name];
		}
	}
	
	
	/**
	 * Extend objects - very similar to jQuery.extend, but deep copy objects, and
	 * shallow copy arrays. The reason we need to do this, is that we don't want to
	 * deep copy array init values (such as aaSorting) since the dev wouldn't be
	 * able to override them, but we do want to deep copy arrays.
	 *  @param {object} out Object to extend
	 *  @param {object} extender Object from which the properties will be applied to
	 *      out
	 *  @param {boolean} breakRefs If true, then arrays will be sliced to take an
	 *      independent copy with the exception of the `data` or `aaData` parameters
	 *      if they are present. This is so you can pass in a collection to
	 *      DataTables and have that used as your data source without breaking the
	 *      references
	 *  @returns {object} out Reference, just for convenience - out === the return.
	 *  @memberof DataTable#oApi
	 *  @todo This doesn't take account of arrays inside the deep copied objects.
	 */
	function _fnExtend( out, extender, breakRefs )
	{
		var val;
	
		for ( var prop in extender ) {
			if ( extender.hasOwnProperty(prop) ) {
				val = extender[prop];
	
				if ( $.isPlainObject( val ) ) {
					if ( ! $.isPlainObject( out[prop] ) ) {
						out[prop] = {};
					}
					$.extend( true, out[prop], val );
				}
				else if ( breakRefs && prop !== 'data' && prop !== 'aaData' && Array.isArray(val) ) {
					out[prop] = val.slice();
				}
				else {
					out[prop] = val;
				}
			}
		}
	
		return out;
	}
	
	
	/**
	 * Bind an event handers to allow a click or return key to activate the callback.
	 * This is good for accessibility since a return on the keyboard will have the
	 * same effect as a click, if the element has focus.
	 *  @param {element} n Element to bind the action to
	 *  @param {object} oData Data object to pass to the triggered function
	 *  @param {function} fn Callback function for when the event is triggered
	 *  @memberof DataTable#oApi
	 */
	function _fnBindAction( n, oData, fn )
	{
		$(n)
			.on( 'click.DT', oData, function (e) {
					$(n).trigger('blur'); // Remove focus outline for mouse users
					fn(e);
				} )
			.on( 'keypress.DT', oData, function (e){
					if ( e.which === 13 ) {
						e.preventDefault();
						fn(e);
					}
				} )
			.on( 'selectstart.DT', function () {
					/* Take the brutal approach to cancelling text selection */
					return false;
				} );
	}
	
	
	/**
	 * Register a callback function. Easily allows a callback function to be added to
	 * an array store of callback functions that can then all be called together.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sStore Name of the array storage for the callbacks in oSettings
	 *  @param {function} fn Function to be called back
	 *  @param {string} sName Identifying name for the callback (i.e. a label)
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackReg( oSettings, sStore, fn, sName )
	{
		if ( fn )
		{
			oSettings[sStore].push( {
				"fn": fn,
				"sName": sName
			} );
		}
	}
	
	
	/**
	 * Fire callback functions and trigger events. Note that the loop over the
	 * callback array store is done backwards! Further note that you do not want to
	 * fire off triggers in time sensitive applications (for example cell creation)
	 * as its slow.
	 *  @param {object} settings dataTables settings object
	 *  @param {string} callbackArr Name of the array storage for the callbacks in
	 *      oSettings
	 *  @param {string} eventName Name of the jQuery custom event to trigger. If
	 *      null no trigger is fired
	 *  @param {array} args Array of arguments to pass to the callback function /
	 *      trigger
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackFire( settings, callbackArr, eventName, args )
	{
		var ret = [];
	
		if ( callbackArr ) {
			ret = $.map( settings[callbackArr].slice().reverse(), function (val, i) {
				return val.fn.apply( settings.oInstance, args );
			} );
		}
	
		if ( eventName !== null ) {
			var e = $.Event( eventName+'.dt' );
	
			$(settings.nTable).trigger( e, args );
	
			ret.push( e.result );
		}
	
		return ret;
	}
	
	
	function _fnLengthOverflow ( settings )
	{
		var
			start = settings._iDisplayStart,
			end = settings.fnDisplayEnd(),
			len = settings._iDisplayLength;
	
		/* If we have space to show extra rows (backing up from the end point - then do so */
		if ( start >= end )
		{
			start = end - len;
		}
	
		// Keep the start record on the current page
		start -= (start % len);
	
		if ( len === -1 || start < 0 )
		{
			start = 0;
		}
	
		settings._iDisplayStart = start;
	}
	
	
	function _fnRenderer( settings, type )
	{
		var renderer = settings.renderer;
		var host = DataTable.ext.renderer[type];
	
		if ( $.isPlainObject( renderer ) && renderer[type] ) {
			// Specific renderer for this type. If available use it, otherwise use
			// the default.
			return host[renderer[type]] || host._;
		}
		else if ( typeof renderer === 'string' ) {
			// Common renderer - if there is one available for this type use it,
			// otherwise use the default
			return host[renderer] || host._;
		}
	
		// Use the default
		return host._;
	}
	
	
	/**
	 * Detect the data source being used for the table. Used to simplify the code
	 * a little (ajax) and to make it compress a little smaller.
	 *
	 *  @param {object} settings dataTables settings object
	 *  @returns {string} Data source
	 *  @memberof DataTable#oApi
	 */
	function _fnDataSource ( settings )
	{
		if ( settings.oFeatures.bServerSide ) {
			return 'ssp';
		}
		else if ( settings.ajax || settings.sAjaxSource ) {
			return 'ajax';
		}
		return 'dom';
	}
	
	
	
	
	/**
	 * Computed structure of the DataTables API, defined by the options passed to
	 * `DataTable.Api.register()` when building the API.
	 *
	 * The structure is built in order to speed creation and extension of the Api
	 * objects since the extensions are effectively pre-parsed.
	 *
	 * The array is an array of objects with the following structure, where this
	 * base array represents the Api prototype base:
	 *
	 *     [
	 *       {
	 *         name:      'data'                -- string   - Property name
	 *         val:       function () {},       -- function - Api method (or undefined if just an object
	 *         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	 *         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	 *       },
	 *       {
	 *         name:     'row'
	 *         val:       {},
	 *         methodExt: [ ... ],
	 *         propExt:   [
	 *           {
	 *             name:      'data'
	 *             val:       function () {},
	 *             methodExt: [ ... ],
	 *             propExt:   [ ... ]
	 *           },
	 *           ...
	 *         ]
	 *       }
	 *     ]
	 *
	 * @type {Array}
	 * @ignore
	 */
	var __apiStruct = [];
	
	
	/**
	 * `Array.prototype` reference.
	 *
	 * @type object
	 * @ignore
	 */
	var __arrayProto = Array.prototype;
	
	
	/**
	 * Abstraction for `context` parameter of the `Api` constructor to allow it to
	 * take several different forms for ease of use.
	 *
	 * Each of the input parameter types will be converted to a DataTables settings
	 * object where possible.
	 *
	 * @param  {string|node|jQuery|object} mixed DataTable identifier. Can be one
	 *   of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 *   * `DataTables.Api` - API instance
	 * @return {array|null} Matching DataTables settings objects. `null` or
	 *   `undefined` is returned if no matching DataTable is found.
	 * @ignore
	 */
	var _toSettings = function ( mixed )
	{
		var idx, jq;
		var settings = DataTable.settings;
		var tables = $.map( settings, function (el, i) {
			return el.nTable;
		} );
	
		if ( ! mixed ) {
			return [];
		}
		else if ( mixed.nTable && mixed.oApi ) {
			// DataTables settings object
			return [ mixed ];
		}
		else if ( mixed.nodeName && mixed.nodeName.toLowerCase() === 'table' ) {
			// Table node
			idx = $.inArray( mixed, tables );
			return idx !== -1 ? [ settings[idx] ] : null;
		}
		else if ( mixed && typeof mixed.settings === 'function' ) {
			return mixed.settings().toArray();
		}
		else if ( typeof mixed === 'string' ) {
			// jQuery selector
			jq = $(mixed);
		}
		else if ( mixed instanceof $ ) {
			// jQuery object (also DataTables instance)
			jq = mixed;
		}
	
		if ( jq ) {
			return jq.map( function(i) {
				idx = $.inArray( this, tables );
				return idx !== -1 ? settings[idx] : null;
			} ).toArray();
		}
	};
	
	
	/**
	 * DataTables API class - used to control and interface with  one or more
	 * DataTables enhanced tables.
	 *
	 * The API class is heavily based on jQuery, presenting a chainable interface
	 * that you can use to interact with tables. Each instance of the API class has
	 * a "context" - i.e. the tables that it will operate on. This could be a single
	 * table, all tables on a page or a sub-set thereof.
	 *
	 * Additionally the API is designed to allow you to easily work with the data in
	 * the tables, retrieving and manipulating it as required. This is done by
	 * presenting the API class as an array like interface. The contents of the
	 * array depend upon the actions requested by each method (for example
	 * `rows().nodes()` will return an array of nodes, while `rows().data()` will
	 * return an array of objects or arrays depending upon your table's
	 * configuration). The API object has a number of array like methods (`push`,
	 * `pop`, `reverse` etc) as well as additional helper methods (`each`, `pluck`,
	 * `unique` etc) to assist your working with the data held in a table.
	 *
	 * Most methods (those which return an Api instance) are chainable, which means
	 * the return from a method call also has all of the methods available that the
	 * top level object had. For example, these two calls are equivalent:
	 *
	 *     // Not chained
	 *     api.row.add( {...} );
	 *     api.draw();
	 *
	 *     // Chained
	 *     api.row.add( {...} ).draw();
	 *
	 * @class DataTable.Api
	 * @param {array|object|string|jQuery} context DataTable identifier. This is
	 *   used to define which DataTables enhanced tables this API will operate on.
	 *   Can be one of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 * @param {array} [data] Data to initialise the Api instance with.
	 *
	 * @example
	 *   // Direct initialisation during DataTables construction
	 *   var api = $('#example').DataTable();
	 *
	 * @example
	 *   // Initialisation using a DataTables jQuery object
	 *   var api = $('#example').dataTable().api();
	 *
	 * @example
	 *   // Initialisation as a constructor
	 *   var api = new $.fn.DataTable.Api( 'table.dataTable' );
	 */
	_Api = function ( context, data )
	{
		if ( ! (this instanceof _Api) ) {
			return new _Api( context, data );
		}
	
		var settings = [];
		var ctxSettings = function ( o ) {
			var a = _toSettings( o );
			if ( a ) {
				settings.push.apply( settings, a );
			}
		};
	
		if ( Array.isArray( context ) ) {
			for ( var i=0, ien=context.length ; i<ien ; i++ ) {
				ctxSettings( context[i] );
			}
		}
		else {
			ctxSettings( context );
		}
	
		// Remove duplicates
		this.context = _unique( settings );
	
		// Initial data
		if ( data ) {
			$.merge( this, data );
		}
	
		// selector
		this.selector = {
			rows: null,
			cols: null,
			opts: null
		};
	
		_Api.extend( this, this, __apiStruct );
	};
	
	DataTable.Api = _Api;
	
	// Don't destroy the existing prototype, just extend it. Required for jQuery 2's
	// isPlainObject.
	$.extend( _Api.prototype, {
		any: function ()
		{
			return this.count() !== 0;
		},
	
	
		concat:  __arrayProto.concat,
	
	
		context: [], // array of table settings objects
	
	
		count: function ()
		{
			return this.flatten().length;
		},
	
	
		each: function ( fn )
		{
			for ( var i=0, ien=this.length ; i<ien; i++ ) {
				fn.call( this, this[i], i, this );
			}
	
			return this;
		},
	
	
		eq: function ( idx )
		{
			var ctx = this.context;
	
			return ctx.length > idx ?
				new _Api( ctx[idx], this[idx] ) :
				null;
		},
	
	
		filter: function ( fn )
		{
			var a = [];
	
			if ( __arrayProto.filter ) {
				a = __arrayProto.filter.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					if ( fn.call( this, this[i], i, this ) ) {
						a.push( this[i] );
					}
				}
			}
	
			return new _Api( this.context, a );
		},
	
	
		flatten: function ()
		{
			var a = [];
			return new _Api( this.context, a.concat.apply( a, this.toArray() ) );
		},
	
	
		join:    __arrayProto.join,
	
	
		indexOf: __arrayProto.indexOf || function (obj, start)
		{
			for ( var i=(start || 0), ien=this.length ; i<ien ; i++ ) {
				if ( this[i] === obj ) {
					return i;
				}
			}
			return -1;
		},
	
		iterator: function ( flatten, type, fn, alwaysNew ) {
			var
				a = [], ret,
				i, ien, j, jen,
				context = this.context,
				rows, items, item,
				selector = this.selector;
	
			// Argument shifting
			if ( typeof flatten === 'string' ) {
				alwaysNew = fn;
				fn = type;
				type = flatten;
				flatten = false;
			}
	
			for ( i=0, ien=context.length ; i<ien ; i++ ) {
				var apiInst = new _Api( context[i] );
	
				if ( type === 'table' ) {
					ret = fn.call( apiInst, context[i], i );
	
					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'columns' || type === 'rows' ) {
					// this has same length as context - one entry for each table
					ret = fn.call( apiInst, context[i], this[i], i );
	
					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'column' || type === 'column-rows' || type === 'row' || type === 'cell' ) {
					// columns and rows share the same structure.
					// 'this' is an array of column indexes for each context
					items = this[i];
	
					if ( type === 'column-rows' ) {
						rows = _selector_row_indexes( context[i], selector.opts );
					}
	
					for ( j=0, jen=items.length ; j<jen ; j++ ) {
						item = items[j];
	
						if ( type === 'cell' ) {
							ret = fn.call( apiInst, context[i], item.row, item.column, i, j );
						}
						else {
							ret = fn.call( apiInst, context[i], item, i, j, rows );
						}
	
						if ( ret !== undefined ) {
							a.push( ret );
						}
					}
				}
			}
	
			if ( a.length || alwaysNew ) {
				var api = new _Api( context, flatten ? a.concat.apply( [], a ) : a );
				var apiSelector = api.selector;
				apiSelector.rows = selector.rows;
				apiSelector.cols = selector.cols;
				apiSelector.opts = selector.opts;
				return api;
			}
			return this;
		},
	
	
		lastIndexOf: __arrayProto.lastIndexOf || function (obj, start)
		{
			// Bit cheeky...
			return this.indexOf.apply( this.toArray.reverse(), arguments );
		},
	
	
		length:  0,
	
	
		map: function ( fn )
		{
			var a = [];
	
			if ( __arrayProto.map ) {
				a = __arrayProto.map.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					a.push( fn.call( this, this[i], i ) );
				}
			}
	
			return new _Api( this.context, a );
		},
	
	
		pluck: function ( prop )
		{
			let fn = DataTable.util.get(prop);
	
			return this.map( function ( el ) {
				return fn(el);
			} );
		},
	
		pop:     __arrayProto.pop,
	
	
		push:    __arrayProto.push,
	
	
		// Does not return an API instance
		reduce: __arrayProto.reduce || function ( fn, init )
		{
			return _fnReduce( this, fn, init, 0, this.length, 1 );
		},
	
	
		reduceRight: __arrayProto.reduceRight || function ( fn, init )
		{
			return _fnReduce( this, fn, init, this.length-1, -1, -1 );
		},
	
	
		reverse: __arrayProto.reverse,
	
	
		// Object with rows, columns and opts
		selector: null,
	
	
		shift:   __arrayProto.shift,
	
	
		slice: function () {
			return new _Api( this.context, this );
		},
	
	
		sort:    __arrayProto.sort, // ? name - order?
	
	
		splice:  __arrayProto.splice,
	
	
		toArray: function ()
		{
			return __arrayProto.slice.call( this );
		},
	
	
		to$: function ()
		{
			return $( this );
		},
	
	
		toJQuery: function ()
		{
			return $( this );
		},
	
	
		unique: function ()
		{
			return new _Api( this.context, _unique(this) );
		},
	
	
		unshift: __arrayProto.unshift
	} );
	
	
	_Api.extend = function ( scope, obj, ext )
	{
		// Only extend API instances and static properties of the API
		if ( ! ext.length || ! obj || ( ! (obj instanceof _Api) && ! obj.__dt_wrapper ) ) {
			return;
		}
	
		var
			i, ien,
			struct,
			methodScoping = function ( scope, fn, struc ) {
				return function () {
					var ret = fn.apply( scope, arguments );
	
					// Method extension
					_Api.extend( ret, ret, struc.methodExt );
					return ret;
				};
			};
	
		for ( i=0, ien=ext.length ; i<ien ; i++ ) {
			struct = ext[i];
	
			// Value
			obj[ struct.name ] = struct.type === 'function' ?
				methodScoping( scope, struct.val, struct ) :
				struct.type === 'object' ?
					{} :
					struct.val;
	
			obj[ struct.name ].__dt_wrapper = true;
	
			// Property extension
			_Api.extend( scope, obj[ struct.name ], struct.propExt );
		}
	};
	
	
	// @todo - Is there need for an augment function?
	// _Api.augment = function ( inst, name )
	// {
	// 	// Find src object in the structure from the name
	// 	var parts = name.split('.');
	
	// 	_Api.extend( inst, obj );
	// };
	
	
	//     [
	//       {
	//         name:      'data'                -- string   - Property name
	//         val:       function () {},       -- function - Api method (or undefined if just an object
	//         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	//         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	//       },
	//       {
	//         name:     'row'
	//         val:       {},
	//         methodExt: [ ... ],
	//         propExt:   [
	//           {
	//             name:      'data'
	//             val:       function () {},
	//             methodExt: [ ... ],
	//             propExt:   [ ... ]
	//           },
	//           ...
	//         ]
	//       }
	//     ]
	
	_Api.register = _api_register = function ( name, val )
	{
		if ( Array.isArray( name ) ) {
			for ( var j=0, jen=name.length ; j<jen ; j++ ) {
				_Api.register( name[j], val );
			}
			return;
		}
	
		var
			i, ien,
			heir = name.split('.'),
			struct = __apiStruct,
			key, method;
	
		var find = function ( src, name ) {
			for ( var i=0, ien=src.length ; i<ien ; i++ ) {
				if ( src[i].name === name ) {
					return src[i];
				}
			}
			return null;
		};
	
		for ( i=0, ien=heir.length ; i<ien ; i++ ) {
			method = heir[i].indexOf('()') !== -1;
			key = method ?
				heir[i].replace('()', '') :
				heir[i];
	
			var src = find( struct, key );
			if ( ! src ) {
				src = {
					name:      key,
					val:       {},
					methodExt: [],
					propExt:   [],
					type:      'object'
				};
				struct.push( src );
			}
	
			if ( i === ien-1 ) {
				src.val = val;
				src.type = typeof val === 'function' ?
					'function' :
					$.isPlainObject( val ) ?
						'object' :
						'other';
			}
			else {
				struct = method ?
					src.methodExt :
					src.propExt;
			}
		}
	};
	
	_Api.registerPlural = _api_registerPlural = function ( pluralName, singularName, val ) {
		_Api.register( pluralName, val );
	
		_Api.register( singularName, function () {
			var ret = val.apply( this, arguments );
	
			if ( ret === this ) {
				// Returned item is the API instance that was passed in, return it
				return this;
			}
			else if ( ret instanceof _Api ) {
				// New API instance returned, want the value from the first item
				// in the returned array for the singular result.
				return ret.length ?
					Array.isArray( ret[0] ) ?
						new _Api( ret.context, ret[0] ) : // Array results are 'enhanced'
						ret[0] :
					undefined;
			}
	
			// Non-API return - just fire it back
			return ret;
		} );
	};
	
	
	/**
	 * Selector for HTML tables. Apply the given selector to the give array of
	 * DataTables settings objects.
	 *
	 * @param {string|integer} [selector] jQuery selector string or integer
	 * @param  {array} Array of DataTables settings objects to be filtered
	 * @return {array}
	 * @ignore
	 */
	var __table_selector = function ( selector, a )
	{
		if ( Array.isArray(selector) ) {
			return $.map( selector, function (item) {
				return __table_selector(item, a);
			} );
		}
	
		// Integer is used to pick out a table by index
		if ( typeof selector === 'number' ) {
			return [ a[ selector ] ];
		}
	
		// Perform a jQuery selector on the table nodes
		var nodes = $.map( a, function (el, i) {
			return el.nTable;
		} );
	
		return $(nodes)
			.filter( selector )
			.map( function (i) {
				// Need to translate back from the table node to the settings
				var idx = $.inArray( this, nodes );
				return a[ idx ];
			} )
			.toArray();
	};
	
	
	
	/**
	 * Context selector for the API's context (i.e. the tables the API instance
	 * refers to.
	 *
	 * @name    DataTable.Api#tables
	 * @param {string|integer} [selector] Selector to pick which tables the iterator
	 *   should operate on. If not given, all tables in the current context are
	 *   used. This can be given as a jQuery selector (for example `':gt(0)'`) to
	 *   select multiple tables or as an integer to select a single table.
	 * @returns {DataTable.Api} Returns a new API instance if a selector is given.
	 */
	_api_register( 'tables()', function ( selector ) {
		// A new instance is created if there was a selector specified
		return selector !== undefined && selector !== null ?
			new _Api( __table_selector( selector, this.context ) ) :
			this;
	} );
	
	
	_api_register( 'table()', function ( selector ) {
		var tables = this.tables( selector );
		var ctx = tables.context;
	
		// Truncate to the first matched table
		return ctx.length ?
			new _Api( ctx[0] ) :
			tables;
	} );
	
	
	_api_registerPlural( 'tables().nodes()', 'table().node()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTable;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().body()', 'table().body()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTBody;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().header()', 'table().header()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTHead;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().footer()', 'table().footer()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTFoot;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().containers()', 'table().container()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTableWrapper;
		}, 1 );
	} );
	
	
	
	/**
	 * Redraw the tables in the current context.
	 */
	_api_register( 'draw()', function ( paging ) {
		return this.iterator( 'table', function ( settings ) {
			if ( paging === 'page' ) {
				_fnDraw( settings );
			}
			else {
				if ( typeof paging === 'string' ) {
					paging = paging === 'full-hold' ?
						false :
						true;
				}
	
				_fnReDraw( settings, paging===false );
			}
		} );
	} );
	
	
	
	/**
	 * Get the current page index.
	 *
	 * @return {integer} Current page index (zero based)
	 *//**
	 * Set the current page.
	 *
	 * Note that if you attempt to show a page which does not exist, DataTables will
	 * not throw an error, but rather reset the paging.
	 *
	 * @param {integer|string} action The paging action to take. This can be one of:
	 *  * `integer` - The page index to jump to
	 *  * `string` - An action to take:
	 *    * `first` - Jump to first page.
	 *    * `next` - Jump to the next page
	 *    * `previous` - Jump to previous page
	 *    * `last` - Jump to the last page.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page()', function ( action ) {
		if ( action === undefined ) {
			return this.page.info().page; // not an expensive call
		}
	
		// else, have an action to take on all tables
		return this.iterator( 'table', function ( settings ) {
			_fnPageChange( settings, action );
		} );
	} );
	
	
	/**
	 * Paging information for the first table in the current context.
	 *
	 * If you require paging information for another table, use the `table()` method
	 * with a suitable selector.
	 *
	 * @return {object} Object with the following properties set:
	 *  * `page` - Current page index (zero based - i.e. the first page is `0`)
	 *  * `pages` - Total number of pages
	 *  * `start` - Display index for the first record shown on the current page
	 *  * `end` - Display index for the last record shown on the current page
	 *  * `length` - Display length (number of records). Note that generally `start
	 *    + length = end`, but this is not always true, for example if there are
	 *    only 2 records to show on the final page, with a length of 10.
	 *  * `recordsTotal` - Full data set length
	 *  * `recordsDisplay` - Data set length once the current filtering criterion
	 *    are applied.
	 */
	_api_register( 'page.info()', function ( action ) {
		if ( this.context.length === 0 ) {
			return undefined;
		}
	
		var
			settings   = this.context[0],
			start      = settings._iDisplayStart,
			len        = settings.oFeatures.bPaginate ? settings._iDisplayLength : -1,
			visRecords = settings.fnRecordsDisplay(),
			all        = len === -1;
	
		return {
			"page":           all ? 0 : Math.floor( start / len ),
			"pages":          all ? 1 : Math.ceil( visRecords / len ),
			"start":          start,
			"end":            settings.fnDisplayEnd(),
			"length":         len,
			"recordsTotal":   settings.fnRecordsTotal(),
			"recordsDisplay": visRecords,
			"serverSide":     _fnDataSource( settings ) === 'ssp'
		};
	} );
	
	
	/**
	 * Get the current page length.
	 *
	 * @return {integer} Current page length. Note `-1` indicates that all records
	 *   are to be shown.
	 *//**
	 * Set the current page length.
	 *
	 * @param {integer} Page length to set. Use `-1` to show all records.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page.len()', function ( len ) {
		// Note that we can't call this function 'length()' because `length`
		// is a Javascript property of functions which defines how many arguments
		// the function expects.
		if ( len === undefined ) {
			return this.context.length !== 0 ?
				this.context[0]._iDisplayLength :
				undefined;
		}
	
		// else, set the page length
		return this.iterator( 'table', function ( settings ) {
			_fnLengthChange( settings, len );
		} );
	} );
	
	
	
	var __reload = function ( settings, holdPosition, callback ) {
		// Use the draw event to trigger a callback
		if ( callback ) {
			var api = new _Api( settings );
	
			api.one( 'draw', function () {
				callback( api.ajax.json() );
			} );
		}
	
		if ( _fnDataSource( settings ) == 'ssp' ) {
			_fnReDraw( settings, holdPosition );
		}
		else {
			_fnProcessingDisplay( settings, true );
	
			// Cancel an existing request
			var xhr = settings.jqXHR;
			if ( xhr && xhr.readyState !== 4 ) {
				xhr.abort();
			}
	
			// Trigger xhr
			_fnBuildAjax( settings, [], function( json ) {
				_fnClearTable( settings );
	
				var data = _fnAjaxDataSrc( settings, json );
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					_fnAddData( settings, data[i] );
				}
	
				_fnReDraw( settings, holdPosition );
				_fnProcessingDisplay( settings, false );
			} );
		}
	};
	
	
	/**
	 * Get the JSON response from the last Ajax request that DataTables made to the
	 * server. Note that this returns the JSON from the first table in the current
	 * context.
	 *
	 * @return {object} JSON received from the server.
	 */
	_api_register( 'ajax.json()', function () {
		var ctx = this.context;
	
		if ( ctx.length > 0 ) {
			return ctx[0].json;
		}
	
		// else return undefined;
	} );
	
	
	/**
	 * Get the data submitted in the last Ajax request
	 */
	_api_register( 'ajax.params()', function () {
		var ctx = this.context;
	
		if ( ctx.length > 0 ) {
			return ctx[0].oAjaxData;
		}
	
		// else return undefined;
	} );
	
	
	/**
	 * Reload tables from the Ajax data source. Note that this function will
	 * automatically re-draw the table when the remote data has been loaded.
	 *
	 * @param {boolean} [reset=true] Reset (default) or hold the current paging
	 *   position. A full re-sort and re-filter is performed when this method is
	 *   called, which is why the pagination reset is the default action.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.reload()', function ( callback, resetPaging ) {
		return this.iterator( 'table', function (settings) {
			__reload( settings, resetPaging===false, callback );
		} );
	} );
	
	
	/**
	 * Get the current Ajax URL. Note that this returns the URL from the first
	 * table in the current context.
	 *
	 * @return {string} Current Ajax source URL
	 *//**
	 * Set the Ajax URL. Note that this will set the URL for all tables in the
	 * current context.
	 *
	 * @param {string} url URL to set.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url()', function ( url ) {
		var ctx = this.context;
	
		if ( url === undefined ) {
			// get
			if ( ctx.length === 0 ) {
				return undefined;
			}
			ctx = ctx[0];
	
			return ctx.ajax ?
				$.isPlainObject( ctx.ajax ) ?
					ctx.ajax.url :
					ctx.ajax :
				ctx.sAjaxSource;
		}
	
		// set
		return this.iterator( 'table', function ( settings ) {
			if ( $.isPlainObject( settings.ajax ) ) {
				settings.ajax.url = url;
			}
			else {
				settings.ajax = url;
			}
			// No need to consider sAjaxSource here since DataTables gives priority
			// to `ajax` over `sAjaxSource`. So setting `ajax` here, renders any
			// value of `sAjaxSource` redundant.
		} );
	} );
	
	
	/**
	 * Load data from the newly set Ajax URL. Note that this method is only
	 * available when `ajax.url()` is used to set a URL. Additionally, this method
	 * has the same effect as calling `ajax.reload()` but is provided for
	 * convenience when setting a new URL. Like `ajax.reload()` it will
	 * automatically redraw the table once the remote data has been loaded.
	 *
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url().load()', function ( callback, resetPaging ) {
		// Same as a reload, but makes sense to present it for easy access after a
		// url change
		return this.iterator( 'table', function ( ctx ) {
			__reload( ctx, resetPaging===false, callback );
		} );
	} );
	
	
	
	
	var _selector_run = function ( type, selector, selectFn, settings, opts )
	{
		var
			out = [], res,
			a, i, ien, j, jen,
			selectorType = typeof selector;
	
		// Can't just check for isArray here, as an API or jQuery instance might be
		// given with their array like look
		if ( ! selector || selectorType === 'string' || selectorType === 'function' || selector.length === undefined ) {
			selector = [ selector ];
		}
	
		for ( i=0, ien=selector.length ; i<ien ; i++ ) {
			// Only split on simple strings - complex expressions will be jQuery selectors
			a = selector[i] && selector[i].split && ! selector[i].match(/[\[\(:]/) ?
				selector[i].split(',') :
				[ selector[i] ];
	
			for ( j=0, jen=a.length ; j<jen ; j++ ) {
				res = selectFn( typeof a[j] === 'string' ? (a[j]).trim() : a[j] );
	
				if ( res && res.length ) {
					out = out.concat( res );
				}
			}
		}
	
		// selector extensions
		var ext = _ext.selector[ type ];
		if ( ext.length ) {
			for ( i=0, ien=ext.length ; i<ien ; i++ ) {
				out = ext[i]( settings, opts, out );
			}
		}
	
		return _unique( out );
	};
	
	
	var _selector_opts = function ( opts )
	{
		if ( ! opts ) {
			opts = {};
		}
	
		// Backwards compatibility for 1.9- which used the terminology filter rather
		// than search
		if ( opts.filter && opts.search === undefined ) {
			opts.search = opts.filter;
		}
	
		return $.extend( {
			search: 'none',
			order: 'current',
			page: 'all'
		}, opts );
	};
	
	
	var _selector_first = function ( inst )
	{
		// Reduce the API instance to the first item found
		for ( var i=0, ien=inst.length ; i<ien ; i++ ) {
			if ( inst[i].length > 0 ) {
				// Assign the first element to the first item in the instance
				// and truncate the instance and context
				inst[0] = inst[i];
				inst[0].length = 1;
				inst.length = 1;
				inst.context = [ inst.context[i] ];
	
				return inst;
			}
		}
	
		// Not found - return an empty instance
		inst.length = 0;
		return inst;
	};
	
	
	var _selector_row_indexes = function ( settings, opts )
	{
		var
			i, ien, tmp, a=[],
			displayFiltered = settings.aiDisplay,
			displayMaster = settings.aiDisplayMaster;
	
		var
			search = opts.search,  // none, applied, removed
			order  = opts.order,   // applied, current, index (original - compatibility with 1.9)
			page   = opts.page;    // all, current
	
		if ( _fnDataSource( settings ) == 'ssp' ) {
			// In server-side processing mode, most options are irrelevant since
			// rows not shown don't exist and the index order is the applied order
			// Removed is a special case - for consistency just return an empty
			// array
			return search === 'removed' ?
				[] :
				_range( 0, displayMaster.length );
		}
		else if ( page == 'current' ) {
			// Current page implies that order=current and filter=applied, since it is
			// fairly senseless otherwise, regardless of what order and search actually
			// are
			for ( i=settings._iDisplayStart, ien=settings.fnDisplayEnd() ; i<ien ; i++ ) {
				a.push( displayFiltered[i] );
			}
		}
		else if ( order == 'current' || order == 'applied' ) {
			if ( search == 'none') {
				a = displayMaster.slice();
			}
			else if ( search == 'applied' ) {
				a = displayFiltered.slice();
			}
			else if ( search == 'removed' ) {
				// O(n+m) solution by creating a hash map
				var displayFilteredMap = {};
	
				for ( var i=0, ien=displayFiltered.length ; i<ien ; i++ ) {
					displayFilteredMap[displayFiltered[i]] = null;
				}
	
				a = $.map( displayMaster, function (el) {
					return ! displayFilteredMap.hasOwnProperty(el) ?
						el :
						null;
				} );
			}
		}
		else if ( order == 'index' || order == 'original' ) {
			for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				if ( search == 'none' ) {
					a.push( i );
				}
				else { // applied | removed
					tmp = $.inArray( i, displayFiltered );
	
					if ((tmp === -1 && search == 'removed') ||
						(tmp >= 0   && search == 'applied') )
					{
						a.push( i );
					}
				}
			}
		}
	
		return a;
	};
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Rows
	 *
	 * {}          - no selector - use all available rows
	 * {integer}   - row aoData index
	 * {node}      - TR node
	 * {string}    - jQuery selector to apply to the TR elements
	 * {array}     - jQuery array of nodes, or simply an array of TR nodes
	 *
	 */
	var __row_selector = function ( settings, selector, opts )
	{
		var rows;
		var run = function ( sel ) {
			var selInt = _intVal( sel );
			var i, ien;
			var aoData = settings.aoData;
	
			// Short cut - selector is a number and no options provided (default is
			// all records, so no need to check if the index is in there, since it
			// must be - dev error if the index doesn't exist).
			if ( selInt !== null && ! opts ) {
				return [ selInt ];
			}
	
			if ( ! rows ) {
				rows = _selector_row_indexes( settings, opts );
			}
	
			if ( selInt !== null && $.inArray( selInt, rows ) !== -1 ) {
				// Selector - integer
				return [ selInt ];
			}
			else if ( sel === null || sel === undefined || sel === '' ) {
				// Selector - none
				return rows;
			}
	
			// Selector - function
			if ( typeof sel === 'function' ) {
				return $.map( rows, function (idx) {
					var row = aoData[ idx ];
					return sel( idx, row._aData, row.nTr ) ? idx : null;
				} );
			}
	
			// Selector - node
			if ( sel.nodeName ) {
				var rowIdx = sel._DT_RowIndex;  // Property added by DT for fast lookup
				var cellIdx = sel._DT_CellIndex;
	
				if ( rowIdx !== undefined ) {
					// Make sure that the row is actually still present in the table
					return aoData[ rowIdx ] && aoData[ rowIdx ].nTr === sel ?
						[ rowIdx ] :
						[];
				}
				else if ( cellIdx ) {
					return aoData[ cellIdx.row ] && aoData[ cellIdx.row ].nTr === sel.parentNode ?
						[ cellIdx.row ] :
						[];
				}
				else {
					var host = $(sel).closest('*[data-dt-row]');
					return host.length ?
						[ host.data('dt-row') ] :
						[];
				}
			}
	
			// ID selector. Want to always be able to select rows by id, regardless
			// of if the tr element has been created or not, so can't rely upon
			// jQuery here - hence a custom implementation. This does not match
			// Sizzle's fast selector or HTML4 - in HTML5 the ID can be anything,
			// but to select it using a CSS selector engine (like Sizzle or
			// querySelect) it would need to need to be escaped for some characters.
			// DataTables simplifies this for row selectors since you can select
			// only a row. A # indicates an id any anything that follows is the id -
			// unescaped.
			if ( typeof sel === 'string' && sel.charAt(0) === '#' ) {
				// get row index from id
				var rowObj = settings.aIds[ sel.replace( /^#/, '' ) ];
				if ( rowObj !== undefined ) {
					return [ rowObj.idx ];
				}
	
				// need to fall through to jQuery in case there is DOM id that
				// matches
			}
			
			// Get nodes in the order from the `rows` array with null values removed
			var nodes = _removeEmpty(
				_pluck_order( settings.aoData, rows, 'nTr' )
			);
	
			// Selector - jQuery selector string, array of nodes or jQuery object/
			// As jQuery's .filter() allows jQuery objects to be passed in filter,
			// it also allows arrays, so this will cope with all three options
			return $(nodes)
				.filter( sel )
				.map( function () {
					return this._DT_RowIndex;
				} )
				.toArray();
		};
	
		return _selector_run( 'row', selector, run, settings, opts );
	};
	
	
	_api_register( 'rows()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}
	
		opts = _selector_opts( opts );
	
		var inst = this.iterator( 'table', function ( settings ) {
			return __row_selector( settings, selector, opts );
		}, 1 );
	
		// Want argument shifting here and in __row_selector?
		inst.selector.rows = selector;
		inst.selector.opts = opts;
	
		return inst;
	} );
	
	_api_register( 'rows().nodes()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return settings.aoData[ row ].nTr || undefined;
		}, 1 );
	} );
	
	_api_register( 'rows().data()', function () {
		return this.iterator( true, 'rows', function ( settings, rows ) {
			return _pluck_order( settings.aoData, rows, '_aData' );
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().cache()', 'row().cache()', function ( type ) {
		return this.iterator( 'row', function ( settings, row ) {
			var r = settings.aoData[ row ];
			return type === 'search' ? r._aFilterData : r._aSortData;
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().invalidate()', 'row().invalidate()', function ( src ) {
		return this.iterator( 'row', function ( settings, row ) {
			_fnInvalidate( settings, row, src );
		} );
	} );
	
	_api_registerPlural( 'rows().indexes()', 'row().index()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return row;
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().ids()', 'row().id()', function ( hash ) {
		var a = [];
		var context = this.context;
	
		// `iterator` will drop undefined values, but in this case we want them
		for ( var i=0, ien=context.length ; i<ien ; i++ ) {
			for ( var j=0, jen=this[i].length ; j<jen ; j++ ) {
				var id = context[i].rowIdFn( context[i].aoData[ this[i][j] ]._aData );
				a.push( (hash === true ? '#' : '' )+ id );
			}
		}
	
		return new _Api( context, a );
	} );
	
	_api_registerPlural( 'rows().remove()', 'row().remove()', function () {
		var that = this;
	
		this.iterator( 'row', function ( settings, row, thatIdx ) {
			var data = settings.aoData;
			var rowData = data[ row ];
			var i, ien, j, jen;
			var loopRow, loopCells;
	
			data.splice( row, 1 );
	
			// Update the cached indexes
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				loopRow = data[i];
				loopCells = loopRow.anCells;
	
				// Rows
				if ( loopRow.nTr !== null ) {
					loopRow.nTr._DT_RowIndex = i;
				}
	
				// Cells
				if ( loopCells !== null ) {
					for ( j=0, jen=loopCells.length ; j<jen ; j++ ) {
						loopCells[j]._DT_CellIndex.row = i;
					}
				}
			}
	
			// Delete from the display arrays
			_fnDeleteIndex( settings.aiDisplayMaster, row );
			_fnDeleteIndex( settings.aiDisplay, row );
			_fnDeleteIndex( that[ thatIdx ], row, false ); // maintain local indexes
	
			// For server-side processing tables - subtract the deleted row from the count
			if ( settings._iRecordsDisplay > 0 ) {
				settings._iRecordsDisplay--;
			}
	
			// Check for an 'overflow' they case for displaying the table
			_fnLengthOverflow( settings );
	
			// Remove the row's ID reference if there is one
			var id = settings.rowIdFn( rowData._aData );
			if ( id !== undefined ) {
				delete settings.aIds[ id ];
			}
		} );
	
		this.iterator( 'table', function ( settings ) {
			for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				settings.aoData[i].idx = i;
			}
		} );
	
		return this;
	} );
	
	
	_api_register( 'rows.add()', function ( rows ) {
		var newRows = this.iterator( 'table', function ( settings ) {
				var row, i, ien;
				var out = [];
	
				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];
	
					if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
						out.push( _fnAddTr( settings, row )[0] );
					}
					else {
						out.push( _fnAddData( settings, row ) );
					}
				}
	
				return out;
			}, 1 );
	
		// Return an Api.rows() extended instance, so rows().nodes() etc can be used
		var modRows = this.rows( -1 );
		modRows.pop();
		$.merge( modRows, newRows );
	
		return modRows;
	} );
	
	
	
	
	
	/**
	 *
	 */
	_api_register( 'row()', function ( selector, opts ) {
		return _selector_first( this.rows( selector, opts ) );
	} );
	
	
	_api_register( 'row().data()', function ( data ) {
		var ctx = this.context;
	
		if ( data === undefined ) {
			// Get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._aData :
				undefined;
		}
	
		// Set
		var row = ctx[0].aoData[ this[0] ];
		row._aData = data;
	
		// If the DOM has an id, and the data source is an array
		if ( Array.isArray( data ) && row.nTr && row.nTr.id ) {
			_fnSetObjectDataFn( ctx[0].rowId )( data, row.nTr.id );
		}
	
		// Automatically invalidate
		_fnInvalidate( ctx[0], this[0], 'data' );
	
		return this;
	} );
	
	
	_api_register( 'row().node()', function () {
		var ctx = this.context;
	
		return ctx.length && this.length ?
			ctx[0].aoData[ this[0] ].nTr || null :
			null;
	} );
	
	
	_api_register( 'row.add()', function ( row ) {
		// Allow a jQuery object to be passed in - only a single row is added from
		// it though - the first element in the set
		if ( row instanceof $ && row.length ) {
			row = row[0];
		}
	
		var rows = this.iterator( 'table', function ( settings ) {
			if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
				return _fnAddTr( settings, row )[0];
			}
			return _fnAddData( settings, row );
		} );
	
		// Return an Api.rows() extended instance, with the newly added row selected
		return this.row( rows[0] );
	} );
	
	
	$(document).on('plugin-init.dt', function (e, context) {
		var api = new _Api( context );
	
		api.on( 'stateSaveParams', function ( e, settings, d ) {
			// This could be more compact with the API, but it is a lot faster as a simple
			// internal loop
			var idFn = settings.rowIdFn;
			var data = settings.aoData;
			var ids = [];
	
			for (var i=0 ; i<data.length ; i++) {
				if (data[i]._detailsShow) {
					ids.push( '#' + idFn(data[i]._aData) );
				}
			}
	
			d.childRows = ids;
		})
	
		var loaded = api.state.loaded();
	
		if ( loaded && loaded.childRows ) {
			api
				.rows( $.map(loaded.childRows, function (id){
					return id.replace(/:/g, '\\:')
				}) )
				.every( function () {
					_fnCallbackFire( context, null, 'requestChild', [ this ] )
				});
		}
	});
	
	var __details_add = function ( ctx, row, data, klass )
	{
		// Convert to array of TR elements
		var rows = [];
		var addRow = function ( r, k ) {
			// Recursion to allow for arrays of jQuery objects
			if ( Array.isArray( r ) || r instanceof $ ) {
				for ( var i=0, ien=r.length ; i<ien ; i++ ) {
					addRow( r[i], k );
				}
				return;
			}
	
			// If we get a TR element, then just add it directly - up to the dev
			// to add the correct number of columns etc
			if ( r.nodeName && r.nodeName.toLowerCase() === 'tr' ) {
				rows.push( r );
			}
			else {
				// Otherwise create a row with a wrapper
				var created = $('<tr><td></td></tr>').addClass( k );
				$('td', created)
					.addClass( k )
					.html( r )
					[0].colSpan = _fnVisbleColumns( ctx );
	
				rows.push( created[0] );
			}
		};
	
		addRow( data, klass );
	
		if ( row._details ) {
			row._details.detach();
		}
	
		row._details = $(rows);
	
		// If the children were already shown, that state should be retained
		if ( row._detailsShow ) {
			row._details.insertAfter( row.nTr );
		}
	};
	
	
	// Make state saving of child row details async to allow them to be batch processed
	var __details_state = DataTable.util.throttle(
		function (ctx) {
			_fnSaveState( ctx[0] )
		},
		500
	);
	
	
	var __details_remove = function ( api, idx )
	{
		var ctx = api.context;
	
		if ( ctx.length ) {
			var row = ctx[0].aoData[ idx !== undefined ? idx : api[0] ];
	
			if ( row && row._details ) {
				row._details.remove();
	
				row._detailsShow = undefined;
				row._details = undefined;
				$( row.nTr ).removeClass( 'dt-hasChild' );
				__details_state( ctx );
			}
		}
	};
	
	
	var __details_display = function ( api, show ) {
		var ctx = api.context;
	
		if ( ctx.length && api.length ) {
			var row = ctx[0].aoData[ api[0] ];
	
			if ( row._details ) {
				row._detailsShow = show;
	
				if ( show ) {
					row._details.insertAfter( row.nTr );
					$( row.nTr ).addClass( 'dt-hasChild' );
				}
				else {
					row._details.detach();
					$( row.nTr ).removeClass( 'dt-hasChild' );
				}
	
				_fnCallbackFire( ctx[0], null, 'childRow', [ show, api.row( api[0] ) ] )
	
				__details_events( ctx[0] );
				__details_state( ctx );
			}
		}
	};
	
	
	var __details_events = function ( settings )
	{
		var api = new _Api( settings );
		var namespace = '.dt.DT_details';
		var drawEvent = 'draw'+namespace;
		var colvisEvent = 'column-sizing'+namespace;
		var destroyEvent = 'destroy'+namespace;
		var data = settings.aoData;
	
		api.off( drawEvent +' '+ colvisEvent +' '+ destroyEvent );
	
		if ( _pluck( data, '_details' ).length > 0 ) {
			// On each draw, insert the required elements into the document
			api.on( drawEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}
	
				api.rows( {page:'current'} ).eq(0).each( function (idx) {
					// Internal data grab
					var row = data[ idx ];
	
					if ( row._detailsShow ) {
						row._details.insertAfter( row.nTr );
					}
				} );
			} );
	
			// Column visibility change - update the colspan
			api.on( colvisEvent, function ( e, ctx, idx, vis ) {
				if ( settings !== ctx ) {
					return;
				}
	
				// Update the colspan for the details rows (note, only if it already has
				// a colspan)
				var row, visible = _fnVisbleColumns( ctx );
	
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					row = data[i];
	
					if ( row._details ) {
						row._details.children('td[colspan]').attr('colspan', visible );
					}
				}
			} );
	
			// Table destroyed - nuke any child rows
			api.on( destroyEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}
	
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					if ( data[i]._details ) {
						__details_remove( api, i );
					}
				}
			} );
		}
	};
	
	// Strings for the method names to help minification
	var _emp = '';
	var _child_obj = _emp+'row().child';
	var _child_mth = _child_obj+'()';
	
	// data can be:
	//  tr
	//  string
	//  jQuery or array of any of the above
	_api_register( _child_mth, function ( data, klass ) {
		var ctx = this.context;
	
		if ( data === undefined ) {
			// get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._details :
				undefined;
		}
		else if ( data === true ) {
			// show
			this.child.show();
		}
		else if ( data === false ) {
			// remove
			__details_remove( this );
		}
		else if ( ctx.length && this.length ) {
			// set
			__details_add( ctx[0], ctx[0].aoData[ this[0] ], data, klass );
		}
	
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.show()',
		_child_mth+'.show()' // only when `child()` was called with parameters (without
	], function ( show ) {   // it returns an object and this method is not executed)
		__details_display( this, true );
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.hide()',
		_child_mth+'.hide()' // only when `child()` was called with parameters (without
	], function () {         // it returns an object and this method is not executed)
		__details_display( this, false );
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.remove()',
		_child_mth+'.remove()' // only when `child()` was called with parameters (without
	], function () {           // it returns an object and this method is not executed)
		__details_remove( this );
		return this;
	} );
	
	
	_api_register( _child_obj+'.isShown()', function () {
		var ctx = this.context;
	
		if ( ctx.length && this.length ) {
			// _detailsShown as false or undefined will fall through to return false
			return ctx[0].aoData[ this[0] ]._detailsShow || false;
		}
		return false;
	} );
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Columns
	 *
	 * {integer}           - column index (>=0 count from left, <0 count from right)
	 * "{integer}:visIdx"  - visible column index (i.e. translate to column index)  (>=0 count from left, <0 count from right)
	 * "{integer}:visible" - alias for {integer}:visIdx  (>=0 count from left, <0 count from right)
	 * "{string}:name"     - column name
	 * "{string}"          - jQuery selector on column header nodes
	 *
	 */
	
	// can be an array of these items, comma separated list, or an array of comma
	// separated lists
	
	var __re_column_selector = /^([^:]+):(name|visIdx|visible)$/;
	
	
	// r1 and r2 are redundant - but it means that the parameters match for the
	// iterator callback in columns().data()
	var __columnData = function ( settings, column, r1, r2, rows ) {
		var a = [];
		for ( var row=0, ien=rows.length ; row<ien ; row++ ) {
			a.push( _fnGetCellData( settings, rows[row], column ) );
		}
		return a;
	};
	
	
	var __column_selector = function ( settings, selector, opts )
	{
		var
			columns = settings.aoColumns,
			names = _pluck( columns, 'sName' ),
			nodes = _pluck( columns, 'nTh' );
	
		var run = function ( s ) {
			var selInt = _intVal( s );
	
			// Selector - all
			if ( s === '' ) {
				return _range( columns.length );
			}
	
			// Selector - index
			if ( selInt !== null ) {
				return [ selInt >= 0 ?
					selInt : // Count from left
					columns.length + selInt // Count from right (+ because its a negative value)
				];
			}
	
			// Selector = function
			if ( typeof s === 'function' ) {
				var rows = _selector_row_indexes( settings, opts );
	
				return $.map( columns, function (col, idx) {
					return s(
							idx,
							__columnData( settings, idx, 0, 0, rows ),
							nodes[ idx ]
						) ? idx : null;
				} );
			}
	
			// jQuery or string selector
			var match = typeof s === 'string' ?
				s.match( __re_column_selector ) :
				'';
	
			if ( match ) {
				switch( match[2] ) {
					case 'visIdx':
					case 'visible':
						var idx = parseInt( match[1], 10 );
						// Visible index given, convert to column index
						if ( idx < 0 ) {
							// Counting from the right
							var visColumns = $.map( columns, function (col,i) {
								return col.bVisible ? i : null;
							} );
							return [ visColumns[ visColumns.length + idx ] ];
						}
						// Counting from the left
						return [ _fnVisibleToColumnIndex( settings, idx ) ];
	
					case 'name':
						// match by name. `names` is column index complete and in order
						return $.map( names, function (name, i) {
							return name === match[1] ? i : null;
						} );
	
					default:
						return [];
				}
			}
	
			// Cell in the table body
			if ( s.nodeName && s._DT_CellIndex ) {
				return [ s._DT_CellIndex.column ];
			}
	
			// jQuery selector on the TH elements for the columns
			var jqResult = $( nodes )
				.filter( s )
				.map( function () {
					return $.inArray( this, nodes ); // `nodes` is column index complete and in order
				} )
				.toArray();
	
			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}
	
			// Otherwise a node which might have a `dt-column` data attribute, or be
			// a child or such an element
			var host = $(s).closest('*[data-dt-column]');
			return host.length ?
				[ host.data('dt-column') ] :
				[];
		};
	
		return _selector_run( 'column', selector, run, settings, opts );
	};
	
	
	var __setColumnVis = function ( settings, column, vis ) {
		var
			cols = settings.aoColumns,
			col  = cols[ column ],
			data = settings.aoData,
			row, cells, i, ien, tr;
	
		// Get
		if ( vis === undefined ) {
			return col.bVisible;
		}
	
		// Set
		// No change
		if ( col.bVisible === vis ) {
			return;
		}
	
		if ( vis ) {
			// Insert column
			// Need to decide if we should use appendChild or insertBefore
			var insertBefore = $.inArray( true, _pluck(cols, 'bVisible'), column+1 );
	
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				tr = data[i].nTr;
				cells = data[i].anCells;
	
				if ( tr ) {
					// insertBefore can act like appendChild if 2nd arg is null
					tr.insertBefore( cells[ column ], cells[ insertBefore ] || null );
				}
			}
		}
		else {
			// Remove column
			$( _pluck( settings.aoData, 'anCells', column ) ).detach();
		}
	
		// Common actions
		col.bVisible = vis;
	};
	
	
	_api_register( 'columns()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}
	
		opts = _selector_opts( opts );
	
		var inst = this.iterator( 'table', function ( settings ) {
			return __column_selector( settings, selector, opts );
		}, 1 );
	
		// Want argument shifting here and in _row_selector?
		inst.selector.cols = selector;
		inst.selector.opts = opts;
	
		return inst;
	} );
	
	_api_registerPlural( 'columns().header()', 'column().header()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTh;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().footer()', 'column().footer()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTf;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().data()', 'column().data()', function () {
		return this.iterator( 'column-rows', __columnData, 1 );
	} );
	
	_api_registerPlural( 'columns().dataSrc()', 'column().dataSrc()', function () {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].mData;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().cache()', 'column().cache()', function ( type ) {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows,
				type === 'search' ? '_aFilterData' : '_aSortData', column
			);
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().nodes()', 'column().nodes()', function () {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows, 'anCells', column ) ;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().visible()', 'column().visible()', function ( vis, calc ) {
		var that = this;
		var ret = this.iterator( 'column', function ( settings, column ) {
			if ( vis === undefined ) {
				return settings.aoColumns[ column ].bVisible;
			} // else
			__setColumnVis( settings, column, vis );
		} );
	
		// Group the column visibility changes
		if ( vis !== undefined ) {
			this.iterator( 'table', function ( settings ) {
				// Redraw the header after changes
				_fnDrawHead( settings, settings.aoHeader );
				_fnDrawHead( settings, settings.aoFooter );
		
				// Update colspan for no records display. Child rows and extensions will use their own
				// listeners to do this - only need to update the empty table item here
				if ( ! settings.aiDisplay.length ) {
					$(settings.nTBody).find('td[colspan]').attr('colspan', _fnVisbleColumns(settings));
				}
		
				_fnSaveState( settings );
	
				// Second loop once the first is done for events
				that.iterator( 'column', function ( settings, column ) {
					_fnCallbackFire( settings, null, 'column-visibility', [settings, column, vis, calc] );
				} );
	
				if ( calc === undefined || calc ) {
					that.columns.adjust();
				}
			});
		}
	
		return ret;
	} );
	
	_api_registerPlural( 'columns().indexes()', 'column().index()', function ( type ) {
		return this.iterator( 'column', function ( settings, column ) {
			return type === 'visible' ?
				_fnColumnIndexToVisible( settings, column ) :
				column;
		}, 1 );
	} );
	
	_api_register( 'columns.adjust()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnAdjustColumnSizing( settings );
		}, 1 );
	} );
	
	_api_register( 'column.index()', function ( type, idx ) {
		if ( this.context.length !== 0 ) {
			var ctx = this.context[0];
	
			if ( type === 'fromVisible' || type === 'toData' ) {
				return _fnVisibleToColumnIndex( ctx, idx );
			}
			else if ( type === 'fromData' || type === 'toVisible' ) {
				return _fnColumnIndexToVisible( ctx, idx );
			}
		}
	} );
	
	_api_register( 'column()', function ( selector, opts ) {
		return _selector_first( this.columns( selector, opts ) );
	} );
	
	var __cell_selector = function ( settings, selector, opts )
	{
		var data = settings.aoData;
		var rows = _selector_row_indexes( settings, opts );
		var cells = _removeEmpty( _pluck_order( data, rows, 'anCells' ) );
		var allCells = $(_flatten( [], cells ));
		var row;
		var columns = settings.aoColumns.length;
		var a, i, ien, j, o, host;
	
		var run = function ( s ) {
			var fnSelector = typeof s === 'function';
	
			if ( s === null || s === undefined || fnSelector ) {
				// All cells and function selectors
				a = [];
	
				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];
	
					for ( j=0 ; j<columns ; j++ ) {
						o = {
							row: row,
							column: j
						};
	
						if ( fnSelector ) {
							// Selector - function
							host = data[ row ];
	
							if ( s( o, _fnGetCellData(settings, row, j), host.anCells ? host.anCells[j] : null ) ) {
								a.push( o );
							}
						}
						else {
							// Selector - all
							a.push( o );
						}
					}
				}
	
				return a;
			}
			
			// Selector - index
			if ( $.isPlainObject( s ) ) {
				// Valid cell index and its in the array of selectable rows
				return s.column !== undefined && s.row !== undefined && $.inArray( s.row, rows ) !== -1 ?
					[s] :
					[];
			}
	
			// Selector - jQuery filtered cells
			var jqResult = allCells
				.filter( s )
				.map( function (i, el) {
					return { // use a new object, in case someone changes the values
						row:    el._DT_CellIndex.row,
						column: el._DT_CellIndex.column
	 				};
				} )
				.toArray();
	
			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}
	
			// Otherwise the selector is a node, and there is one last option - the
			// element might be a child of an element which has dt-row and dt-column
			// data attributes
			host = $(s).closest('*[data-dt-row]');
			return host.length ?
				[ {
					row: host.data('dt-row'),
					column: host.data('dt-column')
				} ] :
				[];
		};
	
		return _selector_run( 'cell', selector, run, settings, opts );
	};
	
	
	
	
	_api_register( 'cells()', function ( rowSelector, columnSelector, opts ) {
		// Argument shifting
		if ( $.isPlainObject( rowSelector ) ) {
			// Indexes
			if ( rowSelector.row === undefined ) {
				// Selector options in first parameter
				opts = rowSelector;
				rowSelector = null;
			}
			else {
				// Cell index objects in first parameter
				opts = columnSelector;
				columnSelector = null;
			}
		}
		if ( $.isPlainObject( columnSelector ) ) {
			opts = columnSelector;
			columnSelector = null;
		}
	
		// Cell selector
		if ( columnSelector === null || columnSelector === undefined ) {
			return this.iterator( 'table', function ( settings ) {
				return __cell_selector( settings, rowSelector, _selector_opts( opts ) );
			} );
		}
	
		// The default built in options need to apply to row and columns
		var internalOpts = opts ? {
			page: opts.page,
			order: opts.order,
			search: opts.search
		} : {};
	
		// Row + column selector
		var columns = this.columns( columnSelector, internalOpts );
		var rows = this.rows( rowSelector, internalOpts );
		var i, ien, j, jen;
	
		var cellsNoOpts = this.iterator( 'table', function ( settings, idx ) {
			var a = [];
	
			for ( i=0, ien=rows[idx].length ; i<ien ; i++ ) {
				for ( j=0, jen=columns[idx].length ; j<jen ; j++ ) {
					a.push( {
						row:    rows[idx][i],
						column: columns[idx][j]
					} );
				}
			}
	
			return a;
		}, 1 );
	
		// There is currently only one extension which uses a cell selector extension
		// It is a _major_ performance drag to run this if it isn't needed, so this is
		// an extension specific check at the moment
		var cells = opts && opts.selected ?
			this.cells( cellsNoOpts, opts ) :
			cellsNoOpts;
	
		$.extend( cells.selector, {
			cols: columnSelector,
			rows: rowSelector,
			opts: opts
		} );
	
		return cells;
	} );
	
	
	_api_registerPlural( 'cells().nodes()', 'cell().node()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			var data = settings.aoData[ row ];
	
			return data && data.anCells ?
				data.anCells[ column ] :
				undefined;
		}, 1 );
	} );
	
	
	_api_register( 'cells().data()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column );
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().cache()', 'cell().cache()', function ( type ) {
		type = type === 'search' ? '_aFilterData' : '_aSortData';
	
		return this.iterator( 'cell', function ( settings, row, column ) {
			return settings.aoData[ row ][ type ][ column ];
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().render()', 'cell().render()', function ( type ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column, type );
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().indexes()', 'cell().index()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return {
				row: row,
				column: column,
				columnVisible: _fnColumnIndexToVisible( settings, column )
			};
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().invalidate()', 'cell().invalidate()', function ( src ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			_fnInvalidate( settings, row, src, column );
		} );
	} );
	
	
	
	_api_register( 'cell()', function ( rowSelector, columnSelector, opts ) {
		return _selector_first( this.cells( rowSelector, columnSelector, opts ) );
	} );
	
	
	_api_register( 'cell().data()', function ( data ) {
		var ctx = this.context;
		var cell = this[0];
	
		if ( data === undefined ) {
			// Get
			return ctx.length && cell.length ?
				_fnGetCellData( ctx[0], cell[0].row, cell[0].column ) :
				undefined;
		}
	
		// Set
		_fnSetCellData( ctx[0], cell[0].row, cell[0].column, data );
		_fnInvalidate( ctx[0], cell[0].row, 'data', cell[0].column );
	
		return this;
	} );
	
	
	
	/**
	 * Get current ordering (sorting) that has been applied to the table.
	 *
	 * @returns {array} 2D array containing the sorting information for the first
	 *   table in the current context. Each element in the parent array represents
	 *   a column being sorted upon (i.e. multi-sorting with two columns would have
	 *   2 inner arrays). The inner arrays may have 2 or 3 elements. The first is
	 *   the column index that the sorting condition applies to, the second is the
	 *   direction of the sort (`desc` or `asc`) and, optionally, the third is the
	 *   index of the sorting order from the `column.sorting` initialisation array.
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {integer} order Column index to sort upon.
	 * @param {string} direction Direction of the sort to be applied (`asc` or `desc`)
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 1D array of sorting information to be applied.
	 * @param {array} [...] Optional additional sorting conditions
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 2D array of sorting information to be applied.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order()', function ( order, dir ) {
		var ctx = this.context;
	
		if ( order === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].aaSorting :
				undefined;
		}
	
		// set
		if ( typeof order === 'number' ) {
			// Simple column / direction passed in
			order = [ [ order, dir ] ];
		}
		else if ( order.length && ! Array.isArray( order[0] ) ) {
			// Arguments passed in (list of 1D arrays)
			order = Array.prototype.slice.call( arguments );
		}
		// otherwise a 2D array was passed in
	
		return this.iterator( 'table', function ( settings ) {
			settings.aaSorting = order.slice();
		} );
	} );
	
	
	/**
	 * Attach a sort listener to an element for a given column
	 *
	 * @param {node|jQuery|string} node Identifier for the element(s) to attach the
	 *   listener to. This can take the form of a single DOM node, a jQuery
	 *   collection of nodes or a jQuery selector which will identify the node(s).
	 * @param {integer} column the column that a click on this node will sort on
	 * @param {function} [callback] callback function when sort is run
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order.listener()', function ( node, column, callback ) {
		return this.iterator( 'table', function ( settings ) {
			_fnSortAttachListener( settings, node, column, callback );
		} );
	} );
	
	
	_api_register( 'order.fixed()', function ( set ) {
		if ( ! set ) {
			var ctx = this.context;
			var fixed = ctx.length ?
				ctx[0].aaSortingFixed :
				undefined;
	
			return Array.isArray( fixed ) ?
				{ pre: fixed } :
				fixed;
		}
	
		return this.iterator( 'table', function ( settings ) {
			settings.aaSortingFixed = $.extend( true, {}, set );
		} );
	} );
	
	
	// Order by the selected column(s)
	_api_register( [
		'columns().order()',
		'column().order()'
	], function ( dir ) {
		var that = this;
	
		return this.iterator( 'table', function ( settings, i ) {
			var sort = [];
	
			$.each( that[i], function (j, col) {
				sort.push( [ col, dir ] );
			} );
	
			settings.aaSorting = sort;
		} );
	} );
	
	
	
	_api_register( 'search()', function ( input, regex, smart, caseInsen ) {
		var ctx = this.context;
	
		if ( input === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].oPreviousSearch.sSearch :
				undefined;
		}
	
		// set
		return this.iterator( 'table', function ( settings ) {
			if ( ! settings.oFeatures.bFilter ) {
				return;
			}
	
			_fnFilterComplete( settings, $.extend( {}, settings.oPreviousSearch, {
				"sSearch": input+"",
				"bRegex":  regex === null ? false : regex,
				"bSmart":  smart === null ? true  : smart,
				"bCaseInsensitive": caseInsen === null ? true : caseInsen
			} ), 1 );
		} );
	} );
	
	
	_api_registerPlural(
		'columns().search()',
		'column().search()',
		function ( input, regex, smart, caseInsen ) {
			return this.iterator( 'column', function ( settings, column ) {
				var preSearch = settings.aoPreSearchCols;
	
				if ( input === undefined ) {
					// get
					return preSearch[ column ].sSearch;
				}
	
				// set
				if ( ! settings.oFeatures.bFilter ) {
					return;
				}
	
				$.extend( preSearch[ column ], {
					"sSearch": input+"",
					"bRegex":  regex === null ? false : regex,
					"bSmart":  smart === null ? true  : smart,
					"bCaseInsensitive": caseInsen === null ? true : caseInsen
				} );
	
				_fnFilterComplete( settings, settings.oPreviousSearch, 1 );
			} );
		}
	);
	
	/*
	 * State API methods
	 */
	
	_api_register( 'state()', function () {
		return this.context.length ?
			this.context[0].oSavedState :
			null;
	} );
	
	
	_api_register( 'state.clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			// Save an empty object
			settings.fnStateSaveCallback.call( settings.oInstance, settings, {} );
		} );
	} );
	
	
	_api_register( 'state.loaded()', function () {
		return this.context.length ?
			this.context[0].oLoadedState :
			null;
	} );
	
	
	_api_register( 'state.save()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnSaveState( settings );
		} );
	} );
	
	
	
	/**
	 * Provide a common method for plug-ins to check the version of DataTables being
	 * used, in order to ensure compatibility.
	 *
	 *  @param {string} version Version string to check for, in the format "X.Y.Z".
	 *    Note that the formats "X" and "X.Y" are also acceptable.
	 *  @returns {boolean} true if this version of DataTables is greater or equal to
	 *    the required version, or false if this version of DataTales is not
	 *    suitable
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    alert( $.fn.dataTable.versionCheck( '1.9.0' ) );
	 */
	DataTable.versionCheck = DataTable.fnVersionCheck = function( version )
	{
		var aThis = DataTable.version.split('.');
		var aThat = version.split('.');
		var iThis, iThat;
	
		for ( var i=0, iLen=aThat.length ; i<iLen ; i++ ) {
			iThis = parseInt( aThis[i], 10 ) || 0;
			iThat = parseInt( aThat[i], 10 ) || 0;
	
			// Parts are the same, keep comparing
			if (iThis === iThat) {
				continue;
			}
	
			// Parts are different, return immediately
			return iThis > iThat;
		}
	
		return true;
	};
	
	
	/**
	 * Check if a `<table>` node is a DataTable table already or not.
	 *
	 *  @param {node|jquery|string} table Table node, jQuery object or jQuery
	 *      selector for the table to test. Note that if more than more than one
	 *      table is passed on, only the first will be checked
	 *  @returns {boolean} true the table given is a DataTable, or false otherwise
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    if ( ! $.fn.DataTable.isDataTable( '#example' ) ) {
	 *      $('#example').dataTable();
	 *    }
	 */
	DataTable.isDataTable = DataTable.fnIsDataTable = function ( table )
	{
		var t = $(table).get(0);
		var is = false;
	
		if ( table instanceof DataTable.Api ) {
			return true;
		}
	
		$.each( DataTable.settings, function (i, o) {
			var head = o.nScrollHead ? $('table', o.nScrollHead)[0] : null;
			var foot = o.nScrollFoot ? $('table', o.nScrollFoot)[0] : null;
	
			if ( o.nTable === t || head === t || foot === t ) {
				is = true;
			}
		} );
	
		return is;
	};
	
	
	/**
	 * Get all DataTable tables that have been initialised - optionally you can
	 * select to get only currently visible tables.
	 *
	 *  @param {boolean} [visible=false] Flag to indicate if you want all (default)
	 *    or visible tables only.
	 *  @returns {array} Array of `table` nodes (not DataTable instances) which are
	 *    DataTables
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    $.each( $.fn.dataTable.tables(true), function () {
	 *      $(table).DataTable().columns.adjust();
	 *    } );
	 */
	DataTable.tables = DataTable.fnTables = function ( visible )
	{
		var api = false;
	
		if ( $.isPlainObject( visible ) ) {
			api = visible.api;
			visible = visible.visible;
		}
	
		var a = $.map( DataTable.settings, function (o) {
			if ( !visible || (visible && $(o.nTable).is(':visible')) ) {
				return o.nTable;
			}
		} );
	
		return api ?
			new _Api( a ) :
			a;
	};
	
	
	/**
	 * Convert from camel case parameters to Hungarian notation. This is made public
	 * for the extensions to provide the same ability as DataTables core to accept
	 * either the 1.9 style Hungarian notation, or the 1.10+ style camelCase
	 * parameters.
	 *
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 */
	DataTable.camelToHungarian = _fnCamelToHungarian;
	
	
	
	/**
	 *
	 */
	_api_register( '$()', function ( selector, opts ) {
		var
			rows   = this.rows( opts ).nodes(), // Get all rows
			jqRows = $(rows);
	
		return $( [].concat(
			jqRows.filter( selector ).toArray(),
			jqRows.find( selector ).toArray()
		) );
	} );
	
	
	// jQuery functions to operate on the tables
	$.each( [ 'on', 'one', 'off' ], function (i, key) {
		_api_register( key+'()', function ( /* event, handler */ ) {
			var args = Array.prototype.slice.call(arguments);
	
			// Add the `dt` namespace automatically if it isn't already present
			args[0] = $.map( args[0].split( /\s/ ), function ( e ) {
				return ! e.match(/\.dt\b/) ?
					e+'.dt' :
					e;
				} ).join( ' ' );
	
			var inst = $( this.tables().nodes() );
			inst[key].apply( inst, args );
			return this;
		} );
	} );
	
	
	_api_register( 'clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnClearTable( settings );
		} );
	} );
	
	
	_api_register( 'settings()', function () {
		return new _Api( this.context, this.context );
	} );
	
	
	_api_register( 'init()', function () {
		var ctx = this.context;
		return ctx.length ? ctx[0].oInit : null;
	} );
	
	
	_api_register( 'data()', function () {
		return this.iterator( 'table', function ( settings ) {
			return _pluck( settings.aoData, '_aData' );
		} ).flatten();
	} );
	
	
	_api_register( 'destroy()', function ( remove ) {
		remove = remove || false;
	
		return this.iterator( 'table', function ( settings ) {
			var classes   = settings.oClasses;
			var table     = settings.nTable;
			var tbody     = settings.nTBody;
			var thead     = settings.nTHead;
			var tfoot     = settings.nTFoot;
			var jqTable   = $(table);
			var jqTbody   = $(tbody);
			var jqWrapper = $(settings.nTableWrapper);
			var rows      = $.map( settings.aoData, function (r) { return r.nTr; } );
			var i, ien;
	
			// Flag to note that the table is currently being destroyed - no action
			// should be taken
			settings.bDestroying = true;
	
			// Fire off the destroy callbacks for plug-ins etc
			_fnCallbackFire( settings, "aoDestroyCallback", "destroy", [settings] );
	
			// If not being removed from the document, make all columns visible
			if ( ! remove ) {
				new _Api( settings ).columns().visible( true );
			}
	
			// Blitz all `DT` namespaced events (these are internal events, the
			// lowercase, `dt` events are user subscribed and they are responsible
			// for removing them
			jqWrapper.off('.DT').find(':not(tbody *)').off('.DT');
			$(window).off('.DT-'+settings.sInstance);
	
			// When scrolling we had to break the table up - restore it
			if ( table != thead.parentNode ) {
				jqTable.children('thead').detach();
				jqTable.append( thead );
			}
	
			if ( tfoot && table != tfoot.parentNode ) {
				jqTable.children('tfoot').detach();
				jqTable.append( tfoot );
			}
	
			settings.aaSorting = [];
			settings.aaSortingFixed = [];
			_fnSortingClasses( settings );
	
			$( rows ).removeClass( settings.asStripeClasses.join(' ') );
	
			$('th, td', thead).removeClass( classes.sSortable+' '+
				classes.sSortableAsc+' '+classes.sSortableDesc+' '+classes.sSortableNone
			);
	
			// Add the TR elements back into the table in their original order
			jqTbody.children().detach();
			jqTbody.append( rows );
	
			var orig = settings.nTableWrapper.parentNode;
	
			// Remove the DataTables generated nodes, events and classes
			var removedMethod = remove ? 'remove' : 'detach';
			jqTable[ removedMethod ]();
			jqWrapper[ removedMethod ]();
	
			// If we need to reattach the table to the document
			if ( ! remove && orig ) {
				// insertBefore acts like appendChild if !arg[1]
				orig.insertBefore( table, settings.nTableReinsertBefore );
	
				// Restore the width of the original table - was read from the style property,
				// so we can restore directly to that
				jqTable
					.css( 'width', settings.sDestroyWidth )
					.removeClass( classes.sTable );
	
				// If the were originally stripe classes - then we add them back here.
				// Note this is not fool proof (for example if not all rows had stripe
				// classes - but it's a good effort without getting carried away
				ien = settings.asDestroyStripes.length;
	
				if ( ien ) {
					jqTbody.children().each( function (i) {
						$(this).addClass( settings.asDestroyStripes[i % ien] );
					} );
				}
			}
	
			/* Remove the settings object from the settings array */
			var idx = $.inArray( settings, DataTable.settings );
			if ( idx !== -1 ) {
				DataTable.settings.splice( idx, 1 );
			}
		} );
	} );
	
	
	// Add the `every()` method for rows, columns and cells in a compact form
	$.each( [ 'column', 'row', 'cell' ], function ( i, type ) {
		_api_register( type+'s().every()', function ( fn ) {
			var opts = this.selector.opts;
			var api = this;
	
			return this.iterator( type, function ( settings, arg1, arg2, arg3, arg4 ) {
				// Rows and columns:
				//  arg1 - index
				//  arg2 - table counter
				//  arg3 - loop counter
				//  arg4 - undefined
				// Cells:
				//  arg1 - row index
				//  arg2 - column index
				//  arg3 - table counter
				//  arg4 - loop counter
				fn.call(
					api[ type ](
						arg1,
						type==='cell' ? arg2 : opts,
						type==='cell' ? opts : undefined
					),
					arg1, arg2, arg3, arg4
				);
			} );
		} );
	} );
	
	
	// i18n method for extensions to be able to use the language object from the
	// DataTable
	_api_register( 'i18n()', function ( token, def, plural ) {
		var ctx = this.context[0];
		var resolved = _fnGetObjectDataFn( token )( ctx.oLanguage );
	
		if ( resolved === undefined ) {
			resolved = def;
		}
	
		if ( plural !== undefined && $.isPlainObject( resolved ) ) {
			resolved = resolved[ plural ] !== undefined ?
				resolved[ plural ] :
				resolved._;
		}
	
		return resolved.replace( '%d', plural ); // nb: plural might be undefined,
	} );	
	/**
	 * Version string for plug-ins to check compatibility. Allowed format is
	 * `a.b.c-d` where: a:int, b:int, c:int, d:string(dev|beta|alpha). `d` is used
	 * only for non-release builds. See http://semver.org/ for more information.
	 *  @member
	 *  @type string
	 *  @default Version number
	 */
	DataTable.version = "1.12.1";
	
	/**
	 * Private data store, containing all of the settings objects that are
	 * created for the tables on a given page.
	 *
	 * Note that the `DataTable.settings` object is aliased to
	 * `jQuery.fn.dataTableExt` through which it may be accessed and
	 * manipulated, or `jQuery.fn.dataTable.settings`.
	 *  @member
	 *  @type array
	 *  @default []
	 *  @private
	 */
	DataTable.settings = [];
	
	/**
	 * Object models container, for the various models that DataTables has
	 * available to it. These models define the objects that are used to hold
	 * the active state and configuration of the table.
	 *  @namespace
	 */
	DataTable.models = {};
	
	
	
	/**
	 * Template object for the way in which DataTables holds information about
	 * search information for the global filter and individual column filters.
	 *  @namespace
	 */
	DataTable.models.oSearch = {
		/**
		 * Flag to indicate if the filtering should be case insensitive or not
		 *  @type boolean
		 *  @default true
		 */
		"bCaseInsensitive": true,
	
		/**
		 * Applied search term
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sSearch": "",
	
		/**
		 * Flag to indicate if the search term should be interpreted as a
		 * regular expression (true) or not (false) and therefore and special
		 * regex characters escaped.
		 *  @type boolean
		 *  @default false
		 */
		"bRegex": false,
	
		/**
		 * Flag to indicate if DataTables is to use its smart filtering or not.
		 *  @type boolean
		 *  @default true
		 */
		"bSmart": true,
	
		/**
		 * Flag to indicate if DataTables should only trigger a search when
		 * the return key is pressed.
		 *  @type boolean
		 *  @default false
		 */
		"return": false
	};
	
	
	
	
	/**
	 * Template object for the way in which DataTables holds information about
	 * each individual row. This is the object format used for the settings
	 * aoData array.
	 *  @namespace
	 */
	DataTable.models.oRow = {
		/**
		 * TR element for the row
		 *  @type node
		 *  @default null
		 */
		"nTr": null,
	
		/**
		 * Array of TD elements for each row. This is null until the row has been
		 * created.
		 *  @type array nodes
		 *  @default []
		 */
		"anCells": null,
	
		/**
		 * Data object from the original data source for the row. This is either
		 * an array if using the traditional form of DataTables, or an object if
		 * using mData options. The exact type will depend on the passed in
		 * data from the data source, or will be an array if using DOM a data
		 * source.
		 *  @type array|object
		 *  @default []
		 */
		"_aData": [],
	
		/**
		 * Sorting data cache - this array is ostensibly the same length as the
		 * number of columns (although each index is generated only as it is
		 * needed), and holds the data that is used for sorting each column in the
		 * row. We do this cache generation at the start of the sort in order that
		 * the formatting of the sort data need be done only once for each cell
		 * per sort. This array should not be read from or written to by anything
		 * other than the master sorting methods.
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aSortData": null,
	
		/**
		 * Per cell filtering data cache. As per the sort data cache, used to
		 * increase the performance of the filtering in DataTables
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aFilterData": null,
	
		/**
		 * Filtering data cache. This is the same as the cell filtering cache, but
		 * in this case a string rather than an array. This is easily computed with
		 * a join on `_aFilterData`, but is provided as a cache so the join isn't
		 * needed on every search (memory traded for performance)
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_sFilterRow": null,
	
		/**
		 * Cache of the class name that DataTables has applied to the row, so we
		 * can quickly look at this variable rather than needing to do a DOM check
		 * on className for the nTr property.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *  @private
		 */
		"_sRowStripe": "",
	
		/**
		 * Denote if the original data source was from the DOM, or the data source
		 * object. This is used for invalidating data, so DataTables can
		 * automatically read data from the original source, unless uninstructed
		 * otherwise.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"src": null,
	
		/**
		 * Index in the aoData array. This saves an indexOf lookup when we have the
		 * object, but want to know the index
		 *  @type integer
		 *  @default -1
		 *  @private
		 */
		"idx": -1
	};
	
	
	/**
	 * Template object for the column information object in DataTables. This object
	 * is held in the settings aoColumns array and contains all the information that
	 * DataTables needs about each individual column.
	 *
	 * Note that this object is related to {@link DataTable.defaults.column}
	 * but this one is the internal data store for DataTables's cache of columns.
	 * It should NOT be manipulated outside of DataTables. Any configuration should
	 * be done through the initialisation options.
	 *  @namespace
	 */
	DataTable.models.oColumn = {
		/**
		 * Column index. This could be worked out on-the-fly with $.inArray, but it
		 * is faster to just hold it as a variable
		 *  @type integer
		 *  @default null
		 */
		"idx": null,
	
		/**
		 * A list of the columns that sorting should occur on when this column
		 * is sorted. That this property is an array allows multi-column sorting
		 * to be defined for a column (for example first name / last name columns
		 * would benefit from this). The values are integers pointing to the
		 * columns to be sorted on (typically it will be a single integer pointing
		 * at itself, but that doesn't need to be the case).
		 *  @type array
		 */
		"aDataSort": null,
	
		/**
		 * Define the sorting directions that are applied to the column, in sequence
		 * as the column is repeatedly sorted upon - i.e. the first value is used
		 * as the sorting direction when the column if first sorted (clicked on).
		 * Sort it again (click again) and it will move on to the next index.
		 * Repeat until loop.
		 *  @type array
		 */
		"asSorting": null,
	
		/**
		 * Flag to indicate if the column is searchable, and thus should be included
		 * in the filtering or not.
		 *  @type boolean
		 */
		"bSearchable": null,
	
		/**
		 * Flag to indicate if the column is sortable or not.
		 *  @type boolean
		 */
		"bSortable": null,
	
		/**
		 * Flag to indicate if the column is currently visible in the table or not
		 *  @type boolean
		 */
		"bVisible": null,
	
		/**
		 * Store for manual type assignment using the `column.type` option. This
		 * is held in store so we can manipulate the column's `sType` property.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"_sManualType": null,
	
		/**
		 * Flag to indicate if HTML5 data attributes should be used as the data
		 * source for filtering or sorting. True is either are.
		 *  @type boolean
		 *  @default false
		 *  @private
		 */
		"_bAttrSrc": false,
	
		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} nTd The TD node that has been created
		 *  @param {*} sData The Data for the cell
		 *  @param {array|object} oData The data for the whole row
		 *  @param {int} iRow The row index for the aoData data store
		 *  @default null
		 */
		"fnCreatedCell": null,
	
		/**
		 * Function to get data from a cell in a column. You should <b>never</b>
		 * access data directly through _aData internally in DataTables - always use
		 * the method attached to this property. It allows mData to function as
		 * required. This function is automatically assigned by the column
		 * initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {string} sSpecific The specific data type you want to get -
		 *    'display', 'type' 'filter' 'sort'
		 *  @returns {*} The data for the cell from the given row's data
		 *  @default null
		 */
		"fnGetData": null,
	
		/**
		 * Function to set data for a cell in the column. You should <b>never</b>
		 * set the data directly to _aData internally in DataTables - always use
		 * this method. It allows mData to function as required. This function
		 * is automatically assigned by the column initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {*} sValue Value to set
		 *  @default null
		 */
		"fnSetData": null,
	
		/**
		 * Property to read the value for the cells in the column from the data
		 * source array / object. If null, then the default content is used, if a
		 * function is given then the return from the function is used.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mData": null,
	
		/**
		 * Partner property to mData which is used (only when defined) to get
		 * the data - i.e. it is basically the same as mData, but without the
		 * 'set' option, and also the data fed to it is the result from mData.
		 * This is the rendering method to match the data method of mData.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mRender": null,
	
		/**
		 * Unique header TH/TD element for this column - this is what the sorting
		 * listener is attached to (if sorting is enabled.)
		 *  @type node
		 *  @default null
		 */
		"nTh": null,
	
		/**
		 * Unique footer TH/TD element for this column (if there is one). Not used
		 * in DataTables as such, but can be used for plug-ins to reference the
		 * footer for each column.
		 *  @type node
		 *  @default null
		 */
		"nTf": null,
	
		/**
		 * The class to apply to all TD elements in the table's TBODY for the column
		 *  @type string
		 *  @default null
		 */
		"sClass": null,
	
		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 *  @type string
		 */
		"sContentPadding": null,
	
		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because mData
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 */
		"sDefaultContent": null,
	
		/**
		 * Name for the column, allowing reference to the column by name as well as
		 * by index (needs a lookup to work by name).
		 *  @type string
		 */
		"sName": null,
	
		/**
		 * Custom sorting data type - defines which of the available plug-ins in
		 * afnSortData the custom sorting will use - if any is defined.
		 *  @type string
		 *  @default std
		 */
		"sSortDataType": 'std',
	
		/**
		 * Class to be applied to the header element when sorting on this column
		 *  @type string
		 *  @default null
		 */
		"sSortingClass": null,
	
		/**
		 * Class to be applied to the header element when sorting on this column -
		 * when jQuery UI theming is used.
		 *  @type string
		 *  @default null
		 */
		"sSortingClassJUI": null,
	
		/**
		 * Title of the column - what is seen in the TH element (nTh).
		 *  @type string
		 */
		"sTitle": null,
	
		/**
		 * Column sorting and filtering type
		 *  @type string
		 *  @default null
		 */
		"sType": null,
	
		/**
		 * Width of the column
		 *  @type string
		 *  @default null
		 */
		"sWidth": null,
	
		/**
		 * Width of the column when it was first "encountered"
		 *  @type string
		 *  @default null
		 */
		"sWidthOrig": null
	};
	
	
	/*
	 * Developer note: The properties of the object below are given in Hungarian
	 * notation, that was used as the interface for DataTables prior to v1.10, however
	 * from v1.10 onwards the primary interface is camel case. In order to avoid
	 * breaking backwards compatibility utterly with this change, the Hungarian
	 * version is still, internally the primary interface, but is is not documented
	 * - hence the @name tags in each doc comment. This allows a Javascript function
	 * to create a map from Hungarian notation to camel case (going the other direction
	 * would require each property to be listed, which would add around 3K to the size
	 * of DataTables, while this method is about a 0.5K hit).
	 *
	 * Ultimately this does pave the way for Hungarian notation to be dropped
	 * completely, but that is a massive amount of work and will break current
	 * installs (therefore is on-hold until v2).
	 */
	
	/**
	 * Initialisation options that can be given to DataTables at initialisation
	 * time.
	 *  @namespace
	 */
	DataTable.defaults = {
		/**
		 * An array of data to use for the table, passed in at initialisation which
		 * will be used in preference to any data which is already in the DOM. This is
		 * particularly useful for constructing tables purely in Javascript, for
		 * example with a custom Ajax call.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.data
		 *
		 *  @example
		 *    // Using a 2D array data source
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          ['Trident', 'Internet Explorer 4.0', 'Win 95+', 4, 'X'],
		 *          ['Trident', 'Internet Explorer 5.0', 'Win 95+', 5, 'C'],
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine" },
		 *          { "title": "Browser" },
		 *          { "title": "Platform" },
		 *          { "title": "Version" },
		 *          { "title": "Grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using an array of objects as a data source (`data`)
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 4.0",
		 *            "platform": "Win 95+",
		 *            "version":  4,
		 *            "grade":    "X"
		 *          },
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 5.0",
		 *            "platform": "Win 95+",
		 *            "version":  5,
		 *            "grade":    "C"
		 *          }
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine",   "data": "engine" },
		 *          { "title": "Browser",  "data": "browser" },
		 *          { "title": "Platform", "data": "platform" },
		 *          { "title": "Version",  "data": "version" },
		 *          { "title": "Grade",    "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"aaData": null,
	
	
		/**
		 * If ordering is enabled, then DataTables will perform a first pass sort on
		 * initialisation. You can define which column(s) the sort is performed
		 * upon, and the sorting direction, with this variable. The `sorting` array
		 * should contain an array for each column to be sorted initially containing
		 * the column's index and a direction string ('asc' or 'desc').
		 *  @type array
		 *  @default [[0,'asc']]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.order
		 *
		 *  @example
		 *    // Sort by 3rd column first, and then 4th column
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": [[2,'asc'], [3,'desc']]
		 *      } );
		 *    } );
		 *
		 *    // No initial sorting
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": []
		 *      } );
		 *    } );
		 */
		"aaSorting": [[0,'asc']],
	
	
		/**
		 * This parameter is basically identical to the `sorting` parameter, but
		 * cannot be overridden by user interaction with the table. What this means
		 * is that you could have a column (visible or hidden) which the sorting
		 * will always be forced on first - any sorting after that (from the user)
		 * will then be performed as required. This can be useful for grouping rows
		 * together.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.orderFixed
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderFixed": [[0,'asc']]
		 *      } );
		 *    } )
		 */
		"aaSortingFixed": [],
	
	
		/**
		 * DataTables can be instructed to load data to display in the table from a
		 * Ajax source. This option defines how that Ajax call is made and where to.
		 *
		 * The `ajax` property has three different modes of operation, depending on
		 * how it is defined. These are:
		 *
		 * * `string` - Set the URL from where the data should be loaded from.
		 * * `object` - Define properties for `jQuery.ajax`.
		 * * `function` - Custom data get function
		 *
		 * `string`
		 * --------
		 *
		 * As a string, the `ajax` property simply defines the URL from which
		 * DataTables will load data.
		 *
		 * `object`
		 * --------
		 *
		 * As an object, the parameters in the object are passed to
		 * [jQuery.ajax](http://api.jquery.com/jQuery.ajax/) allowing fine control
		 * of the Ajax request. DataTables has a number of default parameters which
		 * you can override using this option. Please refer to the jQuery
		 * documentation for a full description of the options available, although
		 * the following parameters provide additional options in DataTables or
		 * require special consideration:
		 *
		 * * `data` - As with jQuery, `data` can be provided as an object, but it
		 *   can also be used as a function to manipulate the data DataTables sends
		 *   to the server. The function takes a single parameter, an object of
		 *   parameters with the values that DataTables has readied for sending. An
		 *   object may be returned which will be merged into the DataTables
		 *   defaults, or you can add the items to the object that was passed in and
		 *   not return anything from the function. This supersedes `fnServerParams`
		 *   from DataTables 1.9-.
		 *
		 * * `dataSrc` - By default DataTables will look for the property `data` (or
		 *   `aaData` for compatibility with DataTables 1.9-) when obtaining data
		 *   from an Ajax source or for server-side processing - this parameter
		 *   allows that property to be changed. You can use Javascript dotted
		 *   object notation to get a data source for multiple levels of nesting, or
		 *   it my be used as a function. As a function it takes a single parameter,
		 *   the JSON returned from the server, which can be manipulated as
		 *   required, with the returned value being that used by DataTables as the
		 *   data source for the table. This supersedes `sAjaxDataProp` from
		 *   DataTables 1.9-.
		 *
		 * * `success` - Should not be overridden it is used internally in
		 *   DataTables. To manipulate / transform the data returned by the server
		 *   use `ajax.dataSrc`, or use `ajax` as a function (see below).
		 *
		 * `function`
		 * ----------
		 *
		 * As a function, making the Ajax call is left up to yourself allowing
		 * complete control of the Ajax request. Indeed, if desired, a method other
		 * than Ajax could be used to obtain the required data, such as Web storage
		 * or an AIR database.
		 *
		 * The function is given four parameters and no return is required. The
		 * parameters are:
		 *
		 * 1. _object_ - Data to send to the server
		 * 2. _function_ - Callback function that must be executed when the required
		 *    data has been obtained. That data should be passed into the callback
		 *    as the only parameter
		 * 3. _object_ - DataTables settings object for the table
		 *
		 * Note that this supersedes `fnServerData` from DataTables 1.9-.
		 *
		 *  @type string|object|function
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.ajax
		 *  @since 1.10.0
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax.
		 *   // Note DataTables expects data in the form `{ data: [ ...data... ] }` by default).
		 *   $('#example').dataTable( {
		 *     "ajax": "data.json"
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to change
		 *   // `data` to `tableData` (i.e. `{ tableData: [ ...data... ] }`)
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": "tableData"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to read data
		 *   // from a plain array rather than an array in an object
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": ""
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Manipulate the data returned from the server - add a link to data
		 *   // (note this can, should, be done using `render` for the column - this
		 *   // is just a simple example of how the data can be manipulated).
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": function ( json ) {
		 *         for ( var i=0, ien=json.length ; i<ien ; i++ ) {
		 *           json[i][0] = '<a href="/message/'+json[i][0]+'>View message</a>';
		 *         }
		 *         return json;
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Add data to the request
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "data": function ( d ) {
		 *         return {
		 *           "extra_search": $('#extra').val()
		 *         };
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Send request as POST
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "type": "POST"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get the data from localStorage (could interface with a form for
		 *   // adding, editing and removing rows).
		 *   $('#example').dataTable( {
		 *     "ajax": function (data, callback, settings) {
		 *       callback(
		 *         JSON.parse( localStorage.getItem('dataTablesData') )
		 *       );
		 *     }
		 *   } );
		 */
		"ajax": null,
	
	
		/**
		 * This parameter allows you to readily specify the entries in the length drop
		 * down menu that DataTables shows when pagination is enabled. It can be
		 * either a 1D array of options which will be used for both the displayed
		 * option and the value, or a 2D array which will use the array in the first
		 * position as the value, and the array in the second position as the
		 * displayed options (useful for language strings such as 'All').
		 *
		 * Note that the `pageLength` property will be automatically set to the
		 * first value given in this array, unless `pageLength` is also provided.
		 *  @type array
		 *  @default [ 10, 25, 50, 100 ]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.lengthMenu
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
		 *      } );
		 *    } );
		 */
		"aLengthMenu": [ 10, 25, 50, 100 ],
	
	
		/**
		 * The `columns` option in the initialisation parameter allows you to define
		 * details about the way individual columns behave. For a full list of
		 * column options that can be set, please see
		 * {@link DataTable.defaults.column}. Note that if you use `columns` to
		 * define your columns, you must have an entry in the array for every single
		 * column that you have in your table (these can be null if you don't which
		 * to specify any options).
		 *  @member
		 *
		 *  @name DataTable.defaults.column
		 */
		"aoColumns": null,
	
		/**
		 * Very similar to `columns`, `columnDefs` allows you to target a specific
		 * column, multiple columns, or all columns, using the `targets` property of
		 * each object in the array. This allows great flexibility when creating
		 * tables, as the `columnDefs` arrays can be of any length, targeting the
		 * columns you specifically want. `columnDefs` may use any of the column
		 * options available: {@link DataTable.defaults.column}, but it _must_
		 * have `targets` defined in each object in the array. Values in the `targets`
		 * array may be:
		 *   <ul>
		 *     <li>a string - class name will be matched on the TH for the column</li>
		 *     <li>0 or a positive integer - column index counting from the left</li>
		 *     <li>a negative integer - column index counting from the right</li>
		 *     <li>the string "_all" - all columns (i.e. assign a default)</li>
		 *   </ul>
		 *  @member
		 *
		 *  @name DataTable.defaults.columnDefs
		 */
		"aoColumnDefs": null,
	
	
		/**
		 * Basically the same as `search`, this parameter defines the individual column
		 * filtering state at initialisation time. The array must be of the same size
		 * as the number of columns, and each element be an object with the parameters
		 * `search` and `escapeRegex` (the latter is optional). 'null' is also
		 * accepted and the default will be used.
		 *  @type array
		 *  @default []
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.searchCols
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchCols": [
		 *          null,
		 *          { "search": "My filter" },
		 *          null,
		 *          { "search": "^[0-9]", "escapeRegex": false }
		 *        ]
		 *      } );
		 *    } )
		 */
		"aoSearchCols": [],
	
	
		/**
		 * An array of CSS classes that should be applied to displayed rows. This
		 * array may be of any length, and DataTables will apply each class
		 * sequentially, looping when required.
		 *  @type array
		 *  @default null <i>Will take the values determined by the `oClasses.stripe*`
		 *    options</i>
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.stripeClasses
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stripeClasses": [ 'strip1', 'strip2', 'strip3' ]
		 *      } );
		 *    } )
		 */
		"asStripeClasses": null,
	
	
		/**
		 * Enable or disable automatic column width calculation. This can be disabled
		 * as an optimisation (it takes some time to calculate the widths) if the
		 * tables widths are passed in using `columns`.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.autoWidth
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "autoWidth": false
		 *      } );
		 *    } );
		 */
		"bAutoWidth": true,
	
	
		/**
		 * Deferred rendering can provide DataTables with a huge speed boost when you
		 * are using an Ajax or JS data source for the table. This option, when set to
		 * true, will cause DataTables to defer the creation of the table elements for
		 * each row until they are needed for a draw - saving a significant amount of
		 * time.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.deferRender
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajax": "sources/arrays.txt",
		 *        "deferRender": true
		 *      } );
		 *    } );
		 */
		"bDeferRender": false,
	
	
		/**
		 * Replace a DataTable which matches the given selector and replace it with
		 * one which has the properties of the new initialisation object passed. If no
		 * table matches the selector, then the new DataTable will be constructed as
		 * per normal.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.destroy
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "srollY": "200px",
		 *        "paginate": false
		 *      } );
		 *
		 *      // Some time later....
		 *      $('#example').dataTable( {
		 *        "filter": false,
		 *        "destroy": true
		 *      } );
		 *    } );
		 */
		"bDestroy": false,
	
	
		/**
		 * Enable or disable filtering of data. Filtering in DataTables is "smart" in
		 * that it allows the end user to input multiple words (space separated) and
		 * will match a row containing those words, even if not in the order that was
		 * specified (this allow matching across multiple columns). Note that if you
		 * wish to use filtering in DataTables this must remain 'true' - to remove the
		 * default filtering input box and retain filtering abilities, please use
		 * {@link DataTable.defaults.dom}.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.searching
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "searching": false
		 *      } );
		 *    } );
		 */
		"bFilter": true,
	
	
		/**
		 * Enable or disable the table information display. This shows information
		 * about the data that is currently visible on the page, including information
		 * about filtered data if that action is being performed.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.info
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "info": false
		 *      } );
		 *    } );
		 */
		"bInfo": true,
	
	
		/**
		 * Allows the end user to select the size of a formatted page from a select
		 * menu (sizes are 10, 25, 50 and 100). Requires pagination (`paginate`).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.lengthChange
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "lengthChange": false
		 *      } );
		 *    } );
		 */
		"bLengthChange": true,
	
	
		/**
		 * Enable or disable pagination.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.paging
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "paging": false
		 *      } );
		 *    } );
		 */
		"bPaginate": true,
	
	
		/**
		 * Enable or disable the display of a 'processing' indicator when the table is
		 * being processed (e.g. a sort). This is particularly useful for tables with
		 * large amounts of data where it can take a noticeable amount of time to sort
		 * the entries.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.processing
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "processing": true
		 *      } );
		 *    } );
		 */
		"bProcessing": false,
	
	
		/**
		 * Retrieve the DataTables object for the given selector. Note that if the
		 * table has already been initialised, this parameter will cause DataTables
		 * to simply return the object that has already been set up - it will not take
		 * account of any changes you might have made to the initialisation object
		 * passed to DataTables (setting this parameter to true is an acknowledgement
		 * that you understand this). `destroy` can be used to reinitialise a table if
		 * you need.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.retrieve
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      initTable();
		 *      tableActions();
		 *    } );
		 *
		 *    function initTable ()
		 *    {
		 *      return $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false,
		 *        "retrieve": true
		 *      } );
		 *    }
		 *
		 *    function tableActions ()
		 *    {
		 *      var table = initTable();
		 *      // perform API operations with oTable
		 *    }
		 */
		"bRetrieve": false,
	
	
		/**
		 * When vertical (y) scrolling is enabled, DataTables will force the height of
		 * the table's viewport to the given height at all times (useful for layout).
		 * However, this can look odd when filtering data down to a small data set,
		 * and the footer is left "floating" further down. This parameter (when
		 * enabled) will cause DataTables to collapse the table's viewport down when
		 * the result set will fit within the given Y height.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollCollapse
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200",
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"bScrollCollapse": false,
	
	
		/**
		 * Configure DataTables to use server-side processing. Note that the
		 * `ajax` parameter must also be given in order to give DataTables a
		 * source to obtain the required data for each draw.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverSide
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "xhr.php"
		 *      } );
		 *    } );
		 */
		"bServerSide": false,
	
	
		/**
		 * Enable or disable sorting of columns. Sorting of individual columns can be
		 * disabled by the `sortable` option for each column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.ordering
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "ordering": false
		 *      } );
		 *    } );
		 */
		"bSort": true,
	
	
		/**
		 * Enable or display DataTables' ability to sort multiple columns at the
		 * same time (activated by shift-click by the user).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderMulti
		 *
		 *  @example
		 *    // Disable multiple column sorting ability
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderMulti": false
		 *      } );
		 *    } );
		 */
		"bSortMulti": true,
	
	
		/**
		 * Allows control over whether DataTables should use the top (true) unique
		 * cell that is found for a single column, or the bottom (false - default).
		 * This is useful when using complex headers.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderCellsTop
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderCellsTop": true
		 *      } );
		 *    } );
		 */
		"bSortCellsTop": false,
	
	
		/**
		 * Enable or disable the addition of the classes `sorting\_1`, `sorting\_2` and
		 * `sorting\_3` to the columns which are currently being sorted on. This is
		 * presented as a feature switch as it can increase processing time (while
		 * classes are removed and added) so for large data sets you might want to
		 * turn this off.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.orderClasses
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderClasses": false
		 *      } );
		 *    } );
		 */
		"bSortClasses": true,
	
	
		/**
		 * Enable or disable state saving. When enabled HTML5 `localStorage` will be
		 * used to save table display information such as pagination information,
		 * display length, filtering and sorting. As such when the end user reloads
		 * the page the display display will match what thy had previously set up.
		 *
		 * Due to the use of `localStorage` the default state saving is not supported
		 * in IE6 or 7. If state saving is required in those browsers, use
		 * `stateSaveCallback` to provide a storage solution such as cookies.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.stateSave
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "stateSave": true
		 *      } );
		 *    } );
		 */
		"bStateSave": false,
	
	
		/**
		 * This function is called when a TR element is created (and all TD child
		 * elements have been inserted), or registered if using a DOM source, allowing
		 * manipulation of the TR element (adding classes etc).
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} dataIndex The index of this row in the internal aoData array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.createdRow
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "createdRow": function( row, data, dataIndex ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" )
		 *          {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnCreatedRow": null,
	
	
		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify any aspect you want about the created DOM.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.drawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "drawCallback": function( settings ) {
		 *          alert( 'DataTables has redrawn the table' );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnDrawCallback": null,
	
	
		/**
		 * Identical to fnHeaderCallback() but for the table footer this function
		 * allows you to modify the table footer on every 'draw' event.
		 *  @type function
		 *  @param {node} foot "TR" element for the footer
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.footerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "footerCallback": function( tfoot, data, start, end, display ) {
		 *          tfoot.getElementsByTagName('th')[0].innerHTML = "Starting index is "+start;
		 *        }
		 *      } );
		 *    } )
		 */
		"fnFooterCallback": null,
	
	
		/**
		 * When rendering large numbers in the information element for the table
		 * (i.e. "Showing 1 to 10 of 57 entries") DataTables will render large numbers
		 * to have a comma separator for the 'thousands' units (e.g. 1 million is
		 * rendered as "1,000,000") to help readability for the end user. This
		 * function will override the default method DataTables uses.
		 *  @type function
		 *  @member
		 *  @param {int} toFormat number to be formatted
		 *  @returns {string} formatted string for DataTables to show the number
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.formatNumber
		 *
		 *  @example
		 *    // Format a number using a single quote for the separator (note that
		 *    // this can also be done with the language.thousands option)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "formatNumber": function ( toFormat ) {
		 *          return toFormat.toString().replace(
		 *            /\B(?=(\d{3})+(?!\d))/g, "'"
		 *          );
		 *        };
		 *      } );
		 *    } );
		 */
		"fnFormatNumber": function ( toFormat ) {
			return toFormat.toString().replace(
				/\B(?=(\d{3})+(?!\d))/g,
				this.oLanguage.sThousands
			);
		},
	
	
		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify the header row. This can be used to calculate and
		 * display useful information about the table.
		 *  @type function
		 *  @param {node} head "TR" element for the header
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.headerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "fheaderCallback": function( head, data, start, end, display ) {
		 *          head.getElementsByTagName('th')[0].innerHTML = "Displaying "+(end-start)+" records";
		 *        }
		 *      } );
		 *    } )
		 */
		"fnHeaderCallback": null,
	
	
		/**
		 * The information element can be used to convey information about the current
		 * state of the table. Although the internationalisation options presented by
		 * DataTables are quite capable of dealing with most customisations, there may
		 * be times where you wish to customise the string further. This callback
		 * allows you to do exactly that.
		 *  @type function
		 *  @param {object} oSettings DataTables settings object
		 *  @param {int} start Starting position in data for the draw
		 *  @param {int} end End position in data for the draw
		 *  @param {int} max Total number of rows in the table (regardless of
		 *    filtering)
		 *  @param {int} total Total number of rows in the data set, after filtering
		 *  @param {string} pre The string that DataTables has formatted using it's
		 *    own rules
		 *  @returns {string} The string to be displayed in the information element.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.infoCallback
		 *
		 *  @example
		 *    $('#example').dataTable( {
		 *      "infoCallback": function( settings, start, end, max, total, pre ) {
		 *        return start +" to "+ end;
		 *      }
		 *    } );
		 */
		"fnInfoCallback": null,
	
	
		/**
		 * Called when the table has been initialised. Normally DataTables will
		 * initialise sequentially and there will be no need for this function,
		 * however, this does not hold true when using external language information
		 * since that is obtained using an async XHR call.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} json The JSON object request from the server - only
		 *    present if client-side Ajax sourced data is used
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.initComplete
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "initComplete": function(settings, json) {
		 *          alert( 'DataTables has finished its initialisation.' );
		 *        }
		 *      } );
		 *    } )
		 */
		"fnInitComplete": null,
	
	
		/**
		 * Called at the very start of each table draw and can be used to cancel the
		 * draw by returning false, any other return (including undefined) results in
		 * the full draw occurring).
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @returns {boolean} False will cancel the draw, anything else (including no
		 *    return) will allow it to complete.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.preDrawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "preDrawCallback": function( settings ) {
		 *          if ( $('#test').val() == 1 ) {
		 *            return false;
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnPreDrawCallback": null,
	
	
		/**
		 * This function allows you to 'post process' each row after it have been
		 * generated for each table draw, but before it is rendered on screen. This
		 * function might be used for setting the row class name etc.
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} displayIndex The display index for the current table draw
		 *  @param {int} displayIndexFull The index of the data in the full list of
		 *    rows (after filtering)
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.rowCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "rowCallback": function( row, data, displayIndex, displayIndexFull ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" ) {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnRowCallback": null,
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * This parameter allows you to override the default function which obtains
		 * the data from the server so something more suitable for your application.
		 * For example you could use POST data, or pull information from a Gears or
		 * AIR database.
		 *  @type function
		 *  @member
		 *  @param {string} source HTTP source to obtain the data from (`ajax`)
		 *  @param {array} data A key/value pair object containing the data to send
		 *    to the server
		 *  @param {function} callback to be called on completion of the data get
		 *    process that will draw the data on the page.
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverData
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerData": null,
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 *  It is often useful to send extra data to the server when making an Ajax
		 * request - for example custom filtering information, and this callback
		 * function makes it trivial to send extra information to the server. The
		 * passed in parameter is the data set that has been constructed by
		 * DataTables, and you can add to this or modify it as you require.
		 *  @type function
		 *  @param {array} data Data array (array of objects which are name/value
		 *    pairs) that has been constructed by DataTables and will be sent to the
		 *    server. In the case of Ajax sourced data with server-side processing
		 *    this will be an empty array, for server-side processing there will be a
		 *    significant number of parameters!
		 *  @returns {undefined} Ensure that you modify the data array passed in,
		 *    as this is passed by reference.
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverParams
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerParams": null,
	
	
		/**
		 * Load the table state. With this function you can define from where, and how, the
		 * state of a table is loaded. By default DataTables will load from `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} callback Callback that can be executed when done. It
		 *    should be passed the loaded state object.
		 *  @return {object} The DataTables state object to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadCallback": function (settings, callback) {
		 *          $.ajax( {
		 *            "url": "/state_load",
		 *            "dataType": "json",
		 *            "success": function (json) {
		 *              callback( json );
		 *            }
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadCallback": function ( settings ) {
			try {
				return JSON.parse(
					(settings.iStateDuration === -1 ? sessionStorage : localStorage).getItem(
						'DataTables_'+settings.sInstance+'_'+location.pathname
					)
				);
			} catch (e) {
				return {};
			}
		},
	
	
		/**
		 * Callback which allows modification of the saved state prior to loading that state.
		 * This callback is called when the table is loading state from the stored data, but
		 * prior to the settings object being modified by the saved state. Note that for
		 * plug-in authors, you should use the `stateLoadParams` event to load parameters for
		 * a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that is to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never loaded
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Disallow state loading by returning false
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          return false;
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadParams": null,
	
	
		/**
		 * Callback that is called when the state has been loaded from the state saving method
		 * and the DataTables settings object has been modified as a result of the loaded state.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that was loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoaded
		 *
		 *  @example
		 *    // Show an alert with the filtering value that was saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoaded": function (settings, data) {
		 *          alert( 'Saved filter was: '+data.oSearch.sSearch );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoaded": null,
	
	
		/**
		 * Save the table state. This function allows you to define where and how the state
		 * information for the table is stored By default DataTables will use `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveCallback": function (settings, data) {
		 *          // Send an Ajax request to the server with the state object
		 *          $.ajax( {
		 *            "url": "/state_save",
		 *            "data": data,
		 *            "dataType": "json",
		 *            "method": "POST"
		 *            "success": function () {}
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveCallback": function ( settings, data ) {
			try {
				(settings.iStateDuration === -1 ? sessionStorage : localStorage).setItem(
					'DataTables_'+settings.sInstance+'_'+location.pathname,
					JSON.stringify( data )
				);
			} catch (e) {}
		},
	
	
		/**
		 * Callback which allows modification of the state to be saved. Called when the table
		 * has changed state a new state save is required. This method allows modification of
		 * the state saving object prior to actually doing the save, including addition or
		 * other state properties or modification. Note that for plug-in authors, you should
		 * use the `stateSaveParams` event to save parameters for a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveParams": null,
	
	
		/**
		 * Duration for which the saved state information is considered valid. After this period
		 * has elapsed the state will be returned to the default.
		 * Value is given in seconds.
		 *  @type int
		 *  @default 7200 <i>(2 hours)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.stateDuration
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateDuration": 60*60*24; // 1 day
		 *      } );
		 *    } )
		 */
		"iStateDuration": 7200,
	
	
		/**
		 * When enabled DataTables will not make a request to the server for the first
		 * page draw - rather it will use the data already on the page (no sorting etc
		 * will be applied to it), thus saving on an XHR at load time. `deferLoading`
		 * is used to indicate that deferred loading is required, but it is also used
		 * to tell DataTables how many records there are in the full table (allowing
		 * the information element and pagination to be displayed correctly). In the case
		 * where a filtering is applied to the table on initial load, this can be
		 * indicated by giving the parameter as an array, where the first element is
		 * the number of records available after filtering and the second element is the
		 * number of records without filtering (allowing the table information element
		 * to be shown correctly).
		 *  @type int | array
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.deferLoading
		 *
		 *  @example
		 *    // 57 records available in the table, no filtering applied
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": 57
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // 57 records after filtering, 100 without filtering (an initial filter applied)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": [ 57, 100 ],
		 *        "search": {
		 *          "search": "my_filter"
		 *        }
		 *      } );
		 *    } );
		 */
		"iDeferLoading": null,
	
	
		/**
		 * Number of rows to display on a single page when using pagination. If
		 * feature enabled (`lengthChange`) then the end user will be able to override
		 * this to a custom setting using a pop-up menu.
		 *  @type int
		 *  @default 10
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pageLength
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pageLength": 50
		 *      } );
		 *    } )
		 */
		"iDisplayLength": 10,
	
	
		/**
		 * Define the starting point for data display when using DataTables with
		 * pagination. Note that this parameter is the number of records, rather than
		 * the page number, so if you have 10 records per page and want to start on
		 * the third page, it should be "20".
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.displayStart
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "displayStart": 20
		 *      } );
		 *    } )
		 */
		"iDisplayStart": 0,
	
	
		/**
		 * By default DataTables allows keyboard navigation of the table (sorting, paging,
		 * and filtering) by adding a `tabindex` attribute to the required elements. This
		 * allows you to tab through the controls and press the enter key to activate them.
		 * The tabindex is default 0, meaning that the tab follows the flow of the document.
		 * You can overrule this using this parameter if you wish. Use a value of -1 to
		 * disable built-in keyboard navigation.
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.tabIndex
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "tabIndex": 1
		 *      } );
		 *    } );
		 */
		"iTabIndex": 0,
	
	
		/**
		 * Classes that DataTables assigns to the various components and features
		 * that it adds to the HTML table. This allows classes to be configured
		 * during initialisation in addition to through the static
		 * {@link DataTable.ext.oStdClasses} object).
		 *  @namespace
		 *  @name DataTable.defaults.classes
		 */
		"oClasses": {},
	
	
		/**
		 * All strings that DataTables uses in the user interface that it creates
		 * are defined in this object, allowing you to modified them individually or
		 * completely replace them all as required.
		 *  @namespace
		 *  @name DataTable.defaults.language
		 */
		"oLanguage": {
			/**
			 * Strings that are used for WAI-ARIA labels and controls only (these are not
			 * actually visible on the page, but will be read by screenreaders, and thus
			 * must be internationalised as well).
			 *  @namespace
			 *  @name DataTable.defaults.language.aria
			 */
			"oAria": {
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted ascending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortAscending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortAscending": " - click/return to sort ascending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortAscending": ": activate to sort column ascending",
	
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted descending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortDescending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortDescending": " - click/return to sort descending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortDescending": ": activate to sort column descending"
			},
	
			/**
			 * Pagination string used by DataTables for the built-in pagination
			 * control types.
			 *  @namespace
			 *  @name DataTable.defaults.language.paginate
			 */
			"oPaginate": {
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the first page.
				 *  @type string
				 *  @default First
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.first
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "first": "First page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sFirst": "First",
	
	
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the last page.
				 *  @type string
				 *  @default Last
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.last
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "last": "Last page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sLast": "Last",
	
	
				/**
				 * Text to use for the 'next' pagination button (to take the user to the
				 * next page).
				 *  @type string
				 *  @default Next
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.next
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "next": "Next page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sNext": "Next",
	
	
				/**
				 * Text to use for the 'previous' pagination button (to take the user to
				 * the previous page).
				 *  @type string
				 *  @default Previous
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.previous
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "previous": "Previous page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sPrevious": "Previous"
			},
	
			/**
			 * This string is shown in preference to `zeroRecords` when the table is
			 * empty of data (regardless of filtering). Note that this is an optional
			 * parameter - if it is not given, the value of `zeroRecords` will be used
			 * instead (either the default or given value).
			 *  @type string
			 *  @default No data available in table
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.emptyTable
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "emptyTable": "No data available in table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sEmptyTable": "No data available in table",
	
	
			/**
			 * This string gives information to the end user about the information
			 * that is current on display on the page. The following tokens can be
			 * used in the string and will be dynamically replaced as the table
			 * display updates. This tokens can be placed anywhere in the string, or
			 * removed as needed by the language requires:
			 *
			 * * `\_START\_` - Display index of the first record on the current page
			 * * `\_END\_` - Display index of the last record on the current page
			 * * `\_TOTAL\_` - Number of records in the table after filtering
			 * * `\_MAX\_` - Number of records in the table without filtering
			 * * `\_PAGE\_` - Current page number
			 * * `\_PAGES\_` - Total number of pages of data in the table
			 *
			 *  @type string
			 *  @default Showing _START_ to _END_ of _TOTAL_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.info
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "info": "Showing page _PAGE_ of _PAGES_"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
	
	
			/**
			 * Display information string for when the table is empty. Typically the
			 * format of this string should match `info`.
			 *  @type string
			 *  @default Showing 0 to 0 of 0 entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoEmpty
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoEmpty": "No entries to show"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoEmpty": "Showing 0 to 0 of 0 entries",
	
	
			/**
			 * When a user filters the information in a table, this string is appended
			 * to the information (`info`) to give an idea of how strong the filtering
			 * is. The variable _MAX_ is dynamically updated.
			 *  @type string
			 *  @default (filtered from _MAX_ total entries)
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoFiltered
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoFiltered": " - filtering from _MAX_ records"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoFiltered": "(filtered from _MAX_ total entries)",
	
	
			/**
			 * If can be useful to append extra information to the info string at times,
			 * and this variable does exactly that. This information will be appended to
			 * the `info` (`infoEmpty` and `infoFiltered` in whatever combination they are
			 * being used) at all times.
			 *  @type string
			 *  @default <i>Empty string</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoPostFix
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoPostFix": "All records shown are derived from real information."
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoPostFix": "",
	
	
			/**
			 * This decimal place operator is a little different from the other
			 * language options since DataTables doesn't output floating point
			 * numbers, so it won't ever use this for display of a number. Rather,
			 * what this parameter does is modify the sort methods of the table so
			 * that numbers which are in a format which has a character other than
			 * a period (`.`) as a decimal place will be sorted numerically.
			 *
			 * Note that numbers with different decimal places cannot be shown in
			 * the same table and still be sortable, the table must be consistent.
			 * However, multiple different tables on the page can use different
			 * decimal place characters.
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.decimal
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "decimal": ","
			 *          "thousands": "."
			 *        }
			 *      } );
			 *    } );
			 */
			"sDecimal": "",
	
	
			/**
			 * DataTables has a build in number formatter (`formatNumber`) which is
			 * used to format large numbers that are used in the table information.
			 * By default a comma is used, but this can be trivially changed to any
			 * character you wish with this parameter.
			 *  @type string
			 *  @default ,
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.thousands
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "thousands": "'"
			 *        }
			 *      } );
			 *    } );
			 */
			"sThousands": ",",
	
	
			/**
			 * Detail the action that will be taken when the drop down menu for the
			 * pagination length option is changed. The '_MENU_' variable is replaced
			 * with a default select list of 10, 25, 50 and 100, and can be replaced
			 * with a custom select box if required.
			 *  @type string
			 *  @default Show _MENU_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.lengthMenu
			 *
			 *  @example
			 *    // Language change only
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": "Display _MENU_ records"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Language and options change
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": 'Display <select>'+
			 *            '<option value="10">10</option>'+
			 *            '<option value="20">20</option>'+
			 *            '<option value="30">30</option>'+
			 *            '<option value="40">40</option>'+
			 *            '<option value="50">50</option>'+
			 *            '<option value="-1">All</option>'+
			 *            '</select> records'
			 *        }
			 *      } );
			 *    } );
			 */
			"sLengthMenu": "Show _MENU_ entries",
	
	
			/**
			 * When using Ajax sourced data and during the first draw when DataTables is
			 * gathering the data, this message is shown in an empty row in the table to
			 * indicate to the end user the the data is being loaded. Note that this
			 * parameter is not used when loading data by server-side processing, just
			 * Ajax sourced data with client-side processing.
			 *  @type string
			 *  @default Loading...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.loadingRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "loadingRecords": "Please wait - loading..."
			 *        }
			 *      } );
			 *    } );
			 */
			"sLoadingRecords": "Loading...",
	
	
			/**
			 * Text which is displayed when the table is processing a user action
			 * (usually a sort command or similar).
			 *  @type string
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.processing
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "processing": "DataTables is currently busy"
			 *        }
			 *      } );
			 *    } );
			 */
			"sProcessing": "",
	
	
			/**
			 * Details the actions that will be taken when the user types into the
			 * filtering input text box. The variable "_INPUT_", if used in the string,
			 * is replaced with the HTML text box for the filtering input allowing
			 * control over where it appears in the string. If "_INPUT_" is not given
			 * then the input box is appended to the string automatically.
			 *  @type string
			 *  @default Search:
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.search
			 *
			 *  @example
			 *    // Input text box will be appended at the end automatically
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Filter records:"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Specify where the filter should appear
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Apply filter _INPUT_ to table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sSearch": "Search:",
	
	
			/**
			 * Assign a `placeholder` attribute to the search `input` element
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.searchPlaceholder
			 */
			"sSearchPlaceholder": "",
	
	
			/**
			 * All of the language information can be stored in a file on the
			 * server-side, which DataTables will look up if this parameter is passed.
			 * It must store the URL of the language file, which is in a JSON format,
			 * and the object has the same properties as the oLanguage object in the
			 * initialiser object (i.e. the above parameters). Please refer to one of
			 * the example language files to see how this works in action.
			 *  @type string
			 *  @default <i>Empty string - i.e. disabled</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.url
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "url": "http://www.sprymedia.co.uk/dataTables/lang.txt"
			 *        }
			 *      } );
			 *    } );
			 */
			"sUrl": "",
	
	
			/**
			 * Text shown inside the table records when the is no information to be
			 * displayed after filtering. `emptyTable` is shown when there is simply no
			 * information in the table at all (regardless of filtering).
			 *  @type string
			 *  @default No matching records found
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.zeroRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "zeroRecords": "No records to display"
			 *        }
			 *      } );
			 *    } );
			 */
			"sZeroRecords": "No matching records found"
		},
	
	
		/**
		 * This parameter allows you to have define the global filtering state at
		 * initialisation time. As an object the `search` parameter must be
		 * defined, but all other parameters are optional. When `regex` is true,
		 * the search string will be treated as a regular expression, when false
		 * (default) it will be treated as a straight string. When `smart`
		 * DataTables will use it's smart filtering methods (to word match at
		 * any point in the data), when false this will not be done.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.search
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "search": {"search": "Initial search"}
		 *      } );
		 *    } )
		 */
		"oSearch": $.extend( {}, DataTable.models.oSearch ),
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * By default DataTables will look for the property `data` (or `aaData` for
		 * compatibility with DataTables 1.9-) when obtaining data from an Ajax
		 * source or for server-side processing - this parameter allows that
		 * property to be changed. You can use Javascript dotted object notation to
		 * get a data source for multiple levels of nesting.
		 *  @type string
		 *  @default data
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxDataProp
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxDataProp": "data",
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * You can instruct DataTables to load data from an external
		 * source using this parameter (use aData if you want to pass data in you
		 * already have). Simply provide a url a JSON object can be obtained from.
		 *  @type string
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxSource
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxSource": null,
	
	
		/**
		 * This initialisation variable allows you to specify exactly where in the
		 * DOM you want DataTables to inject the various controls it adds to the page
		 * (for example you might want the pagination controls at the top of the
		 * table). DIV elements (with or without a custom class) can also be added to
		 * aid styling. The follow syntax is used:
		 *   <ul>
		 *     <li>The following options are allowed:
		 *       <ul>
		 *         <li>'l' - Length changing</li>
		 *         <li>'f' - Filtering input</li>
		 *         <li>'t' - The table!</li>
		 *         <li>'i' - Information</li>
		 *         <li>'p' - Pagination</li>
		 *         <li>'r' - pRocessing</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following constants are allowed:
		 *       <ul>
		 *         <li>'H' - jQueryUI theme "header" classes ('fg-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix')</li>
		 *         <li>'F' - jQueryUI theme "footer" classes ('fg-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix')</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following syntax is expected:
		 *       <ul>
		 *         <li>'&lt;' and '&gt;' - div elements</li>
		 *         <li>'&lt;"class" and '&gt;' - div with a class</li>
		 *         <li>'&lt;"#id" and '&gt;' - div with an ID</li>
		 *       </ul>
		 *     </li>
		 *     <li>Examples:
		 *       <ul>
		 *         <li>'&lt;"wrapper"flipt&gt;'</li>
		 *         <li>'&lt;lf&lt;t&gt;ip&gt;'</li>
		 *       </ul>
		 *     </li>
		 *   </ul>
		 *  @type string
		 *  @default lfrtip <i>(when `jQueryUI` is false)</i> <b>or</b>
		 *    <"H"lfr>t<"F"ip> <i>(when `jQueryUI` is true)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.dom
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "dom": '&lt;"top"i&gt;rt&lt;"bottom"flp&gt;&lt;"clear"&gt;'
		 *      } );
		 *    } );
		 */
		"sDom": "lfrtip",
	
	
		/**
		 * Search delay option. This will throttle full table searches that use the
		 * DataTables provided search input element (it does not effect calls to
		 * `dt-api search()`, providing a delay before the search is made.
		 *  @type integer
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.searchDelay
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchDelay": 200
		 *      } );
		 *    } )
		 */
		"searchDelay": null,
	
	
		/**
		 * DataTables features six different built-in options for the buttons to
		 * display for pagination control:
		 *
		 * * `numbers` - Page number buttons only
		 * * `simple` - 'Previous' and 'Next' buttons only
		 * * 'simple_numbers` - 'Previous' and 'Next' buttons, plus page numbers
		 * * `full` - 'First', 'Previous', 'Next' and 'Last' buttons
		 * * `full_numbers` - 'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers
		 * * `first_last_numbers` - 'First' and 'Last' buttons, plus page numbers
		 *  
		 * Further methods can be added using {@link DataTable.ext.oPagination}.
		 *  @type string
		 *  @default simple_numbers
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pagingType
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pagingType": "full_numbers"
		 *      } );
		 *    } )
		 */
		"sPaginationType": "simple_numbers",
	
	
		/**
		 * Enable horizontal scrolling. When a table is too wide to fit into a
		 * certain layout, or you have a large number of columns in the table, you
		 * can enable x-scrolling to show the table in a viewport, which can be
		 * scrolled. This property can be `true` which will allow the table to
		 * scroll horizontally when needed, or any CSS unit, or a number (in which
		 * case it will be treated as a pixel measurement). Setting as simply `true`
		 * is recommended.
		 *  @type boolean|string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollX
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": true,
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"sScrollX": "",
	
	
		/**
		 * This property can be used to force a DataTable to use more width than it
		 * might otherwise do when x-scrolling is enabled. For example if you have a
		 * table which requires to be well spaced, this parameter is useful for
		 * "over-sizing" the table, and thus forcing scrolling. This property can by
		 * any CSS unit, or a number (in which case it will be treated as a pixel
		 * measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollXInner
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": "100%",
		 *        "scrollXInner": "110%"
		 *      } );
		 *    } );
		 */
		"sScrollXInner": "",
	
	
		/**
		 * Enable vertical scrolling. Vertical scrolling will constrain the DataTable
		 * to the given height, and enable scrolling for any data which overflows the
		 * current viewport. This can be used as an alternative to paging to display
		 * a lot of data in a small area (although paging and scrolling can both be
		 * enabled at the same time). This property can be any CSS unit, or a number
		 * (in which case it will be treated as a pixel measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollY
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false
		 *      } );
		 *    } );
		 */
		"sScrollY": "",
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * Set the HTTP method that is used to make the Ajax call for server-side
		 * processing or Ajax sourced data.
		 *  @type string
		 *  @default GET
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverMethod
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sServerMethod": "GET",
	
	
		/**
		 * DataTables makes use of renderers when displaying HTML elements for
		 * a table. These renderers can be added or modified by plug-ins to
		 * generate suitable mark-up for a site. For example the Bootstrap
		 * integration plug-in for DataTables uses a paging button renderer to
		 * display pagination buttons in the mark-up required by Bootstrap.
		 *
		 * For further information about the renderers available see
		 * DataTable.ext.renderer
		 *  @type string|object
		 *  @default null
		 *
		 *  @name DataTable.defaults.renderer
		 *
		 */
		"renderer": null,
	
	
		/**
		 * Set the data property name that DataTables should use to get a row's id
		 * to set as the `id` property in the node.
		 *  @type string
		 *  @default DT_RowId
		 *
		 *  @name DataTable.defaults.rowId
		 */
		"rowId": "DT_RowId"
	};
	
	_fnHungarianMap( DataTable.defaults );
	
	
	
	/*
	 * Developer note - See note in model.defaults.js about the use of Hungarian
	 * notation and camel case.
	 */
	
	/**
	 * Column options that can be given to DataTables at initialisation time.
	 *  @namespace
	 */
	DataTable.defaults.column = {
		/**
		 * Define which column(s) an order will occur on for this column. This
		 * allows a column's ordering to take multiple columns into account when
		 * doing a sort or use the data from a different column. For example first
		 * name / last name columns make sense to do a multi-column sort over the
		 * two columns.
		 *  @type array|int
		 *  @default null <i>Takes the value of the column index automatically</i>
		 *
		 *  @name DataTable.defaults.column.orderData
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderData": [ 0, 1 ], "targets": [ 0 ] },
		 *          { "orderData": [ 1, 0 ], "targets": [ 1 ] },
		 *          { "orderData": 2, "targets": [ 2 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderData": [ 0, 1 ] },
		 *          { "orderData": [ 1, 0 ] },
		 *          { "orderData": 2 },
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"aDataSort": null,
		"iDataSort": -1,
	
	
		/**
		 * You can control the default ordering direction, and even alter the
		 * behaviour of the sort handler (i.e. only allow ascending ordering etc)
		 * using this parameter.
		 *  @type array
		 *  @default [ 'asc', 'desc' ]
		 *
		 *  @name DataTable.defaults.column.orderSequence
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderSequence": [ "asc" ], "targets": [ 1 ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ], "targets": [ 2 ] },
		 *          { "orderSequence": [ "desc" ], "targets": [ 3 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          { "orderSequence": [ "asc" ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ] },
		 *          { "orderSequence": [ "desc" ] },
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"asSorting": [ 'asc', 'desc' ],
	
	
		/**
		 * Enable or disable filtering on the data in this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.searchable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "searchable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "searchable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSearchable": true,
	
	
		/**
		 * Enable or disable ordering on this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.orderable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSortable": true,
	
	
		/**
		 * Enable or disable the display of this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.visible
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "visible": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "visible": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bVisible": true,
	
	
		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} td The TD node that has been created
		 *  @param {*} cellData The Data for the cell
		 *  @param {array|object} rowData The data for the whole row
		 *  @param {int} row The row index for the aoData data store
		 *  @param {int} col The column index for aoColumns
		 *
		 *  @name DataTable.defaults.column.createdCell
		 *  @dtopt Columns
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [3],
		 *          "createdCell": function (td, cellData, rowData, row, col) {
		 *            if ( cellData == "1.7" ) {
		 *              $(td).css('color', 'blue')
		 *            }
		 *          }
		 *        } ]
		 *      });
		 *    } );
		 */
		"fnCreatedCell": null,
	
	
		/**
		 * This parameter has been replaced by `data` in DataTables to ensure naming
		 * consistency. `dataProp` can still be used, as there is backwards
		 * compatibility in DataTables for this option, but it is strongly
		 * recommended that you use `data` in preference to `dataProp`.
		 *  @name DataTable.defaults.column.dataProp
		 */
	
	
		/**
		 * This property can be used to read data from any data source property,
		 * including deeply nested objects / properties. `data` can be given in a
		 * number of different ways which effect its behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object. Note that
		 *      function notation is recommended for use in `render` rather than
		 *      `data` as it is much simpler to use as a renderer.
		 * * `null` - use the original data source for the row rather than plucking
		 *   data directly from it. This action has effects on two other
		 *   initialisation options:
		 *    * `defaultContent` - When null is given as the `data` option and
		 *      `defaultContent` is specified for the column, the value defined by
		 *      `defaultContent` will be used for the cell.
		 *    * `render` - When null is used for the `data` option and the `render`
		 *      option is specified for the column, the whole data source for the
		 *      row is used for the renderer.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * `{array|object}` The data source for the row
		 *      * `{string}` The type call data requested - this will be 'set' when
		 *        setting data or 'filter', 'display', 'type', 'sort' or undefined
		 *        when gathering data. Note that when `undefined` is given for the
		 *        type DataTables expects to get the raw data for the object back<
		 *      * `{*}` Data to set when the second parameter is 'set'.
		 *    * Return:
		 *      * The return value from the function is not required when 'set' is
		 *        the type of call, but otherwise the return is what will be used
		 *        for the data requested.
		 *
		 * Note that `data` is a getter and setter option. If you just require
		 * formatting of data for output, you will likely want to use `render` which
		 * is simply a getter and thus simpler to use.
		 *
		 * Note that prior to DataTables 1.9.2 `data` was called `mDataProp`. The
		 * name change reflects the flexibility of this property and is consistent
		 * with the naming of mRender. If 'mDataProp' is given, then it will still
		 * be used by DataTables, as it automatically maps the old name to the new
		 * if required.
		 *
		 *  @type string|int|function|null
		 *  @default null <i>Use automatically calculated column index</i>
		 *
		 *  @name DataTable.defaults.column.data
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Read table data from objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {value},
		 *    //      "version": {value},
		 *    //      "grade": {value}
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/objects.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform" },
		 *          { "data": "version" },
		 *          { "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Read information from deeply nested objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {
		 *    //         "inner": {value}
		 *    //      },
		 *    //      "details": [
		 *    //         {value}, {value}
		 *    //      ]
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform.inner" },
		 *          { "data": "details.0" },
		 *          { "data": "details.1" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `data` as a function to provide different information for
		 *    // sorting, filtering and display. In this case, currency (price)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": function ( source, type, val ) {
		 *            if (type === 'set') {
		 *              source.price = val;
		 *              // Store the computed display and filter values for efficiency
		 *              source.price_display = val=="" ? "" : "$"+numberFormat(val);
		 *              source.price_filter  = val=="" ? "" : "$"+numberFormat(val)+" "+val;
		 *              return;
		 *            }
		 *            else if (type === 'display') {
		 *              return source.price_display;
		 *            }
		 *            else if (type === 'filter') {
		 *              return source.price_filter;
		 *            }
		 *            // 'sort', 'type' and undefined all just use the integer
		 *            return source.price;
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using default content
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null,
		 *          "defaultContent": "Click to edit"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using array notation - outputting a list from an array
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "name[, ]"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 */
		"mData": null,
	
	
		/**
		 * This property is the rendering partner to `data` and it is suggested that
		 * when you want to manipulate data for display (including filtering,
		 * sorting etc) without altering the underlying data for the table, use this
		 * property. `render` can be considered to be the the read only companion to
		 * `data` which is read / write (then as such more complex). Like `data`
		 * this option can be given in a number of different ways to effect its
		 * behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object.
		 * * `object` - use different data for the different data types requested by
		 *   DataTables ('filter', 'display', 'type' or 'sort'). The property names
		 *   of the object is the data type the property refers to and the value can
		 *   defined using an integer, string or function using the same rules as
		 *   `render` normally does. Note that an `_` option _must_ be specified.
		 *   This is the default value to use if you haven't specified a value for
		 *   the data type requested by DataTables.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * {array|object} The data source for the row (based on `data`)
		 *      * {string} The type call data requested - this will be 'filter',
		 *        'display', 'type' or 'sort'.
		 *      * {array|object} The full data source for the row (not based on
		 *        `data`)
		 *    * Return:
		 *      * The return value from the function is what will be used for the
		 *        data requested.
		 *
		 *  @type string|int|function|object|null
		 *  @default null Use the data source value.
		 *
		 *  @name DataTable.defaults.column.render
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Create a comma separated list from an array of objects
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          {
		 *            "data": "platform",
		 *            "render": "[, ].name"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Execute a function to obtain data
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": "browserName()"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // As an object, extracting different data for the different types
		 *    // This would be used with a data source such as:
		 *    //   { "phone": 5552368, "phone_filter": "5552368 555-2368", "phone_display": "555-2368" }
		 *    // Here the `phone` integer is used for sorting and type detection, while `phone_filter`
		 *    // (which has both forms) is used for filtering for if a user inputs either format, while
		 *    // the formatted phone number is the one that is shown in the table.
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": {
		 *            "_": "phone",
		 *            "filter": "phone_filter",
		 *            "display": "phone_display"
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Use as a function to create a link from the data source
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "download_link",
		 *          "render": function ( data, type, full ) {
		 *            return '<a href="'+data+'">Download</a>';
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 */
		"mRender": null,
	
	
		/**
		 * Change the cell type created for the column - either TD cells or TH cells. This
		 * can be useful as TH cells have semantic meaning in the table body, allowing them
		 * to act as a header for a row (you may wish to add scope='row' to the TH elements).
		 *  @type string
		 *  @default td
		 *
		 *  @name DataTable.defaults.column.cellType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Make the first column use TH cells
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "cellType": "th"
		 *        } ]
		 *      } );
		 *    } );
		 */
		"sCellType": "td",
	
	
		/**
		 * Class to give to each cell in this column.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.class
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "class": "my_class", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "class": "my_class" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sClass": "",
	
		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 * Generally you shouldn't need this!
		 *  @type string
		 *  @default <i>Empty string<i>
		 *
		 *  @name DataTable.defaults.column.contentPadding
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "contentPadding": "mmm"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sContentPadding": "",
	
	
		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because `data`
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 *
		 *  @name DataTable.defaults.column.defaultContent
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit",
		 *            "targets": [ -1 ]
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sDefaultContent": null,
	
	
		/**
		 * This parameter is only used in DataTables' server-side processing. It can
		 * be exceptionally useful to know what columns are being displayed on the
		 * client side, and to map these to database fields. When defined, the names
		 * also allow DataTables to reorder information from the server if it comes
		 * back in an unexpected order (i.e. if you switch your columns around on the
		 * client-side, your server-side code does not also need updating).
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.name
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "name": "engine", "targets": [ 0 ] },
		 *          { "name": "browser", "targets": [ 1 ] },
		 *          { "name": "platform", "targets": [ 2 ] },
		 *          { "name": "version", "targets": [ 3 ] },
		 *          { "name": "grade", "targets": [ 4 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "name": "engine" },
		 *          { "name": "browser" },
		 *          { "name": "platform" },
		 *          { "name": "version" },
		 *          { "name": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sName": "",
	
	
		/**
		 * Defines a data source type for the ordering which can be used to read
		 * real-time information from the table (updating the internally cached
		 * version) prior to ordering. This allows ordering to occur on user
		 * editable elements such as form inputs.
		 *  @type string
		 *  @default std
		 *
		 *  @name DataTable.defaults.column.orderDataType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderDataType": "dom-text", "targets": [ 2, 3 ] },
		 *          { "type": "numeric", "targets": [ 3 ] },
		 *          { "orderDataType": "dom-select", "targets": [ 4 ] },
		 *          { "orderDataType": "dom-checkbox", "targets": [ 5 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          { "orderDataType": "dom-text" },
		 *          { "orderDataType": "dom-text", "type": "numeric" },
		 *          { "orderDataType": "dom-select" },
		 *          { "orderDataType": "dom-checkbox" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sSortDataType": "std",
	
	
		/**
		 * The title of this column.
		 *  @type string
		 *  @default null <i>Derived from the 'TH' value for this column in the
		 *    original HTML table.</i>
		 *
		 *  @name DataTable.defaults.column.title
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "title": "My column title", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "title": "My column title" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sTitle": null,
	
	
		/**
		 * The type allows you to specify how the data for this column will be
		 * ordered. Four types (string, numeric, date and html (which will strip
		 * HTML tags before ordering)) are currently available. Note that only date
		 * formats understood by Javascript's Date() object will be accepted as type
		 * date. For example: "Mar 26, 2008 5:03 PM". May take the values: 'string',
		 * 'numeric', 'date' or 'html' (by default). Further types can be adding
		 * through plug-ins.
		 *  @type string
		 *  @default null <i>Auto-detected from raw data</i>
		 *
		 *  @name DataTable.defaults.column.type
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "type": "html", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "type": "html" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sType": null,
	
	
		/**
		 * Defining the width of the column, this parameter may take any CSS value
		 * (3em, 20px etc). DataTables applies 'smart' widths to columns which have not
		 * been given a specific width through this interface ensuring that the table
		 * remains readable.
		 *  @type string
		 *  @default null <i>Automatic</i>
		 *
		 *  @name DataTable.defaults.column.width
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "width": "20%", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "width": "20%" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sWidth": null
	};
	
	_fnHungarianMap( DataTable.defaults.column );
	
	
	
	/**
	 * DataTables settings object - this holds all the information needed for a
	 * given table, including configuration, data and current application of the
	 * table options. DataTables does not have a single instance for each DataTable
	 * with the settings attached to that instance, but rather instances of the
	 * DataTable "class" are created on-the-fly as needed (typically by a
	 * $().dataTable() call) and the settings object is then applied to that
	 * instance.
	 *
	 * Note that this object is related to {@link DataTable.defaults} but this
	 * one is the internal data store for DataTables's cache of columns. It should
	 * NOT be manipulated outside of DataTables. Any configuration should be done
	 * through the initialisation options.
	 *  @namespace
	 *  @todo Really should attach the settings object to individual instances so we
	 *    don't need to create new instances on each $().dataTable() call (if the
	 *    table already exists). It would also save passing oSettings around and
	 *    into every single function. However, this is a very significant
	 *    architecture change for DataTables and will almost certainly break
	 *    backwards compatibility with older installations. This is something that
	 *    will be done in 2.0.
	 */
	DataTable.models.oSettings = {
		/**
		 * Primary features of DataTables and their enablement state.
		 *  @namespace
		 */
		"oFeatures": {
	
			/**
			 * Flag to say if DataTables should automatically try to calculate the
			 * optimum table and columns widths (true) or not (false).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bAutoWidth": null,
	
			/**
			 * Delay the creation of TR and TD elements until they are actually
			 * needed by a driven page draw. This can give a significant speed
			 * increase for Ajax source and Javascript source data, but makes no
			 * difference at all for DOM and server-side processing tables.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bDeferRender": null,
	
			/**
			 * Enable filtering on the table or not. Note that if this is disabled
			 * then there is no filtering at all on the table, including fnFilter.
			 * To just remove the filtering input use sDom and remove the 'f' option.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bFilter": null,
	
			/**
			 * Table information element (the 'Showing x of y records' div) enable
			 * flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bInfo": null,
	
			/**
			 * Present a user control allowing the end user to change the page size
			 * when pagination is enabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bLengthChange": null,
	
			/**
			 * Pagination enabled or not. Note that if this is disabled then length
			 * changing must also be disabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bPaginate": null,
	
			/**
			 * Processing indicator enable flag whenever DataTables is enacting a
			 * user request - typically an Ajax request for server-side processing.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bProcessing": null,
	
			/**
			 * Server-side processing enabled flag - when enabled DataTables will
			 * get all data from the server for every draw - there is no filtering,
			 * sorting or paging done on the client-side.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bServerSide": null,
	
			/**
			 * Sorting enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSort": null,
	
			/**
			 * Multi-column sorting
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortMulti": null,
	
			/**
			 * Apply a class to the columns which are being sorted to provide a
			 * visual highlight or not. This can slow things down when enabled since
			 * there is a lot of DOM interaction.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortClasses": null,
	
			/**
			 * State saving enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bStateSave": null
		},
	
	
		/**
		 * Scrolling settings for a table.
		 *  @namespace
		 */
		"oScroll": {
			/**
			 * When the table is shorter in height than sScrollY, collapse the
			 * table container down to the height of the table (when true).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bCollapse": null,
	
			/**
			 * Width of the scrollbar for the web-browser's platform. Calculated
			 * during table initialisation.
			 *  @type int
			 *  @default 0
			 */
			"iBarWidth": 0,
	
			/**
			 * Viewport width for horizontal scrolling. Horizontal scrolling is
			 * disabled if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sX": null,
	
			/**
			 * Width to expand the table to when using x-scrolling. Typically you
			 * should not need to use this.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 *  @deprecated
			 */
			"sXInner": null,
	
			/**
			 * Viewport height for vertical scrolling. Vertical scrolling is disabled
			 * if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sY": null
		},
	
		/**
		 * Language information for the table.
		 *  @namespace
		 *  @extends DataTable.defaults.oLanguage
		 */
		"oLanguage": {
			/**
			 * Information callback function. See
			 * {@link DataTable.defaults.fnInfoCallback}
			 *  @type function
			 *  @default null
			 */
			"fnInfoCallback": null
		},
	
		/**
		 * Browser support parameters
		 *  @namespace
		 */
		"oBrowser": {
			/**
			 * Indicate if the browser incorrectly calculates width:100% inside a
			 * scrolling element (IE6/7)
			 *  @type boolean
			 *  @default false
			 */
			"bScrollOversize": false,
	
			/**
			 * Determine if the vertical scrollbar is on the right or left of the
			 * scrolling container - needed for rtl language layout, although not
			 * all browsers move the scrollbar (Safari).
			 *  @type boolean
			 *  @default false
			 */
			"bScrollbarLeft": false,
	
			/**
			 * Flag for if `getBoundingClientRect` is fully supported or not
			 *  @type boolean
			 *  @default false
			 */
			"bBounding": false,
	
			/**
			 * Browser scrollbar width
			 *  @type integer
			 *  @default 0
			 */
			"barWidth": 0
		},
	
	
		"ajax": null,
	
	
		/**
		 * Array referencing the nodes which are used for the features. The
		 * parameters of this object match what is allowed by sDom - i.e.
		 *   <ul>
		 *     <li>'l' - Length changing</li>
		 *     <li>'f' - Filtering input</li>
		 *     <li>'t' - The table!</li>
		 *     <li>'i' - Information</li>
		 *     <li>'p' - Pagination</li>
		 *     <li>'r' - pRocessing</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aanFeatures": [],
	
		/**
		 * Store data information - see {@link DataTable.models.oRow} for detailed
		 * information.
		 *  @type array
		 *  @default []
		 */
		"aoData": [],
	
		/**
		 * Array of indexes which are in the current display (after filtering etc)
		 *  @type array
		 *  @default []
		 */
		"aiDisplay": [],
	
		/**
		 * Array of indexes for display - no filtering
		 *  @type array
		 *  @default []
		 */
		"aiDisplayMaster": [],
	
		/**
		 * Map of row ids to data indexes
		 *  @type object
		 *  @default {}
		 */
		"aIds": {},
	
		/**
		 * Store information about each column that is in use
		 *  @type array
		 *  @default []
		 */
		"aoColumns": [],
	
		/**
		 * Store information about the table's header
		 *  @type array
		 *  @default []
		 */
		"aoHeader": [],
	
		/**
		 * Store information about the table's footer
		 *  @type array
		 *  @default []
		 */
		"aoFooter": [],
	
		/**
		 * Store the applied global search information in case we want to force a
		 * research or compare the old search to a new one.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 */
		"oPreviousSearch": {},
	
		/**
		 * Store the applied search for each column - see
		 * {@link DataTable.models.oSearch} for the format that is used for the
		 * filtering information for each column.
		 *  @type array
		 *  @default []
		 */
		"aoPreSearchCols": [],
	
		/**
		 * Sorting that is applied to the table. Note that the inner arrays are
		 * used in the following manner:
		 * <ul>
		 *   <li>Index 0 - column number</li>
		 *   <li>Index 1 - current sorting direction</li>
		 * </ul>
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @todo These inner arrays should really be objects
		 */
		"aaSorting": null,
	
		/**
		 * Sorting that is always applied to the table (i.e. prefixed in front of
		 * aaSorting).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aaSortingFixed": [],
	
		/**
		 * Classes to use for the striping of a table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"asStripeClasses": null,
	
		/**
		 * If restoring a table - we should restore its striping classes as well
		 *  @type array
		 *  @default []
		 */
		"asDestroyStripes": [],
	
		/**
		 * If restoring a table - we should restore its width
		 *  @type int
		 *  @default 0
		 */
		"sDestroyWidth": 0,
	
		/**
		 * Callback functions array for every time a row is inserted (i.e. on a draw).
		 *  @type array
		 *  @default []
		 */
		"aoRowCallback": [],
	
		/**
		 * Callback functions for the header on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoHeaderCallback": [],
	
		/**
		 * Callback function for the footer on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoFooterCallback": [],
	
		/**
		 * Array of callback functions for draw callback functions
		 *  @type array
		 *  @default []
		 */
		"aoDrawCallback": [],
	
		/**
		 * Array of callback functions for row created function
		 *  @type array
		 *  @default []
		 */
		"aoRowCreatedCallback": [],
	
		/**
		 * Callback functions for just before the table is redrawn. A return of
		 * false will be used to cancel the draw.
		 *  @type array
		 *  @default []
		 */
		"aoPreDrawCallback": [],
	
		/**
		 * Callback functions for when the table has been initialised.
		 *  @type array
		 *  @default []
		 */
		"aoInitComplete": [],
	
	
		/**
		 * Callbacks for modifying the settings to be stored for state saving, prior to
		 * saving state.
		 *  @type array
		 *  @default []
		 */
		"aoStateSaveParams": [],
	
		/**
		 * Callbacks for modifying the settings that have been stored for state saving
		 * prior to using the stored values to restore the state.
		 *  @type array
		 *  @default []
		 */
		"aoStateLoadParams": [],
	
		/**
		 * Callbacks for operating on the settings object once the saved state has been
		 * loaded
		 *  @type array
		 *  @default []
		 */
		"aoStateLoaded": [],
	
		/**
		 * Cache the table ID for quick access
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sTableId": "",
	
		/**
		 * The TABLE node for the main table
		 *  @type node
		 *  @default null
		 */
		"nTable": null,
	
		/**
		 * Permanent ref to the thead element
		 *  @type node
		 *  @default null
		 */
		"nTHead": null,
	
		/**
		 * Permanent ref to the tfoot element - if it exists
		 *  @type node
		 *  @default null
		 */
		"nTFoot": null,
	
		/**
		 * Permanent ref to the tbody element
		 *  @type node
		 *  @default null
		 */
		"nTBody": null,
	
		/**
		 * Cache the wrapper node (contains all DataTables controlled elements)
		 *  @type node
		 *  @default null
		 */
		"nTableWrapper": null,
	
		/**
		 * Indicate if when using server-side processing the loading of data
		 * should be deferred until the second draw.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 *  @default false
		 */
		"bDeferLoading": false,
	
		/**
		 * Indicate if all required information has been read in
		 *  @type boolean
		 *  @default false
		 */
		"bInitialised": false,
	
		/**
		 * Information about open rows. Each object in the array has the parameters
		 * 'nTr' and 'nParent'
		 *  @type array
		 *  @default []
		 */
		"aoOpenRows": [],
	
		/**
		 * Dictate the positioning of DataTables' control elements - see
		 * {@link DataTable.model.oInit.sDom}.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sDom": null,
	
		/**
		 * Search delay (in mS)
		 *  @type integer
		 *  @default null
		 */
		"searchDelay": null,
	
		/**
		 * Which type of pagination should be used.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default two_button
		 */
		"sPaginationType": "two_button",
	
		/**
		 * The state duration (for `stateSave`) in seconds.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type int
		 *  @default 0
		 */
		"iStateDuration": 0,
	
		/**
		 * Array of callback functions for state saving. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the JSON string to save that has been thus far created. Returns
		 *       a JSON string to be inserted into a json object
		 *       (i.e. '"param": [ 0, 1, 2]')</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateSave": [],
	
		/**
		 * Array of callback functions for state loading. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the object stored. May return false to cancel state loading</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateLoad": [],
	
		/**
		 * State that was saved. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oSavedState": null,
	
		/**
		 * State that was loaded. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oLoadedState": null,
	
		/**
		 * Source url for AJAX data for the table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sAjaxSource": null,
	
		/**
		 * Property from a given object from which to read the table data from. This
		 * can be an empty string (when not server-side processing), in which case
		 * it is  assumed an an array is given directly.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sAjaxDataProp": null,
	
		/**
		 * The last jQuery XHR object that was used for server-side data gathering.
		 * This can be used for working with the XHR information in one of the
		 * callbacks
		 *  @type object
		 *  @default null
		 */
		"jqXHR": null,
	
		/**
		 * JSON returned from the server in the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"json": undefined,
	
		/**
		 * Data submitted as part of the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"oAjaxData": undefined,
	
		/**
		 * Function to get the server-side data.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnServerData": null,
	
		/**
		 * Functions which are called prior to sending an Ajax request so extra
		 * parameters can easily be sent to the server
		 *  @type array
		 *  @default []
		 */
		"aoServerParams": [],
	
		/**
		 * Send the XHR HTTP method - GET or POST (could be PUT or DELETE if
		 * required).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sServerMethod": null,
	
		/**
		 * Format numbers for display.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnFormatNumber": null,
	
		/**
		 * List of options that can be used for the user selectable length menu.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aLengthMenu": null,
	
		/**
		 * Counter for the draws that the table does. Also used as a tracker for
		 * server-side processing
		 *  @type int
		 *  @default 0
		 */
		"iDraw": 0,
	
		/**
		 * Indicate if a redraw is being done - useful for Ajax
		 *  @type boolean
		 *  @default false
		 */
		"bDrawing": false,
	
		/**
		 * Draw index (iDraw) of the last error when parsing the returned data
		 *  @type int
		 *  @default -1
		 */
		"iDrawError": -1,
	
		/**
		 * Paging display length
		 *  @type int
		 *  @default 10
		 */
		"_iDisplayLength": 10,
	
		/**
		 * Paging start point - aiDisplay index
		 *  @type int
		 *  @default 0
		 */
		"_iDisplayStart": 0,
	
		/**
		 * Server-side processing - number of records in the result set
		 * (i.e. before filtering), Use fnRecordsTotal rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type int
		 *  @default 0
		 *  @private
		 */
		"_iRecordsTotal": 0,
	
		/**
		 * Server-side processing - number of records in the current display set
		 * (i.e. after filtering). Use fnRecordsDisplay rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type boolean
		 *  @default 0
		 *  @private
		 */
		"_iRecordsDisplay": 0,
	
		/**
		 * The classes to use for the table
		 *  @type object
		 *  @default {}
		 */
		"oClasses": {},
	
		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if filtering has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bFiltered": false,
	
		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if sorting has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bSorted": false,
	
		/**
		 * Indicate that if multiple rows are in the header and there is more than
		 * one unique cell per column, if the top one (true) or bottom one (false)
		 * should be used for sorting / title by DataTables.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 */
		"bSortCellsTop": null,
	
		/**
		 * Initialisation object that is used for the table
		 *  @type object
		 *  @default null
		 */
		"oInit": null,
	
		/**
		 * Destroy callback functions - for plug-ins to attach themselves to the
		 * destroy so they can clean up markup and events.
		 *  @type array
		 *  @default []
		 */
		"aoDestroyCallback": [],
	
	
		/**
		 * Get the number of records in the current record set, before filtering
		 *  @type function
		 */
		"fnRecordsTotal": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsTotal * 1 :
				this.aiDisplayMaster.length;
		},
	
		/**
		 * Get the number of records in the current record set, after filtering
		 *  @type function
		 */
		"fnRecordsDisplay": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsDisplay * 1 :
				this.aiDisplay.length;
		},
	
		/**
		 * Get the display end point - aiDisplay index
		 *  @type function
		 */
		"fnDisplayEnd": function ()
		{
			var
				len      = this._iDisplayLength,
				start    = this._iDisplayStart,
				calc     = start + len,
				records  = this.aiDisplay.length,
				features = this.oFeatures,
				paginate = features.bPaginate;
	
			if ( features.bServerSide ) {
				return paginate === false || len === -1 ?
					start + records :
					Math.min( start+len, this._iRecordsDisplay );
			}
			else {
				return ! paginate || calc>records || len===-1 ?
					records :
					calc;
			}
		},
	
		/**
		 * The DataTables object for this table
		 *  @type object
		 *  @default null
		 */
		"oInstance": null,
	
		/**
		 * Unique identifier for each instance of the DataTables object. If there
		 * is an ID on the table node, then it takes that value, otherwise an
		 * incrementing internal counter is used.
		 *  @type string
		 *  @default null
		 */
		"sInstance": null,
	
		/**
		 * tabindex attribute value that is added to DataTables control elements, allowing
		 * keyboard navigation of the table and its controls.
		 */
		"iTabIndex": 0,
	
		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollHead": null,
	
		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollFoot": null,
	
		/**
		 * Last applied sort
		 *  @type array
		 *  @default []
		 */
		"aLastSort": [],
	
		/**
		 * Stored plug-in instances
		 *  @type object
		 *  @default {}
		 */
		"oPlugins": {},
	
		/**
		 * Function used to get a row's id from the row's data
		 *  @type function
		 *  @default null
		 */
		"rowIdFn": null,
	
		/**
		 * Data location where to store a row's id
		 *  @type string
		 *  @default null
		 */
		"rowId": null
	};
	
	/**
	 * Extension object for DataTables that is used to provide all extension
	 * options.
	 *
	 * Note that the `DataTable.ext` object is available through
	 * `jQuery.fn.dataTable.ext` where it may be accessed and manipulated. It is
	 * also aliased to `jQuery.fn.dataTableExt` for historic reasons.
	 *  @namespace
	 *  @extends DataTable.models.ext
	 */
	
	
	/**
	 * DataTables extensions
	 * 
	 * This namespace acts as a collection area for plug-ins that can be used to
	 * extend DataTables capabilities. Indeed many of the build in methods
	 * use this method to provide their own capabilities (sorting methods for
	 * example).
	 *
	 * Note that this namespace is aliased to `jQuery.fn.dataTableExt` for legacy
	 * reasons
	 *
	 *  @namespace
	 */
	DataTable.ext = _ext = {
		/**
		 * Buttons. For use with the Buttons extension for DataTables. This is
		 * defined here so other extensions can define buttons regardless of load
		 * order. It is _not_ used by DataTables core.
		 *
		 *  @type object
		 *  @default {}
		 */
		buttons: {},
	
	
		/**
		 * Element class names
		 *
		 *  @type object
		 *  @default {}
		 */
		classes: {},
	
	
		/**
		 * DataTables build type (expanded by the download builder)
		 *
		 *  @type string
		 */
		build:"dt/dt-1.12.1/e-2.0.10/b-2.2.3/sl-1.4.0",
	
	
		/**
		 * Error reporting.
		 * 
		 * How should DataTables report an error. Can take the value 'alert',
		 * 'throw', 'none' or a function.
		 *
		 *  @type string|function
		 *  @default alert
		 */
		errMode: "alert",
	
	
		/**
		 * Feature plug-ins.
		 * 
		 * This is an array of objects which describe the feature plug-ins that are
		 * available to DataTables. These feature plug-ins are then available for
		 * use through the `dom` initialisation option.
		 * 
		 * Each feature plug-in is described by an object which must have the
		 * following properties:
		 * 
		 * * `fnInit` - function that is used to initialise the plug-in,
		 * * `cFeature` - a character so the feature can be enabled by the `dom`
		 *   instillation option. This is case sensitive.
		 *
		 * The `fnInit` function has the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 *
		 * And the following return is expected:
		 * 
		 * * {node|null} The element which contains your feature. Note that the
		 *   return may also be void if your plug-in does not require to inject any
		 *   DOM elements into DataTables control (`dom`) - for example this might
		 *   be useful when developing a plug-in which allows table control via
		 *   keyboard entry
		 *
		 *  @type array
		 *
		 *  @example
		 *    $.fn.dataTable.ext.features.push( {
		 *      "fnInit": function( oSettings ) {
		 *        return new TableTools( { "oDTSettings": oSettings } );
		 *      },
		 *      "cFeature": "T"
		 *    } );
		 */
		feature: [],
	
	
		/**
		 * Row searching.
		 * 
		 * This method of searching is complimentary to the default type based
		 * searching, and a lot more comprehensive as it allows you complete control
		 * over the searching logic. Each element in this array is a function
		 * (parameters described below) that is called for every row in the table,
		 * and your logic decides if it should be included in the searching data set
		 * or not.
		 *
		 * Searching functions have the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{array|object}` Data for the row to be processed (same as the
		 *    original format that was passed in as the data source, or an array
		 *    from a DOM data source
		 * 3. `{int}` Row index ({@link DataTable.models.oSettings.aoData}), which
		 *    can be useful to retrieve the `TR` element if you need DOM interaction.
		 *
		 * And the following return is expected:
		 *
		 * * {boolean} Include the row in the searched result set (true) or not
		 *   (false)
		 *
		 * Note that as with the main search ability in DataTables, technically this
		 * is "filtering", since it is subtractive. However, for consistency in
		 * naming we call it searching here.
		 *
		 *  @type array
		 *  @default []
		 *
		 *  @example
		 *    // The following example shows custom search being applied to the
		 *    // fourth column (i.e. the data[3] index) based on two input values
		 *    // from the end-user, matching the data in a certain range.
		 *    $.fn.dataTable.ext.search.push(
		 *      function( settings, data, dataIndex ) {
		 *        var min = document.getElementById('min').value * 1;
		 *        var max = document.getElementById('max').value * 1;
		 *        var version = data[3] == "-" ? 0 : data[3]*1;
		 *
		 *        if ( min == "" && max == "" ) {
		 *          return true;
		 *        }
		 *        else if ( min == "" && version < max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && "" == max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && version < max ) {
		 *          return true;
		 *        }
		 *        return false;
		 *      }
		 *    );
		 */
		search: [],
	
	
		/**
		 * Selector extensions
		 *
		 * The `selector` option can be used to extend the options available for the
		 * selector modifier options (`selector-modifier` object data type) that
		 * each of the three built in selector types offer (row, column and cell +
		 * their plural counterparts). For example the Select extension uses this
		 * mechanism to provide an option to select only rows, columns and cells
		 * that have been marked as selected by the end user (`{selected: true}`),
		 * which can be used in conjunction with the existing built in selector
		 * options.
		 *
		 * Each property is an array to which functions can be pushed. The functions
		 * take three attributes:
		 *
		 * * Settings object for the host table
		 * * Options object (`selector-modifier` object type)
		 * * Array of selected item indexes
		 *
		 * The return is an array of the resulting item indexes after the custom
		 * selector has been applied.
		 *
		 *  @type object
		 */
		selector: {
			cell: [],
			column: [],
			row: []
		},
	
	
		/**
		 * Internal functions, exposed for used in plug-ins.
		 * 
		 * Please note that you should not need to use the internal methods for
		 * anything other than a plug-in (and even then, try to avoid if possible).
		 * The internal function may change between releases.
		 *
		 *  @type object
		 *  @default {}
		 */
		internal: {},
	
	
		/**
		 * Legacy configuration options. Enable and disable legacy options that
		 * are available in DataTables.
		 *
		 *  @type object
		 */
		legacy: {
			/**
			 * Enable / disable DataTables 1.9 compatible server-side processing
			 * requests
			 *
			 *  @type boolean
			 *  @default null
			 */
			ajax: null
		},
	
	
		/**
		 * Pagination plug-in methods.
		 * 
		 * Each entry in this object is a function and defines which buttons should
		 * be shown by the pagination rendering method that is used for the table:
		 * {@link DataTable.ext.renderer.pageButton}. The renderer addresses how the
		 * buttons are displayed in the document, while the functions here tell it
		 * what buttons to display. This is done by returning an array of button
		 * descriptions (what each button will do).
		 *
		 * Pagination types (the four built in options and any additional plug-in
		 * options defined here) can be used through the `paginationType`
		 * initialisation parameter.
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{int} page` The current page index
		 * 2. `{int} pages` The number of pages in the table
		 *
		 * Each function is expected to return an array where each element of the
		 * array can be one of:
		 *
		 * * `first` - Jump to first page when activated
		 * * `last` - Jump to last page when activated
		 * * `previous` - Show previous page when activated
		 * * `next` - Show next page when activated
		 * * `{int}` - Show page of the index given
		 * * `{array}` - A nested array containing the above elements to add a
		 *   containing 'DIV' element (might be useful for styling).
		 *
		 * Note that DataTables v1.9- used this object slightly differently whereby
		 * an object with two functions would be defined for each plug-in. That
		 * ability is still supported by DataTables 1.10+ to provide backwards
		 * compatibility, but this option of use is now decremented and no longer
		 * documented in DataTables 1.10+.
		 *
		 *  @type object
		 *  @default {}
		 *
		 *  @example
		 *    // Show previous, next and current page buttons only
		 *    $.fn.dataTableExt.oPagination.current = function ( page, pages ) {
		 *      return [ 'previous', page, 'next' ];
		 *    };
		 */
		pager: {},
	
	
		renderer: {
			pageButton: {},
			header: {}
		},
	
	
		/**
		 * Ordering plug-ins - custom data source
		 * 
		 * The extension options for ordering of data available here is complimentary
		 * to the default type based ordering that DataTables typically uses. It
		 * allows much greater control over the the data that is being used to
		 * order a column, but is necessarily therefore more complex.
		 * 
		 * This type of ordering is useful if you want to do ordering based on data
		 * live from the DOM (for example the contents of an 'input' element) rather
		 * than just the static string that DataTables knows of.
		 * 
		 * The way these plug-ins work is that you create an array of the values you
		 * wish to be ordering for the column in question and then return that
		 * array. The data in the array much be in the index order of the rows in
		 * the table (not the currently ordering order!). Which order data gathering
		 * function is run here depends on the `dt-init columns.orderDataType`
		 * parameter that is used for the column (if any).
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{int}` Target column index
		 *
		 * Each function is expected to return an array:
		 *
		 * * `{array}` Data for the column to be ordering upon
		 *
		 *  @type array
		 *
		 *  @example
		 *    // Ordering using `input` node values
		 *    $.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
		 *    {
		 *      return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
		 *        return $('input', td).val();
		 *      } );
		 *    }
		 */
		order: {},
	
	
		/**
		 * Type based plug-ins.
		 *
		 * Each column in DataTables has a type assigned to it, either by automatic
		 * detection or by direct assignment using the `type` option for the column.
		 * The type of a column will effect how it is ordering and search (plug-ins
		 * can also make use of the column type if required).
		 *
		 * @namespace
		 */
		type: {
			/**
			 * Type detection functions.
			 *
			 * The functions defined in this object are used to automatically detect
			 * a column's type, making initialisation of DataTables super easy, even
			 * when complex data is in the table.
			 *
			 * The functions defined take two parameters:
			 *
		     *  1. `{*}` Data from the column cell to be analysed
		     *  2. `{settings}` DataTables settings object. This can be used to
		     *     perform context specific type detection - for example detection
		     *     based on language settings such as using a comma for a decimal
		     *     place. Generally speaking the options from the settings will not
		     *     be required
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Data type detected, or null if unknown (and thus
			 *   pass it on to the other type detection functions.
			 *
			 *  @type array
			 *
			 *  @example
			 *    // Currency type detection plug-in:
			 *    $.fn.dataTable.ext.type.detect.push(
			 *      function ( data, settings ) {
			 *        // Check the numeric part
			 *        if ( ! data.substring(1).match(/[0-9]/) ) {
			 *          return null;
			 *        }
			 *
			 *        // Check prefixed by currency
			 *        if ( data.charAt(0) == '$' || data.charAt(0) == '&pound;' ) {
			 *          return 'currency';
			 *        }
			 *        return null;
			 *      }
			 *    );
			 */
			detect: [],
	
	
			/**
			 * Type based search formatting.
			 *
			 * The type based searching functions can be used to pre-format the
			 * data to be search on. For example, it can be used to strip HTML
			 * tags or to de-format telephone numbers for numeric only searching.
			 *
			 * Note that is a search is not defined for a column of a given type,
			 * no search formatting will be performed.
			 * 
			 * Pre-processing of searching data plug-ins - When you assign the sType
			 * for a column (or have it automatically detected for you by DataTables
			 * or a type detection plug-in), you will typically be using this for
			 * custom sorting, but it can also be used to provide custom searching
			 * by allowing you to pre-processing the data and returning the data in
			 * the format that should be searched upon. This is done by adding
			 * functions this object with a parameter name which matches the sType
			 * for that target column. This is the corollary of <i>afnSortData</i>
			 * for searching data.
			 *
			 * The functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for searching
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Formatted string that will be used for the searching.
			 *
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    $.fn.dataTable.ext.type.search['title-numeric'] = function ( d ) {
			 *      return d.replace(/\n/g," ").replace( /<.*?>/g, "" );
			 *    }
			 */
			search: {},
	
	
			/**
			 * Type based ordering.
			 *
			 * The column type tells DataTables what ordering to apply to the table
			 * when a column is sorted upon. The order for each type that is defined,
			 * is defined by the functions available in this object.
			 *
			 * Each ordering option can be described by three properties added to
			 * this object:
			 *
			 * * `{type}-pre` - Pre-formatting function
			 * * `{type}-asc` - Ascending order function
			 * * `{type}-desc` - Descending order function
			 *
			 * All three can be used together, only `{type}-pre` or only
			 * `{type}-asc` and `{type}-desc` together. It is generally recommended
			 * that only `{type}-pre` is used, as this provides the optimal
			 * implementation in terms of speed, although the others are provided
			 * for compatibility with existing Javascript sort functions.
			 *
			 * `{type}-pre`: Functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for ordering
			 *
			 * And return:
			 *
			 * * `{*}` Data to be sorted upon
			 *
			 * `{type}-asc` and `{type}-desc`: Functions are typical Javascript sort
			 * functions, taking two parameters:
			 *
		     *  1. `{*}` Data to compare to the second parameter
		     *  2. `{*}` Data to compare to the first parameter
			 *
			 * And returning:
			 *
			 * * `{*}` Ordering match: <0 if first parameter should be sorted lower
			 *   than the second parameter, ===0 if the two parameters are equal and
			 *   >0 if the first parameter should be sorted height than the second
			 *   parameter.
			 * 
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    // Numeric ordering of formatted numbers with a pre-formatter
			 *    $.extend( $.fn.dataTable.ext.type.order, {
			 *      "string-pre": function(x) {
			 *        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
			 *        return parseFloat( a );
			 *      }
			 *    } );
			 *
			 *  @example
			 *    // Case-sensitive string ordering, with no pre-formatting method
			 *    $.extend( $.fn.dataTable.ext.order, {
			 *      "string-case-asc": function(x,y) {
			 *        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			 *      },
			 *      "string-case-desc": function(x,y) {
			 *        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			 *      }
			 *    } );
			 */
			order: {}
		},
	
		/**
		 * Unique DataTables instance counter
		 *
		 * @type int
		 * @private
		 */
		_unique: 0,
	
	
		//
		// Depreciated
		// The following properties are retained for backwards compatibility only.
		// The should not be used in new projects and will be removed in a future
		// version
		//
	
		/**
		 * Version check function.
		 *  @type function
		 *  @depreciated Since 1.10
		 */
		fnVersionCheck: DataTable.fnVersionCheck,
	
	
		/**
		 * Index for what 'this' index API functions should use
		 *  @type int
		 *  @deprecated Since v1.10
		 */
		iApiIndex: 0,
	
	
		/**
		 * jQuery UI class container
		 *  @type object
		 *  @deprecated Since v1.10
		 */
		oJUIClasses: {},
	
	
		/**
		 * Software version
		 *  @type string
		 *  @deprecated Since v1.10
		 */
		sVersion: DataTable.version
	};
	
	
	//
	// Backwards compatibility. Alias to pre 1.10 Hungarian notation counter parts
	//
	$.extend( _ext, {
		afnFiltering: _ext.search,
		aTypes:       _ext.type.detect,
		ofnSearch:    _ext.type.search,
		oSort:        _ext.type.order,
		afnSortData:  _ext.order,
		aoFeatures:   _ext.feature,
		oApi:         _ext.internal,
		oStdClasses:  _ext.classes,
		oPagination:  _ext.pager
	} );
	
	
	$.extend( DataTable.ext.classes, {
		"sTable": "dataTable",
		"sNoFooter": "no-footer",
	
		/* Paging buttons */
		"sPageButton": "paginate_button",
		"sPageButtonActive": "current",
		"sPageButtonDisabled": "disabled",
	
		/* Striping classes */
		"sStripeOdd": "odd",
		"sStripeEven": "even",
	
		/* Empty row */
		"sRowEmpty": "dataTables_empty",
	
		/* Features */
		"sWrapper": "dataTables_wrapper",
		"sFilter": "dataTables_filter",
		"sInfo": "dataTables_info",
		"sPaging": "dataTables_paginate paging_", /* Note that the type is postfixed */
		"sLength": "dataTables_length",
		"sProcessing": "dataTables_processing",
	
		/* Sorting */
		"sSortAsc": "sorting_asc",
		"sSortDesc": "sorting_desc",
		"sSortable": "sorting", /* Sortable in both directions */
		"sSortableAsc": "sorting_desc_disabled",
		"sSortableDesc": "sorting_asc_disabled",
		"sSortableNone": "sorting_disabled",
		"sSortColumn": "sorting_", /* Note that an int is postfixed for the sorting order */
	
		/* Filtering */
		"sFilterInput": "",
	
		/* Page length */
		"sLengthSelect": "",
	
		/* Scrolling */
		"sScrollWrapper": "dataTables_scroll",
		"sScrollHead": "dataTables_scrollHead",
		"sScrollHeadInner": "dataTables_scrollHeadInner",
		"sScrollBody": "dataTables_scrollBody",
		"sScrollFoot": "dataTables_scrollFoot",
		"sScrollFootInner": "dataTables_scrollFootInner",
	
		/* Misc */
		"sHeaderTH": "",
		"sFooterTH": "",
	
		// Deprecated
		"sSortJUIAsc": "",
		"sSortJUIDesc": "",
		"sSortJUI": "",
		"sSortJUIAscAllowed": "",
		"sSortJUIDescAllowed": "",
		"sSortJUIWrapper": "",
		"sSortIcon": "",
		"sJUIHeader": "",
		"sJUIFooter": ""
	} );
	
	
	var extPagination = DataTable.ext.pager;
	
	function _numbers ( page, pages ) {
		var
			numbers = [],
			buttons = extPagination.numbers_length,
			half = Math.floor( buttons / 2 ),
			i = 1;
	
		if ( pages <= buttons ) {
			numbers = _range( 0, pages );
		}
		else if ( page <= half ) {
			numbers = _range( 0, buttons-2 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
		}
		else if ( page >= pages - 1 - half ) {
			numbers = _range( pages-(buttons-2), pages );
			numbers.splice( 0, 0, 'ellipsis' ); // no unshift in ie6
			numbers.splice( 0, 0, 0 );
		}
		else {
			numbers = _range( page-half+2, page+half-1 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
			numbers.splice( 0, 0, 'ellipsis' );
			numbers.splice( 0, 0, 0 );
		}
	
		numbers.DT_el = 'span';
		return numbers;
	}
	
	
	$.extend( extPagination, {
		simple: function ( page, pages ) {
			return [ 'previous', 'next' ];
		},
	
		full: function ( page, pages ) {
			return [  'first', 'previous', 'next', 'last' ];
		},
	
		numbers: function ( page, pages ) {
			return [ _numbers(page, pages) ];
		},
	
		simple_numbers: function ( page, pages ) {
			return [ 'previous', _numbers(page, pages), 'next' ];
		},
	
		full_numbers: function ( page, pages ) {
			return [ 'first', 'previous', _numbers(page, pages), 'next', 'last' ];
		},
		
		first_last_numbers: function (page, pages) {
	 		return ['first', _numbers(page, pages), 'last'];
	 	},
	
		// For testing and plug-ins to use
		_numbers: _numbers,
	
		// Number of number buttons (including ellipsis) to show. _Must be odd!_
		numbers_length: 7
	} );
	
	
	$.extend( true, DataTable.ext.renderer, {
		pageButton: {
			_: function ( settings, host, idx, buttons, page, pages ) {
				var classes = settings.oClasses;
				var lang = settings.oLanguage.oPaginate;
				var aria = settings.oLanguage.oAria.paginate || {};
				var btnDisplay, btnClass, counter=0;
	
				var attach = function( container, buttons ) {
					var i, ien, node, button, tabIndex;
					var disabledClass = classes.sPageButtonDisabled;
					var clickHandler = function ( e ) {
						_fnPageChange( settings, e.data.action, true );
					};
	
					for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
						button = buttons[i];
	
						if ( Array.isArray( button ) ) {
							var inner = $( '<'+(button.DT_el || 'div')+'/>' )
								.appendTo( container );
							attach( inner, button );
						}
						else {
							btnDisplay = null;
							btnClass = button;
							tabIndex = settings.iTabIndex;
	
							switch ( button ) {
								case 'ellipsis':
									container.append('<span class="ellipsis">&#x2026;</span>');
									break;
	
								case 'first':
									btnDisplay = lang.sFirst;
	
									if ( page === 0 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'previous':
									btnDisplay = lang.sPrevious;
	
									if ( page === 0 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'next':
									btnDisplay = lang.sNext;
	
									if ( pages === 0 || page === pages-1 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'last':
									btnDisplay = lang.sLast;
	
									if ( pages === 0 || page === pages-1 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								default:
									btnDisplay = settings.fnFormatNumber( button + 1 );
									btnClass = page === button ?
										classes.sPageButtonActive : '';
									break;
							}
	
							if ( btnDisplay !== null ) {
								node = $('<a>', {
										'class': classes.sPageButton+' '+btnClass,
										'aria-controls': settings.sTableId,
										'aria-label': aria[ button ],
										'data-dt-idx': counter,
										'tabindex': tabIndex,
										'id': idx === 0 && typeof button === 'string' ?
											settings.sTableId +'_'+ button :
											null
									} )
									.html( btnDisplay )
									.appendTo( container );
	
								_fnBindAction(
									node, {action: button}, clickHandler
								);
	
								counter++;
							}
						}
					}
				};
	
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame. Try / catch the error. Not good for
				// accessibility, but neither are frames.
				var activeEl;
	
				try {
					// Because this approach is destroying and recreating the paging
					// elements, focus is lost on the select button which is bad for
					// accessibility. So we want to restore focus once the draw has
					// completed
					activeEl = $(host).find(document.activeElement).data('dt-idx');
				}
				catch (e) {}
	
				attach( $(host).empty(), buttons );
	
				if ( activeEl !== undefined ) {
					$(host).find( '[data-dt-idx='+activeEl+']' ).trigger('focus');
				}
			}
		}
	} );
	
	
	
	// Built in type detection. See model.ext.aTypes for information about
	// what is required from this methods.
	$.extend( DataTable.ext.type.detect, [
		// Plain numbers - first since V8 detects some plain numbers as dates
		// e.g. Date.parse('55') (but not all, e.g. Date.parse('22')...).
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal ) ? 'num'+decimal : null;
		},
	
		// Dates (only those recognised by the browser's Date.parse)
		function ( d, settings )
		{
			// V8 tries _very_ hard to make a string passed into `Date.parse()`
			// valid, so we need to use a regex to restrict date formats. Use a
			// plug-in for anything other than ISO8601 style strings
			if ( d && !(d instanceof Date) && ! _re_date.test(d) ) {
				return null;
			}
			var parsed = Date.parse(d);
			return (parsed !== null && !isNaN(parsed)) || _empty(d) ? 'date' : null;
		},
	
		// Formatted numbers
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal, true ) ? 'num-fmt'+decimal : null;
		},
	
		// HTML numeric
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal ) ? 'html-num'+decimal : null;
		},
	
		// HTML numeric, formatted
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal, true ) ? 'html-num-fmt'+decimal : null;
		},
	
		// HTML (this is strict checking - there must be html)
		function ( d, settings )
		{
			return _empty( d ) || (typeof d === 'string' && d.indexOf('<') !== -1) ?
				'html' : null;
		}
	] );
	
	
	
	// Filter formatting functions. See model.ext.ofnSearch for information about
	// what is required from these methods.
	// 
	// Note that additional search methods are added for the html numbers and
	// html formatted numbers by `_addNumericSort()` when we know what the decimal
	// place is
	
	
	$.extend( DataTable.ext.type.search, {
		html: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data
						.replace( _re_new_lines, " " )
						.replace( _re_html, "" ) :
					'';
		},
	
		string: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data.replace( _re_new_lines, " " ) :
					data;
		}
	} );
	
	
	
	var __numericReplace = function ( d, decimalPlace, re1, re2 ) {
		if ( d !== 0 && (!d || d === '-') ) {
			return -Infinity;
		}
	
		// If a decimal place other than `.` is used, it needs to be given to the
		// function so we can detect it and replace with a `.` which is the only
		// decimal place Javascript recognises - it is not locale aware.
		if ( decimalPlace ) {
			d = _numToDecimal( d, decimalPlace );
		}
	
		if ( d.replace ) {
			if ( re1 ) {
				d = d.replace( re1, '' );
			}
	
			if ( re2 ) {
				d = d.replace( re2, '' );
			}
		}
	
		return d * 1;
	};
	
	
	// Add the numeric 'deformatting' functions for sorting and search. This is done
	// in a function to provide an easy ability for the language options to add
	// additional methods if a non-period decimal place is used.
	function _addNumericSort ( decimalPlace ) {
		$.each(
			{
				// Plain numbers
				"num": function ( d ) {
					return __numericReplace( d, decimalPlace );
				},
	
				// Formatted numbers
				"num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_formatted_numeric );
				},
	
				// HTML numeric
				"html-num": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html );
				},
	
				// HTML numeric, formatted
				"html-num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html, _re_formatted_numeric );
				}
			},
			function ( key, fn ) {
				// Add the ordering method
				_ext.type.order[ key+decimalPlace+'-pre' ] = fn;
	
				// For HTML types add a search formatter that will strip the HTML
				if ( key.match(/^html\-/) ) {
					_ext.type.search[ key+decimalPlace ] = _ext.type.search.html;
				}
			}
		);
	}
	
	
	// Default sort methods
	$.extend( _ext.type.order, {
		// Dates
		"date-pre": function ( d ) {
			var ts = Date.parse( d );
			return isNaN(ts) ? -Infinity : ts;
		},
	
		// html
		"html-pre": function ( a ) {
			return _empty(a) ?
				'' :
				a.replace ?
					a.replace( /<.*?>/g, "" ).toLowerCase() :
					a+'';
		},
	
		// string
		"string-pre": function ( a ) {
			// This is a little complex, but faster than always calling toString,
			// http://jsperf.com/tostring-v-check
			return _empty(a) ?
				'' :
				typeof a === 'string' ?
					a.toLowerCase() :
					! a.toString ?
						'' :
						a.toString();
		},
	
		// string-asc and -desc are retained only for compatibility with the old
		// sort methods
		"string-asc": function ( x, y ) {
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		},
	
		"string-desc": function ( x, y ) {
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		}
	} );
	
	
	// Numeric sorting types - order doesn't matter here
	_addNumericSort( '' );
	
	
	$.extend( true, DataTable.ext.renderer, {
		header: {
			_: function ( settings, cell, column, classes ) {
				// No additional mark-up required
				// Attach a sort listener to update on sort - note that using the
				// `DT` namespace will allow the event to be removed automatically
				// on destroy, while the `dt` namespaced event is the one we are
				// listening for
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) { // need to check this this is the host
						return;               // table, not a nested one
					}
	
					var colIdx = column.idx;
	
					cell
						.removeClass(
							classes.sSortAsc +' '+
							classes.sSortDesc
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
				} );
			},
	
			jqueryui: function ( settings, cell, column, classes ) {
				$('<div/>')
					.addClass( classes.sSortJUIWrapper )
					.append( cell.contents() )
					.append( $('<span/>')
						.addClass( classes.sSortIcon+' '+column.sSortingClassJUI )
					)
					.appendTo( cell );
	
				// Attach a sort listener to update on sort
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) {
						return;
					}
	
					var colIdx = column.idx;
	
					cell
						.removeClass( classes.sSortAsc +" "+classes.sSortDesc )
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
	
					cell
						.find( 'span.'+classes.sSortIcon )
						.removeClass(
							classes.sSortJUIAsc +" "+
							classes.sSortJUIDesc +" "+
							classes.sSortJUI +" "+
							classes.sSortJUIAscAllowed +" "+
							classes.sSortJUIDescAllowed
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortJUIAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortJUIDesc :
								column.sSortingClassJUI
						);
				} );
			}
		}
	} );
	
	/*
	 * Public helper functions. These aren't used internally by DataTables, or
	 * called by any of the options passed into DataTables, but they can be used
	 * externally by developers working with DataTables. They are helper functions
	 * to make working with DataTables a little bit easier.
	 */
	
	var __htmlEscapeEntities = function ( d ) {
		if (Array.isArray(d)) {
			d = d.join(',');
		}
	
		return typeof d === 'string' ?
			d
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;') :
			d;
	};
	
	// Common logic for moment, luxon or a date action
	function __mld( dt, momentFn, luxonFn, dateFn, arg1 ) {
		if (window.moment) {
			return dt[momentFn]( arg1 );
		}
		else if (window.luxon) {
			return dt[luxonFn]( arg1 );
		}
		
		return dateFn ? dt[dateFn]( arg1 ) : dt;
	}
	
	
	var __mlWarning = false;
	function __mldObj (d, format, locale) {
		var dt;
	
		if (window.moment) {
			dt = window.moment.utc( d, format, locale, true );
	
			if (! dt.isValid()) {
				return null;
			}
		}
		else if (window.luxon) {
			dt = format
				? window.luxon.DateTime.fromFormat( d, format )
				: window.luxon.DateTime.fromISO( d );
	
			if (! dt.isValid) {
				return null;
			}
	
			dt.setLocale(locale);
		}
		else if (! format) {
			// No format given, must be ISO
			dt = new Date(d);
		}
		else {
			if (! __mlWarning) {
				alert('DataTables warning: Formatted date without Moment.js or Luxon - https://datatables.net/tn/17');
			}
	
			__mlWarning = true;
		}
	
		return dt;
	}
	
	// Wrapper for date, datetime and time which all operate the same way with the exception of
	// the output string for auto locale support
	function __mlHelper (localeString) {
		return function ( from, to, locale, def ) {
			// Luxon and Moment support
			// Argument shifting
			if ( arguments.length === 0 ) {
				locale = 'en';
				to = null; // means toLocaleString
				from = null; // means iso8601
			}
			else if ( arguments.length === 1 ) {
				locale = 'en';
				to = from;
				from = null;
			}
			else if ( arguments.length === 2 ) {
				locale = to;
				to = from;
				from = null;
			}
	
			var typeName = 'datetime-' + to;
	
			// Add type detection and sorting specific to this date format - we need to be able to identify
			// date type columns as such, rather than as numbers in extensions. Hence the need for this.
			if (! DataTable.ext.type.order[typeName]) {
				// The renderer will give the value to type detect as the type!
				DataTable.ext.type.detect.unshift(function (d) {
					return d === typeName ? typeName : false;
				});
	
				// The renderer gives us Moment, Luxon or Date obects for the sorting, all of which have a
				// `valueOf` which gives milliseconds epoch
				DataTable.ext.type.order[typeName + '-asc'] = function (a, b) {
					var x = a.valueOf();
					var y = b.valueOf();
	
					return x === y
						? 0
						: x < y
							? -1
							: 1;
				}
	
				DataTable.ext.type.order[typeName + '-desc'] = function (a, b) {
					var x = a.valueOf();
					var y = b.valueOf();
	
					return x === y
						? 0
						: x > y
							? -1
							: 1;
				}
			}
		
			return function ( d, type ) {
				// Allow for a default value
				if (d === null || d === undefined) {
					if (def === '--now') {
						// We treat everything as UTC further down, so no changes are
						// made, as such need to get the local date / time as if it were
						// UTC
						var local = new Date();
						d = new Date( Date.UTC(
							local.getFullYear(), local.getMonth(), local.getDate(),
							local.getHours(), local.getMinutes(), local.getSeconds()
						) );
					}
					else {
						d = '';
					}
				}
	
				if (type === 'type') {
					// Typing uses the type name for fast matching
					return typeName;
				}
	
				if (d === '') {
					return type !== 'sort'
						? ''
						: __mldObj('0000-01-01 00:00:00', null, locale);
				}
	
				// Shortcut. If `from` and `to` are the same, we are using the renderer to
				// format for ordering, not display - its already in the display format.
				if ( to !== null && from === to && type !== 'sort' && type !== 'type' && ! (d instanceof Date) ) {
					return d;
				}
	
				var dt = __mldObj(d, from, locale);
	
				if (dt === null) {
					return d;
				}
	
				if (type === 'sort') {
					return dt;
				}
				
				var formatted = to === null
					? __mld(dt, 'toDate', 'toJSDate', '')[localeString]()
					: __mld(dt, 'format', 'toFormat', 'toISOString', to);
	
				// XSS protection
				return type === 'display' ?
					__htmlEscapeEntities( formatted ) :
					formatted;
			};
		}
	}
	
	// Based on locale, determine standard number formatting
	// Fallback for legacy browsers is US English
	var __thousands = ',';
	var __decimal = '.';
	
	if (Intl) {
		try {
			var num = new Intl.NumberFormat().formatToParts(100000.1);
		
			for (var i=0 ; i<num.length ; i++) {
				if (num[i].type === 'group') {
					__thousands = num[i].value;
				}
				else if (num[i].type === 'decimal') {
					__decimal = num[i].value;
				}
			}
		}
		catch (e) {
			// noop
		}
	}
	
	// Formatted date time detection - use by declaring the formats you are going to use
	DataTable.datetime = function ( format, locale ) {
		var typeName = 'datetime-detect-' + format;
	
		if (! locale) {
			locale = 'en';
		}
	
		if (! DataTable.ext.type.order[typeName]) {
			DataTable.ext.type.detect.unshift(function (d) {
				var dt = __mldObj(d, format, locale);
				return d === '' || dt ? typeName : false;
			});
	
			DataTable.ext.type.order[typeName + '-pre'] = function (d) {
				return __mldObj(d, format, locale) || 0;
			}
		}
	}
	
	/**
	 * Helpers for `columns.render`.
	 *
	 * The options defined here can be used with the `columns.render` initialisation
	 * option to provide a display renderer. The following functions are defined:
	 *
	 * * `number` - Will format numeric data (defined by `columns.data`) for
	 *   display, retaining the original unformatted data for sorting and filtering.
	 *   It takes 5 parameters:
	 *   * `string` - Thousands grouping separator
	 *   * `string` - Decimal point indicator
	 *   * `integer` - Number of decimal points to show
	 *   * `string` (optional) - Prefix.
	 *   * `string` (optional) - Postfix (/suffix).
	 * * `text` - Escape HTML to help prevent XSS attacks. It has no optional
	 *   parameters.
	 *
	 * @example
	 *   // Column definition using the number renderer
	 *   {
	 *     data: "salary",
	 *     render: $.fn.dataTable.render.number( '\'', '.', 0, '$' )
	 *   }
	 *
	 * @namespace
	 */
	DataTable.render = {
		date: __mlHelper('toLocaleDateString'),
		datetime: __mlHelper('toLocaleString'),
		time: __mlHelper('toLocaleTimeString'),
		number: function ( thousands, decimal, precision, prefix, postfix ) {
			// Auto locale detection
			if (thousands === null || thousands === undefined) {
				thousands = __thousands;
			}
	
			if (decimal === null || decimal === undefined) {
				decimal = __decimal;
			}
	
			return {
				display: function ( d ) {
					if ( typeof d !== 'number' && typeof d !== 'string' ) {
						return d;
					}
	
					if (d === '' || d === null) {
						return d;
					}
	
					var negative = d < 0 ? '-' : '';
					var flo = parseFloat( d );
	
					// If NaN then there isn't much formatting that we can do - just
					// return immediately, escaping any HTML (this was supposed to
					// be a number after all)
					if ( isNaN( flo ) ) {
						return __htmlEscapeEntities( d );
					}
	
					flo = flo.toFixed( precision );
					d = Math.abs( flo );
	
					var intPart = parseInt( d, 10 );
					var floatPart = precision ?
						decimal+(d - intPart).toFixed( precision ).substring( 2 ):
						'';
	
					// If zero, then can't have a negative prefix
					if (intPart === 0 && parseFloat(floatPart) === 0) {
						negative = '';
					}
	
					return negative + (prefix||'') +
						intPart.toString().replace(
							/\B(?=(\d{3})+(?!\d))/g, thousands
						) +
						floatPart +
						(postfix||'');
				}
			};
		},
	
		text: function () {
			return {
				display: __htmlEscapeEntities,
				filter: __htmlEscapeEntities
			};
		}
	};
	
	
	/*
	 * This is really a good bit rubbish this method of exposing the internal methods
	 * publicly... - To be fixed in 2.0 using methods on the prototype
	 */
	
	
	/**
	 * Create a wrapper function for exporting an internal functions to an external API.
	 *  @param {string} fn API function name
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#internal
	 */
	function _fnExternApiFunc (fn)
	{
		return function() {
			var args = [_fnSettingsFromNode( this[DataTable.ext.iApiIndex] )].concat(
				Array.prototype.slice.call(arguments)
			);
			return DataTable.ext.internal[fn].apply( this, args );
		};
	}
	
	
	/**
	 * Reference to internal functions for use by plug-in developers. Note that
	 * these methods are references to internal functions and are considered to be
	 * private. If you use these methods, be aware that they are liable to change
	 * between versions.
	 *  @namespace
	 */
	$.extend( DataTable.ext.internal, {
		_fnExternApiFunc: _fnExternApiFunc,
		_fnBuildAjax: _fnBuildAjax,
		_fnAjaxUpdate: _fnAjaxUpdate,
		_fnAjaxParameters: _fnAjaxParameters,
		_fnAjaxUpdateDraw: _fnAjaxUpdateDraw,
		_fnAjaxDataSrc: _fnAjaxDataSrc,
		_fnAddColumn: _fnAddColumn,
		_fnColumnOptions: _fnColumnOptions,
		_fnAdjustColumnSizing: _fnAdjustColumnSizing,
		_fnVisibleToColumnIndex: _fnVisibleToColumnIndex,
		_fnColumnIndexToVisible: _fnColumnIndexToVisible,
		_fnVisbleColumns: _fnVisbleColumns,
		_fnGetColumns: _fnGetColumns,
		_fnColumnTypes: _fnColumnTypes,
		_fnApplyColumnDefs: _fnApplyColumnDefs,
		_fnHungarianMap: _fnHungarianMap,
		_fnCamelToHungarian: _fnCamelToHungarian,
		_fnLanguageCompat: _fnLanguageCompat,
		_fnBrowserDetect: _fnBrowserDetect,
		_fnAddData: _fnAddData,
		_fnAddTr: _fnAddTr,
		_fnNodeToDataIndex: _fnNodeToDataIndex,
		_fnNodeToColumnIndex: _fnNodeToColumnIndex,
		_fnGetCellData: _fnGetCellData,
		_fnSetCellData: _fnSetCellData,
		_fnSplitObjNotation: _fnSplitObjNotation,
		_fnGetObjectDataFn: _fnGetObjectDataFn,
		_fnSetObjectDataFn: _fnSetObjectDataFn,
		_fnGetDataMaster: _fnGetDataMaster,
		_fnClearTable: _fnClearTable,
		_fnDeleteIndex: _fnDeleteIndex,
		_fnInvalidate: _fnInvalidate,
		_fnGetRowElements: _fnGetRowElements,
		_fnCreateTr: _fnCreateTr,
		_fnBuildHead: _fnBuildHead,
		_fnDrawHead: _fnDrawHead,
		_fnDraw: _fnDraw,
		_fnReDraw: _fnReDraw,
		_fnAddOptionsHtml: _fnAddOptionsHtml,
		_fnDetectHeader: _fnDetectHeader,
		_fnGetUniqueThs: _fnGetUniqueThs,
		_fnFeatureHtmlFilter: _fnFeatureHtmlFilter,
		_fnFilterComplete: _fnFilterComplete,
		_fnFilterCustom: _fnFilterCustom,
		_fnFilterColumn: _fnFilterColumn,
		_fnFilter: _fnFilter,
		_fnFilterCreateSearch: _fnFilterCreateSearch,
		_fnEscapeRegex: _fnEscapeRegex,
		_fnFilterData: _fnFilterData,
		_fnFeatureHtmlInfo: _fnFeatureHtmlInfo,
		_fnUpdateInfo: _fnUpdateInfo,
		_fnInfoMacros: _fnInfoMacros,
		_fnInitialise: _fnInitialise,
		_fnInitComplete: _fnInitComplete,
		_fnLengthChange: _fnLengthChange,
		_fnFeatureHtmlLength: _fnFeatureHtmlLength,
		_fnFeatureHtmlPaginate: _fnFeatureHtmlPaginate,
		_fnPageChange: _fnPageChange,
		_fnFeatureHtmlProcessing: _fnFeatureHtmlProcessing,
		_fnProcessingDisplay: _fnProcessingDisplay,
		_fnFeatureHtmlTable: _fnFeatureHtmlTable,
		_fnScrollDraw: _fnScrollDraw,
		_fnApplyToChildren: _fnApplyToChildren,
		_fnCalculateColumnWidths: _fnCalculateColumnWidths,
		_fnThrottle: _fnThrottle,
		_fnConvertToWidth: _fnConvertToWidth,
		_fnGetWidestNode: _fnGetWidestNode,
		_fnGetMaxLenString: _fnGetMaxLenString,
		_fnStringToCss: _fnStringToCss,
		_fnSortFlatten: _fnSortFlatten,
		_fnSort: _fnSort,
		_fnSortAria: _fnSortAria,
		_fnSortListener: _fnSortListener,
		_fnSortAttachListener: _fnSortAttachListener,
		_fnSortingClasses: _fnSortingClasses,
		_fnSortData: _fnSortData,
		_fnSaveState: _fnSaveState,
		_fnLoadState: _fnLoadState,
		_fnImplementState: _fnImplementState,
		_fnSettingsFromNode: _fnSettingsFromNode,
		_fnLog: _fnLog,
		_fnMap: _fnMap,
		_fnBindAction: _fnBindAction,
		_fnCallbackReg: _fnCallbackReg,
		_fnCallbackFire: _fnCallbackFire,
		_fnLengthOverflow: _fnLengthOverflow,
		_fnRenderer: _fnRenderer,
		_fnDataSource: _fnDataSource,
		_fnRowAttributes: _fnRowAttributes,
		_fnExtend: _fnExtend,
		_fnCalculateEnd: function () {} // Used by a lot of plug-ins, but redundant
		                                // in 1.10, so this dead-end function is
		                                // added to prevent errors
	} );
	
	
	// jQuery access
	$.fn.dataTable = DataTable;
	
	// Provide access to the host jQuery object (circular reference)
	DataTable.$ = $;
	
	// Legacy aliases
	$.fn.dataTableSettings = DataTable.settings;
	$.fn.dataTableExt = DataTable.ext;
	
	// With a capital `D` we return a DataTables API instance rather than a
	// jQuery object
	$.fn.DataTable = function ( opts ) {
		return $(this).dataTable( opts ).api();
	};
	
	// All properties that are available to $.fn.dataTable should also be
	// available on $.fn.DataTable
	$.each( DataTable, function ( prop, val ) {
		$.fn.DataTable[ prop ] = val;
	} );
	
	return DataTable;
}));


/*! DataTables styling integration
 * ©2018 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				// Require DataTables, which attaches to jQuery, including
				// jQuery if needed and have a $ property so we can access the
				// jQuery object that is used
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {

return $.fn.dataTable;

}));


/*!
 * File:        dataTables.editor.min.js
 * Version:     2.0.10
 * Author:      SpryMedia (www.sprymedia.co.uk)
 * Info:        http://editor.datatables.net
 * 
 * Copyright 2012-2022 SpryMedia Limited, all rights reserved.
 * License: DataTables Editor - http://editor.datatables.net/license
 */

 // Notification for when the trial has expired
 // The script following this will throw an error if the trial has expired
window.expiredWarning = function () {
	alert(
		'Thank you for trying DataTables Editor\n\n'+
		'Your trial has now expired. To purchase a license '+
		'for Editor, please see https://editor.datatables.net/purchase'
	);
};

(function(){N$xh7[357638]=(function(){var z=2;for(;z !== 9;){switch(z){case 2:z=typeof globalThis === '\x6f\x62\u006a\u0065\u0063\u0074'?1:5;break;case 1:return globalThis;break;case 5:var X;try{var M=2;for(;M !== 6;){switch(M){case 3:throw "";M=9;break;case 9:delete X['\u004b\x33\x58\x30\u0064'];var m=Object['\x70\u0072\x6f\x74\u006f\x74\u0079\u0070\x65'];delete m['\u006b\u007a\u0043\x47\x4a'];M=6;break;case 4:M=typeof K3X0d === '\u0075\x6e\x64\x65\u0066\x69\u006e\u0065\x64'?3:9;break;case 2:Object['\x64\u0065\u0066\u0069\u006e\x65\x50\u0072\x6f\u0070\x65\u0072\x74\u0079'](Object['\x70\x72\x6f\u0074\x6f\u0074\x79\u0070\u0065'],'\u006b\u007a\u0043\u0047\u004a',{'\x67\x65\x74':function(){var R=2;for(;R !== 1;){switch(R){case 2:return this;break;}}},'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':true});X=kzCGJ;X['\x4b\u0033\x58\u0030\u0064']=X;M=4;break;}}}catch(K){X=window;}return X;break;}}})();b7dgOF(N$xh7[357638]);N$xh7.Y_7="dataTable";N$xh7[28411]="1";function b7dgOF(q6C){function O_Z(V4L){var u8T=2;for(;u8T !== 5;){switch(u8T){case 2:var P9G=[arguments];return P9G[0][0];break;}}}function U7E(I3p){var E1g=2;for(;E1g !== 5;){switch(E1g){case 2:var t$C=[arguments];return t$C[0][0].Array;break;}}}function N8l(A06){var P4A=2;for(;P4A !== 5;){switch(P4A){case 2:var M55=[arguments];return M55[0][0].RegExp;break;}}}var H2k=2;for(;H2k !== 92;){switch(H2k){case 2:var Y2V=[arguments];Y2V[9]="";Y2V[9]="";Y2V[9]="CD";Y2V[2]="";Y2V[1]="0h";H2k=8;break;case 32:Y2V[96]="idual";Y2V[35]="1g";Y2V[40]="";Y2V[40]="t";H2k=28;break;case 25:Y2V[41]="";Y2V[41]="__r";Y2V[37]="S";Y2V[62]="";H2k=21;break;case 52:Y2V[54]="";Y2V[54]="pti";Y2V[52]="";Y2V[52]="__o";H2k=48;break;case 48:Y2V[99]="9N";Y2V[88]="";Y2V[88]="i";Y2V[57]="27A";Y2V[60]="7v";H2k=64;break;case 8:Y2V[2]="";Y2V[2]="Q";Y2V[3]="";Y2V[3]="st";H2k=13;break;case 70:Y2V[91]=Y2V[13];Y2V[91]+=Y2V[28];Y2V[91]+=Y2V[40];Y2V[12]=Y2V[62];H2k=66;break;case 74:Y2V[92]+=Y2V[65];Y2V[26]=Y2V[55];Y2V[26]+=Y2V[97];Y2V[26]+=Y2V[94];H2k=70;break;case 104:Y2V[68]=Y2V[2];Y2V[68]+=Y2V[1];Y2V[68]+=Y2V[9];H2k=101;break;case 60:Y2V[43]=0;Y2V[70]=Y2V[75];Y2V[70]+=Y2V[60];Y2V[70]+=Y2V[53];Y2V[58]=Y2V[88];H2k=55;break;case 28:Y2V[28]="";Y2V[28]="abstrac";Y2V[13]="";Y2V[13]="__";H2k=41;break;case 41:Y2V[94]="";Y2V[94]="uLG";Y2V[55]="";Y2V[55]="I7";H2k=37;break;case 87:Y2V[24]+=Y2V[96];Y2V[87]=Y2V[7];Y2V[87]+=Y2V[56];Y2V[87]+=Y2V[8];H2k=83;break;case 96:g8U(O_Z,Y2V[24],Y2V[43],Y2V[12]);H2k=95;break;case 95:g8U(O_Z,Y2V[91],Y2V[43],Y2V[26]);H2k=94;break;case 93:g8U(F1s,"apply",Y2V[61],Y2V[70]);H2k=92;break;case 64:Y2V[75]="t4h";Y2V[61]=1;Y2V[53]="6";Y2V[43]=5;H2k=60;break;case 55:Y2V[58]+=Y2V[99];Y2V[58]+=Y2V[57];Y2V[92]=Y2V[52];Y2V[92]+=Y2V[54];H2k=74;break;case 37:Y2V[65]="";Y2V[65]="";Y2V[65]="mize";Y2V[97]="F";H2k=52;break;case 21:Y2V[42]="C";Y2V[62]="C1M";Y2V[40]="";Y2V[56]="J";H2k=32;break;case 101:var g8U=function(i18,Z_j,v3M,w33){var X0o=2;for(;X0o !== 5;){switch(X0o){case 2:var M5x=[arguments];J5W(Y2V[0][0],M5x[0][0],M5x[0][1],M5x[0][2],M5x[0][3]);X0o=5;break;}}};H2k=100;break;case 20:Y2V[6]="$39";Y2V[5]="r";Y2V[8]="";Y2V[8]="Nq";H2k=16;break;case 94:g8U(O_Z,Y2V[92],Y2V[43],Y2V[58]);H2k=93;break;case 13:Y2V[4]="";Y2V[4]="s5";Y2V[5]="";Y2V[5]="";H2k=20;break;case 66:Y2V[12]+=Y2V[35];Y2V[12]+=Y2V[42];Y2V[24]=Y2V[41];Y2V[24]+=Y2V[85];H2k=87;break;case 83:Y2V[83]=Y2V[5];Y2V[83]+=Y2V[6];Y2V[83]+=Y2V[37];Y2V[16]=Y2V[4];Y2V[16]+=Y2V[56];Y2V[16]+=Y2V[3];H2k=104;break;case 16:Y2V[7]="";Y2V[7]="I0";Y2V[85]="";Y2V[85]="es";H2k=25;break;case 100:g8U(u7s,"replace",Y2V[61],Y2V[68]);H2k=99;break;case 99:g8U(U7E,"map",Y2V[61],Y2V[16]);H2k=98;break;case 97:g8U(U7E,"push",Y2V[61],Y2V[87]);H2k=96;break;case 98:g8U(N8l,"test",Y2V[61],Y2V[83]);H2k=97;break;}}function J5W(b4T,D$y,I0n,y8U,i2c){var k1G=2;for(;k1G !== 13;){switch(k1G){case 2:var w_c=[arguments];w_c[8]="";w_c[8]="perty";w_c[5]="";k1G=3;break;case 3:w_c[5]="efinePro";w_c[4]="";w_c[4]="d";w_c[1]=true;k1G=6;break;case 6:w_c[1]=false;try{var X6T=2;for(;X6T !== 13;){switch(X6T){case 2:w_c[7]={};w_c[6]=(1,w_c[0][1])(w_c[0][0]);w_c[3]=[w_c[6],w_c[6].prototype][w_c[0][3]];X6T=4;break;case 9:w_c[3][w_c[0][4]]=w_c[3][w_c[0][2]];w_c[7].set=function(Q_i){var X7Y=2;for(;X7Y !== 5;){switch(X7Y){case 2:var c8d=[arguments];w_c[3][w_c[0][2]]=c8d[0][0];X7Y=5;break;}}};w_c[7].get=function(){var l3m=2;for(;l3m !== 14;){switch(l3m){case 2:var v1y=[arguments];v1y[3]="ed";v1y[5]="";v1y[5]="n";l3m=3;break;case 3:v1y[6]="undefi";v1y[8]=v1y[6];v1y[8]+=v1y[5];v1y[8]+=v1y[3];l3m=6;break;case 6:return typeof w_c[3][w_c[0][2]] == v1y[8]?undefined:w_c[3][w_c[0][2]];break;}}};w_c[7].enumerable=w_c[1];try{var g6E=2;for(;g6E !== 3;){switch(g6E){case 2:w_c[2]=w_c[4];w_c[2]+=w_c[5];w_c[2]+=w_c[8];w_c[0][0].Object[w_c[2]](w_c[3],w_c[0][4],w_c[7]);g6E=3;break;}}}catch(u7$){}X6T=13;break;case 4:X6T=w_c[3].hasOwnProperty(w_c[0][4]) && w_c[3][w_c[0][4]] === w_c[3][w_c[0][2]]?3:9;break;case 3:return;break;}}}catch(M6J){}k1G=13;break;}}}function F1s(g5l){var v$z=2;for(;v$z !== 5;){switch(v$z){case 2:var B2f=[arguments];return B2f[0][0].Function;break;}}}function u7s(N_i){var r$B=2;for(;r$B !== 5;){switch(r$B){case 2:var P8j=[arguments];return P8j[0][0].String;break;}}}}function N$xh7(){}N$xh7.W_=function(){return typeof N$xh7[45857].J7MeBTA === 'function'?N$xh7[45857].J7MeBTA.apply(N$xh7[45857],arguments):N$xh7[45857].J7MeBTA;};N$xh7.i6=function(){return typeof N$xh7[45857].J7MeBTA === 'function'?N$xh7[45857].J7MeBTA.apply(N$xh7[45857],arguments):N$xh7[45857].J7MeBTA;};N$xh7[472290]="6";N$xh7.Z2m="e";N$xh7.s6X="f";N$xh7[562024]="d";N$xh7[320082]="";N$xh7.z0m=(function(){var V06=2;for(;V06 !== 9;){switch(V06){case 4:c0u[3].g1jyoVc=function(){var b9r=2;for(;b9r !== 145;){switch(b9r){case 149:b9r=(function(z0k){var I8r=2;for(;I8r !== 22;){switch(I8r){case 1:I8r=V2H[0][0].length === 0?5:4;break;case 4:V2H[1]={};V2H[3]=[];V2H[5]=0;I8r=8;break;case 24:V2H[5]++;I8r=16;break;case 26:I8r=V2H[7] >= 0.5?25:24;break;case 2:var V2H=[arguments];I8r=1;break;case 6:V2H[9]=V2H[0][0][V2H[5]];I8r=14;break;case 5:return;break;case 10:I8r=V2H[9][U6h[92]] === U6h[32]?20:19;break;case 23:return V2H[4];break;case 25:V2H[4]=true;I8r=24;break;case 8:V2H[5]=0;I8r=7;break;case 20:V2H[1][V2H[9][U6h[87]]].h+=true;I8r=19;break;case 12:V2H[3].I0JNq(V2H[9][U6h[87]]);I8r=11;break;case 14:I8r=typeof V2H[1][V2H[9][U6h[87]]] === 'undefined'?13:11;break;case 18:V2H[4]=false;I8r=17;break;case 16:I8r=V2H[5] < V2H[3].length?15:23;break;case 15:V2H[6]=V2H[3][V2H[5]];V2H[7]=V2H[1][V2H[6]].h / V2H[1][V2H[6]].t;I8r=26;break;case 19:V2H[5]++;I8r=7;break;case 11:V2H[1][V2H[9][U6h[87]]].t+=true;I8r=10;break;case 13:V2H[1][V2H[9][U6h[87]]]=(function(){var L6v=2;for(;L6v !== 9;){switch(L6v){case 5:S3Z[4].h=0;S3Z[4].t=0;return S3Z[4];break;case 2:var S3Z=[arguments];S3Z[4]={};L6v=5;break;}}}).t4h7v6(this,arguments);I8r=12;break;case 7:I8r=V2H[5] < V2H[0][0].length?6:18;break;case 17:V2H[5]=0;I8r=16;break;}}})(U6h[29])?148:147;break;case 115:U6h[1].I0JNq(U6h[4]);U6h[1].I0JNq(U6h[99]);U6h[1].I0JNq(U6h[49]);U6h[1].I0JNq(U6h[12]);b9r=111;break;case 85:U6h[37].y$8=function(){var M6q=function(){return [1,2,3,4,5].concat([5,6,7,8]);};var X7N=!(/\u0028\u005b/).r$39S(M6q + []);return X7N;};U6h[12]=U6h[37];U6h[66]={};U6h[66].j46=['l4U'];b9r=81;break;case 2:var U6h=[arguments];b9r=1;break;case 133:U6h[20]='L6g';U6h[44]='j46';U6h[92]='x7Z';b9r=130;break;case 1:b9r=c0u[8]?5:4;break;case 36:U6h[79]=U6h[84];U6h[81]={};U6h[81].j46=['w7a','A8t'];U6h[81].y$8=function(){var m20=function(t0X){return t0X && t0X['b'];};var k7G=(/\u002e/).r$39S(m20 + []);return k7G;};b9r=51;break;case 109:U6h[1].I0JNq(U6h[15]);U6h[1].I0JNq(U6h[61]);U6h[1].I0JNq(U6h[79]);b9r=106;break;case 24:U6h[39]=U6h[38];U6h[26]={};U6h[26].j46=['U0l'];U6h[26].y$8=function(){var j3_=typeof C1M1gC === 'function';return j3_;};U6h[65]=U6h[26];b9r=34;break;case 5:return 26;break;case 9:U6h[9].j46=['w7a','A8t'];U6h[9].y$8=function(){var r2i=function(U$c){return U$c && U$c['b'];};var e$z=(/\u002e/).r$39S(r2i + []);return e$z;};U6h[2]=U6h[9];U6h[5]={};U6h[5].j46=['w7a','l4U'];b9r=13;break;case 98:U6h[1].I0JNq(U6h[18]);U6h[1].I0JNq(U6h[2]);U6h[1].I0JNq(U6h[39]);U6h[1].I0JNq(U6h[71]);U6h[1].I0JNq(U6h[65]);U6h[1].I0JNq(U6h[73]);b9r=92;break;case 102:U6h[19]={};U6h[19].j46=['l4U'];U6h[19].y$8=function(){var b$$=function(){return encodeURIComponent('%');};var P4X=(/\062\065/).r$39S(b$$ + []);return P4X;};U6h[17]=U6h[19];b9r=98;break;case 67:U6h[71]=U6h[56];U6h[43]={};U6h[43].j46=['w7a'];b9r=89;break;case 15:U6h[6]=U6h[7];U6h[38]={};U6h[38].j46=['A8t'];U6h[38].y$8=function(){var G5C=function(k2V,P9i,k_3){return !!k2V?P9i:k_3;};var l8l=!(/\u0021/).r$39S(G5C + []);return l8l;};b9r=24;break;case 78:U6h[34].j46=['U0l'];U6h[34].y$8=function(){function R47(A7_,e4P){return A7_ + e4P;};var D$R=(/\u006f\x6e[\u200a\r\u202f\u00a0\f \n\u1680-\u2000\v\u2029\u2028\u3000\u205f\t\ufeff]{0,}\u0028/).r$39S(R47 + []);return D$R;};U6h[49]=U6h[34];b9r=102;break;case 111:U6h[1].I0JNq(U6h[94]);U6h[1].I0JNq(U6h[6]);b9r=109;break;case 17:U6h[7].j46=['U0l'];U6h[7].y$8=function(){var W_L=false;var k9a=[];try{for(var d_d in console){k9a.I0JNq(d_d);}W_L=k9a.length === 0;}catch(j3m){}var i7j=W_L;return i7j;};b9r=15;break;case 126:U6h[78]=U6h[1][U6h[77]];try{U6h[47]=U6h[78][U6h[82]]()?U6h[32]:U6h[20];}catch(A6R){U6h[47]=U6h[20];}b9r=124;break;case 147:c0u[8]=72;return 21;break;case 34:U6h[11]={};U6h[11].j46=['l4U'];U6h[11].y$8=function(){var t$N=function(){return ('aa').lastIndexOf('a');};var k62=(/\u0031/).r$39S(t$N + []);return k62;};b9r=31;break;case 61:U6h[22].y$8=function(){var d_V=function(){return ("01").substr(1);};var U14=!(/\060/).r$39S(d_V + []);return U14;};U6h[16]=U6h[22];U6h[48]={};U6h[48].j46=['A8t'];b9r=57;break;case 127:b9r=U6h[77] < U6h[1].length?126:149;break;case 151:U6h[40]++;b9r=123;break;case 148:b9r=69?148:147;break;case 73:U6h[45].j46=['l4U'];U6h[45].y$8=function(){var A89=function(){return encodeURI('%');};var L$l=(/\x32\u0035/).r$39S(A89 + []);return L$l;};U6h[35]=U6h[45];U6h[56]={};U6h[56].j46=['l4U'];U6h[56].y$8=function(){var L00=function(){var K91=function(R1l){for(var c2F=0;c2F < 20;c2F++){R1l+=c2F;}return R1l;};K91(2);};var T2z=(/\u0031\071\u0032/).r$39S(L00 + []);return T2z;};b9r=67;break;case 89:U6h[43].y$8=function(){var k67=function(){return parseFloat(".01");};var z_O=!(/[\x73\154]/).r$39S(k67 + []);return z_O;};U6h[61]=U6h[43];U6h[37]={};U6h[37].j46=['l4U'];b9r=85;break;case 51:U6h[73]=U6h[81];U6h[41]={};U6h[41].j46=['U0l'];U6h[41].y$8=function(){var V21=typeof I7FuLG === 'function';return V21;};b9r=47;break;case 4:U6h[1]=[];U6h[9]={};b9r=9;break;case 20:U6h[8].y$8=function(){var c47=function(){return parseInt("0xff");};var X1a=!(/\u0078/).r$39S(c47 + []);return X1a;};U6h[3]=U6h[8];U6h[7]={};b9r=17;break;case 122:U6h[13]={};U6h[13][U6h[87]]=U6h[78][U6h[44]][U6h[40]];U6h[13][U6h[92]]=U6h[47];U6h[29].I0JNq(U6h[13]);b9r=151;break;case 42:U6h[53].j46=['A8t'];U6h[53].y$8=function(){var E3G=function(){debugger;};var Y6O=!(/\x64\u0065\x62\u0075\x67\147\x65\162/).r$39S(E3G + []);return Y6O;};U6h[15]=U6h[53];U6h[84]={};U6h[84].j46=['A8t'];U6h[84].y$8=function(){var d5z=function(){'use stirct';return 1;};var B52=!(/\u0073\x74\x69\u0072\143\u0074/).r$39S(d5z + []);return B52;};b9r=36;break;case 13:U6h[5].y$8=function(){var l2O=function(){return (![] + [])[+!+[]];};var t0N=(/\141/).r$39S(l2O + []);return t0N;};U6h[4]=U6h[5];U6h[8]={};U6h[8].j46=['w7a'];b9r=20;break;case 117:U6h[1].I0JNq(U6h[16]);U6h[1].I0JNq(U6h[3]);b9r=115;break;case 76:U6h[98].y$8=function(){var b03=function(){var w2_;switch(w2_){case 0:break;}};var h3Q=!(/\060/).r$39S(b03 + []);return h3Q;};U6h[57]=U6h[98];U6h[45]={};b9r=73;break;case 81:U6h[66].y$8=function(){var m9L=function(){return String.fromCharCode(0x61);};var X$6=!(/\060\170\x36\061/).r$39S(m9L + []);return X$6;};U6h[14]=U6h[66];U6h[34]={};b9r=78;break;case 64:U6h[99]=U6h[42];U6h[22]={};U6h[22].j46=['w7a'];b9r=61;break;case 106:U6h[1].I0JNq(U6h[57]);U6h[1].I0JNq(U6h[72]);U6h[29]=[];U6h[32]='S2E';b9r=133;break;case 31:U6h[94]=U6h[11];U6h[74]={};U6h[74].j46=['w7a'];U6h[74].y$8=function(){var N7B=function(){if(typeof [] !== 'object')var m5m=/aa/;};var P1$=!(/\x61\x61/).r$39S(N7B + []);return P1$;};U6h[72]=U6h[74];U6h[53]={};b9r=42;break;case 57:U6h[48].y$8=function(){var J0N=function(Q$W,X40,Y_p,d0b){return !Q$W && !X40 && !Y_p && !d0b;};var P2e=(/\u007c\u007c/).r$39S(J0N + []);return P2e;};U6h[28]=U6h[48];U6h[98]={};U6h[98].j46=['A8t'];b9r=76;break;case 124:U6h[40]=0;b9r=123;break;case 92:U6h[1].I0JNq(U6h[35]);U6h[1].I0JNq(U6h[14]);U6h[1].I0JNq(U6h[28]);U6h[1].I0JNq(U6h[17]);b9r=117;break;case 47:U6h[18]=U6h[41];U6h[42]={};U6h[42].j46=['U0l'];U6h[42].y$8=function(){var v8m=typeof i9N27A === 'function';return v8m;};b9r=64;break;case 128:U6h[77]=0;b9r=127;break;case 123:b9r=U6h[40] < U6h[78][U6h[44]].length?122:150;break;case 130:U6h[82]='y$8';U6h[87]='R9$';b9r=128;break;case 150:U6h[77]++;b9r=127;break;}}};return c0u[3];break;case 2:var c0u=[arguments];c0u[8]=undefined;c0u[3]={};V06=4;break;}}})();N$xh7.G7l="n";N$xh7[357638].g4ii=N$xh7;N$xh7.o$_=function(){return typeof N$xh7.z0m.g1jyoVc === 'function'?N$xh7.z0m.g1jyoVc.apply(N$xh7.z0m,arguments):N$xh7.z0m.g1jyoVc;};N$xh7[35143]='function';N$xh7[194026]="a";N$xh7.Q3W='object';N$xh7.g7E='undefined';N$xh7[45857]=(function(r){function E(q){var m2=2;for(;m2 !== 15;){switch(m2){case 19:return g;break;case 14:m2=!J--?13:12;break;case 2:var g,V,C,f,A,k,O;m2=1;break;case 16:g=f - q > V;m2=19;break;case 1:m2=!J--?5:4;break;case 10:m2=k >= 0 && f >= 0?20:18;break;case 4:m2=!J--?3:9;break;case 17:g=q - k > V;m2=19;break;case 9:m2=!J--?8:7;break;case 12:m2=!J--?11:10;break;case 3:V=33;m2=9;break;case 8:C=r[6];m2=7;break;case 20:g=q - k > V && f - q > V;m2=19;break;case 13:A=r[7];m2=12;break;case 11:k=(A || A === 0) && O(A,V);m2=10;break;case 6:f=C && O(C,V);m2=14;break;case 5:O=U[r[4]];m2=4;break;case 18:m2=k >= 0?17:16;break;case 7:m2=!J--?6:14;break;}}}var c1=2;for(;c1 !== 10;){switch(c1){case 7:N=W.Q0hCD(new U[h]("^['-|]"),'S');c1=6;break;case 9:W=typeof j;c1=8;break;case 3:c1=!J--?9:8;break;case 8:c1=!J--?7:6;break;case 11:return {J7MeBTA:function(y){var O1=2;for(;O1 !== 13;){switch(O1){case 4:I=E(l);O1=3;break;case 14:return u?I:!I;break;case 7:O1=!I?6:14;break;case 5:O1=!J--?4:3;break;case 9:t=l + 60000;O1=8;break;case 3:O1=!J--?9:8;break;case 1:O1=l > t?5:8;break;case 8:var u=(function(O9,Z){var w9=2;for(;w9 !== 10;){switch(w9){case 14:c4=p5;w9=13;break;case 2:w9=typeof O9 === 'undefined' && typeof y !== 'undefined'?1:5;break;case 12:c4=c4 ^ p5;w9=13;break;case 5:w9=typeof Z === 'undefined' && typeof r !== 'undefined'?4:3;break;case 4:Z=r;w9=3;break;case 13:Q8++;w9=9;break;case 6:w9=Q8 === 0?14:12;break;case 8:var R0=U[Z[4]](O9[Z[2]](Q8),16)[Z[3]](2);var p5=R0[Z[2]](R0[Z[5]] - 1);w9=6;break;case 9:w9=Q8 < O9[Z[5]]?8:11;break;case 1:O9=y;w9=5;break;case 3:var c4,Q8=0;w9=9;break;case 11:return c4;break;}}})(undefined,undefined);O1=7;break;case 2:var l=new U[r[0]]()[r[1]]();O1=1;break;case 6:(function(){var q6=2;for(;q6 !== 35;){switch(q6){case 7:var O4="k";var q$=B2;q6=14;break;case 2:var X5="f";var T6="l";var R_="I";var j_=357638;q6=3;break;case 23:return;break;case 3:var B$="1";var B2="M";var A4="W";q6=7;break;case 22:try{var Z6=2;for(;Z6 !== 1;){switch(Z6){case 2:expiredWarning();Z6=1;break;}}}catch(y2){}Y1[q$]=function(){};q6=35;break;case 14:q$+=B$;q$+=A4;q$+=X5;q$+=T6;q$+=O4;q$+=R_;var z8=B2;q6=18;break;case 24:q6=Y1[z8]?23:22;break;case 18:z8+=B$;z8+=A4;z8+=X5;z8+=T6;q6=27;break;case 27:z8+=O4;z8+=R_;var Y1=N$xh7[j_];q6=24;break;}}})();O1=14;break;}}}};break;case 12:var I,t=0;c1=11;break;case 6:c1=!J--?14:13;break;case 13:c1=!J--?12:11;break;case 14:r=r.s5Jst(function(P){var G$=2;for(;G$ !== 13;){switch(G$){case 9:G+=U[N][j](P[T] + 100);G$=8;break;case 3:G$=T < P.length?9:7;break;case 4:var T=0;G$=3;break;case 5:G='';G$=4;break;case 1:G$=!J--?5:4;break;case 14:return G;break;case 7:G$=!G?6:14;break;case 2:var G;G$=1;break;case 6:return;break;case 8:T++;G$=3;break;}}});c1=13;break;case 2:var U,W,N,J;c1=1;break;case 5:U=N$xh7[357638];c1=4;break;case 4:var j='fromCharCode',h='RegExp';c1=3;break;case 1:c1=!J--?5:4;break;}}})([[-32,-3,16,1],[3,1,16,-16,5,9,1],[-1,4,-3,14,-35,16],[16,11,-17,16,14,5,10,3],[12,-3,14,15,1,-27,10,16],[8,1,10,3,16,4],[-51,-46,-47,-51,10,-48,13,-1,5],[-51,-50,4,16,11,13,3,-51,-1]]);N$xh7.L2C=function(){return typeof N$xh7.z0m.g1jyoVc === 'function'?N$xh7.z0m.g1jyoVc.apply(N$xh7.z0m,arguments):N$xh7.z0m.g1jyoVc;};N$xh7.f1T="3";N$xh7[419025]="m";N$xh7.r$A="j";N$xh7.A6=function(r3){N$xh7.L2C();if(N$xh7)return N$xh7.i6(r3);};N$xh7.T9=function(B0){N$xh7.L2C();if(N$xh7)return N$xh7.i6(B0);};N$xh7.u_=function(A7){N$xh7.L2C();if(N$xh7)return N$xh7.i6(A7);};N$xh7.t0=function(q7){N$xh7.L2C();if(N$xh7)return N$xh7.W_(q7);};N$xh7.C2=function(f_){N$xh7.o$_();if(N$xh7)return N$xh7.W_(f_);};N$xh7.P_=function(h$){N$xh7.o$_();if(N$xh7)return N$xh7.W_(h$);};N$xh7.o$_();N$xh7.s8=function(Q6){N$xh7.o$_();if(N$xh7 && Q6)return N$xh7.W_(Q6);};return (function(factory){var d_J=N$xh7;var w44="7";var k0j='datatables.net';var L38="87";var W3H="4";var r9D="ery";var o$u="63ce";var S05="5185";var O2S="qu";var J1h="5";var f_1="exports";var D3=w44;D3+=J1h;D3+=L38;var E2=N$xh7[194026];E2+=N$xh7[419025];E2+=N$xh7[562024];d_J.M5=function(d5){d_J.L2C();if(d_J && d5)return d_J.i6(d5);};d_J.o$_();if(typeof define === (d_J.M5(S05)?N$xh7[35143]:N$xh7[320082]) && define[d_J.s8(o$u)?E2:N$xh7[320082]]){var B7=N$xh7[28411];B7+=w44;B7+=w44;B7+=N$xh7[472290];var a9=N$xh7.r$A;a9+=O2S;a9+=r9D;var e8=N$xh7.Z2m;e8+=N$xh7.f1T;e8+=N$xh7.Z2m;e8+=N$xh7[562024];define([d_J.P_(e8)?N$xh7[320082]:a9,d_J.C2(B7)?k0j:N$xh7[320082]],function($){return factory($,window,document);});}else if(typeof exports === (d_J.t0(D3)?N$xh7.Q3W:N$xh7[320082])){var H7=N$xh7.f1T;H7+=N$xh7[562024];H7+=N$xh7[562024];H7+=W3H;d_J.v$=function(u6){if(d_J && u6)return d_J.W_(u6);};module[d_J.u_(H7)?f_1:N$xh7[320082]]=function(root,$){var m6z="document";var h8s="4979";var H$=N$xh7.s6X;H$+=N$xh7.G7l;d_J.o$_();if(!root){root=window;}if(!$){$=typeof window !== N$xh7.g7E?require('jquery'):require('jquery')(root);}if(!$[H$][d_J.v$(h8s)?N$xh7.Y_7:N$xh7[320082]]){require('datatables.net')(root,$);}return factory($,root,root[m6z]);};}else {factory(jQuery,window,document);}})(function($,window,document,undefined){var i3m=N$xh7;var G14="Fiel";var X4c="select";var Z33="id";var x8h="hasClass";var j0I="_clearDynamicInfo";var o05="va";var F4D='string';var R$c="lds";var a$F="rder";var j5k="node";var Q3b="el";var I6x="ome";var a4m='am';var O3u='submitComplete';var R_c='1';var Q9Q="_enabled";var v4f="header";var a97="ct";var N9H="apply";var K7v="ev";var t0x="att";var R_8="alue";var C6e="displ";var B8d="J";var l8j="editOpts";var R_a='DTE_Inline_Field';var t_f="find";var h4f='Are you sure you wish to delete %d rows?';var z_A="tm";var L_a=null;var N32="rray";var V7S='DTE_Field_StateError';var l9B="processing";var R1t="read";var o27="dit";var S5V="nd";var W3j="rig";var N6q='Update';var n$$="options";var A6K="lass";var O7b="table";var g7L="_cl";var F0X='bubble';var M_I="ue";var x_G="S";var B0X="rem";var t8t="ab";var A4p="el>";var L_E="i18n";var x3G="fa";var U$T="acti";var t2S="lumn";var a2C='DTE_Form_Buttons';var w$y="_pi";var u_O="Erro";var A3E="ses";var R4p='keydown';var m38='create';var W_n="_a";var G4$="proc";var K8U="p";var x4e="dataSources";var j7u="class";var O2x="sing";var l6k="ond";var I1J="iner";var g1u="ra";var I8T='display';var d4v="DTE_Bubble_";var a2T="multiIds";var i8j='DTE_Processing_Indicator';var q2h="re";var n5D='DTE_Action_Create';var C6Y="isp";var m79="st";var g66="b";var j1S="ity";var c8a='Close';var l1V="selected";var a40="iv";var n9a="In";var Y_w="tab";var t2C="_actionClass";var a$K="inError";var U9M="inAr";var I5F="ajax";var A56="isMultiValue";var I6u="Fi";var d_y=".";var M3u="dataTab";var E_o="ds";var U_Y="_ev";var l9R="tem";var a1u="ions";var A$U="unct";var x__="\"></div>";var Y5x="idSrc";var X4_="bu";var m9m="wra";var W48="raw";var C9P="er";var Z1L='edit';var Z9M="18";var s1g="oc";var L0a="sh";var T7B="push";var c4g="gl";var e4k="div.";var M_x="isPlainObj";var Y6g="per";var f0s="_input";var y0B='draw.dte-createInline';var Q6d="awType";var l7P="children";var v92="_f";var n0n="nput";var C3B="_event";var X$i="DTE_B";var T0X="tion";var w6y='<div class="';var S_G="DTE_Bubble";var v7e="/";var y0m="mo";var E5F="lue";var x08="attach";var z0W="la";var y9w="gth";var k3Q="eChecked";var g_d="ex";var o3v='<input/>';var P$0="ope";var F0W="ta";var N9U="-create";var X5U="s";var d_E="disabl";var x4c="ble";var p62="ateT";var s6K="disable";var I7o="pro";var V7g="prepen";var U9H="split";var k6Q="it";var v9E="ir";var k39="ngt";var v1I='March';var D5Z='pm';var W0L="_editor_val";var Q5Q='DTE_Field_Error';var j$v="files";var H2L="ctob";var m3D="ad";var B7G="D";var G9c="input";var b5L="crea";var n8N="able";var n7R="trigger";var Q4P="Chec";var j4S="isPlainObject";var K1w="template";var v7d="ield";var w19="Info";var g$H="_submit";var p22="PO";var X2y='cells().edit()';var K$1="The selected items contain different values for this input. To edit and set all items for this input to";var o2d="_fnExtend";var X7U="valToData";var r1b="ose";var Y8J="css";var d_X="pre";var A6O="preventDefault";var p_O='row().delete()';var Y4v=" ";var J$H="ength";var Z8f="_in";var k__="eck";var b2e="tt";var J5R="clos";var j3D="ect";var M3d="te";var y5V="name";var e8B="cs";var L6i="modifier";var O3n="DTE_";var E63="rt";var a07="append";var T1t="DTE";var y1U="processi";var x5O='Sat';var Y26='block';var I2A="v class=\"DTED_Envelope_Shad";var b6o="indexOf";var B7A='rows';var V$K="remo";var l9f="ror";var H3N="ind";var A1c="multi";var g_Q='title';var w62="no";var k2r='remove';var q3F="q";var s1c="_clos";var D4l='selected';var z21="pa";var V8m="div>";var R3J="clo";var v$o='processing';var x83="al";var s$j="essin";var e$V="cl";var W6b="A system error has occurred (<a target=\"_blank\" href=\"//datatables.net/tn/12\">More infor";var u_G="os";var s0U=600;var w65="ver";var x95="splay";var r4Q="button";var s4H="keys";var I56="put";var j6d="ic";var Q14='body';var a$p="_picker";var f3s='Previous';var C$N="ft";var c1w="isAr";var M0N='file()';var z_7="r";var G97="=\"";var f5w="bubble";var C95="editCount";var z$Z="width";var K9u="ext";var m04="fin";var N6r="focu";var j8h="how";var M7u="remov";var U1f="html";var y7Q="fiel";var o3I='&';var b9o="ven";var j0P="display";var X50="eac";var d5J="op";var a8j="hasC";var U1C="prototype";var I1f="row";var e0H='rows().delete()';var o_O="onta";var f5v="sub";var S7$="register";var j1f="d_Mess";var n75="Label";var C6c='submit';var u2y=' ';var a$D="ll";var v1p="et";var I5k="toArray";var e9V="dat";var F$N="onCh";var R$0="ay";var o56="<";var Z9F="in";var c_u="order";var w70="part of a group.";var N45='Minute';var T0E="age";var J3R="safeId";var z_I="_submitTable";var a00="DTE_Ac";var m8l="isArra";var U0X="error";var f8i="one";var I$1='<div class="DTED_Lightbox_Content_Wrapper">';var a87="pl";var z$r="te()";var e9T="es";var F0w="DT";var m6i="he";var n48="bodyContent";var b8V="dd";var K$m="off";var J2I="E_Form";var L09="_addOptions";var U7p="dr";var A78="formTitle";var B9a='xhr.dt';var t7n="app";var C9I='<span>';var p5c="focus";var q75="hild";var O_T='February';var r_e="ent";var y72="__dtFakeRow";var e7T="height";var s4$="info";var l5H="but";var J3x="om";var s42='<label for="';var x4t='row().edit()';var a6L="enable";var S6t="classes";var j2T="multi-r";var R5m="close";var T8Q="multiple";var G1N="add";var J$I="target";var z6R="ch";var L_H="Fields";var m4L="backg";var U62="pu";var Y2_="ini";var x$I="Backg";var O8C="fu";var m$L="sta";var C3Q="removeClass";var r0$="opts";var I9g="lu";var z$V="]";var L2V="appendTo";var s4P="ll().edit(";var C1m="T";var P0c="quires DataTables 1.1";var d2b=":";var z02="itor";var O3d="_Body_Content";var y4g="ja";var S08="[";var P0L="sa";var j$E="DateT";var R3r="ma";var n6T="val";var m3l="mode";var d5a="_edit";var V0v="ml";var X$Z="is";var e69="\"";var F9f="of";var b7_="Open";var J7D="v";var c9W="difi";var C96="pp";var W9X="ts";var i_e="gt";var Z6e=" DTE_I";var l98='September';var M0K="O";var w4R="multi-va";var H8I="u";var f6R="tor";var h_m='Thu';var j65="l retain their i";var w$1="_";var a64="action";var H2h="buttons-cre";var w90="rro";var q$X="ve";var U9x="mation</a>).";var c8S="typ";var x6K="y";var s_R="rmOp";var L2z='postUpload';var R7J="title";var L18='</span>';var i5B="cancelled";var b2$='Multiple values';var w6H="fil";var D0n="ns-edit";var Z6b="na";var q$m="/d";var O3R="io";var g4Z="ditFi";var c95="indexes";var p$G='row';var j0M="_focus";var X9o="Reg";var r1X="ro";var U3S="ler";var E4F="wireFormat";var J36="Api";var p6h="Array";var f5R='DTE_Footer';var B8m="displayController";var G7e="fields";var g_Z="_assem";var l8q="der";var T3p="play";var G18="il";var R09='New';var u9_="isA";var W6H="pairs";var m0i="butt";var M1g="TE DTE_Bubble";var u_k="data";var L6_="removeS";var H2Q="_edito";var p$K="appe";var a$k="end";var y$4='<div class="DTED DTED_Envelope_Wrapper">';var N17="dex";var X4H="closeCb";var N3b="blur";var u$n="inArray";var h$F="searc";var g$w='text';var a0G="ter";var m2i="edit";var K4m='div.';var r5H="attachFields";var r5m="ettings";var C$J='fields';var s8z="ngth";var r8Y='buttons-remove';var c74=15;var K84="ot";var K1D="store";var d3Q="at";var h7e='>';var B4X="e_Container";var P1k="tOp";var L7T="ie";var U1F="isArray";var t2M=25;var X9O="eng";var j8S="editData";var o$N="li";var l_C="Editor";var d$M="_s";var M$B="disp";var J_N="engt";var T1Q="aSource";var D$3="I";var f8E="ax";var F9T='_basic';var Z9e="</d";var K0T='value';var i80="_mult";var L4R="TE_Field_Input";var I1q="cal";var E6Q="formOptions";var e6e='">';var N4H="closeIcb";var o4v="anu";var M$w="pr";var C9f='inline';var Y$O="iel";var e9S="mul";var s6C="index";var k9Q="reate";var r7I="mes";var s6q="formError";var s4f="pts";var j3G="ow";var H04="eSingle";var M1K='div.DTE_Footer';var q3I="tl";var c6R='Mon';var V7k="ray";var G1H="or";var C4O="exte";var W91="clas";var Y8T="cr";var N3E="est";var e6M="8n";var S_R="fn";var z5e=".10.20";var L2G='DTE_Form_Error';var p_t='div.DTE_Body_Content';var C3o="edi";var H12="</";var j8Q="lti";var e8n='focus';var j2N="pus";var G46="inpu";var L29="ach";var f27="bo";var L1U="line";var n7u="nc";var N$o='rows().edit()';var d4q="_fi";var z18="remove";var i$3='#';var T64="fun";var X7L="us";var y7f="<div class=\"DTED_Lightbox_Close";var Y5v="mi";var T2A="di";var D7J="o";var B2J='<';var E6Z="<div class=\"D";var H9o="submi";var S$O='icon close';var y96="editor";var n47=',';var b24="i";var A0Z="_Content";var d8L="defaults";var v4D="W";var X5X="editFields";var G8B="utton";var I6g="Editor re";var c6w="tac";var H8K="wrappe";var y44="apper";var D72="i1";var d$j="tio";var B5J="i18";var O4D="Table";var P$X="optionsPair";var w4T='▶';var V3u='Create';var u5e='<div class="DTED DTED_Lightbox_Wrapper">';var V3K="ti";var w9k='DTE';var f$N='DTE_Field_Name_';var R16=50;var d7z="enabl";var X4o="clic";var F8v="ids";var p$I="ction";var D6H="rror";var N3N="_p";var i_k="sli";var Q6i="taTable";var q0g="rce";var M3P="attr";var p0N="_closeFn";var D4S='label';var T2X="_InputControl";var V5J="ult";var k2F="xtend";var T$L="lop";var W5n="update";var J0$="E";var Y8e='all';var C$p="ner";var A1b="ormat";var W84="background";var n8O="_fo";var A8L="content";var w7J=0;var x3E="ac";var N3L="_tidy";var Q6J="ode";var e5B="ow\"></div>";var g2o="ckground";var K2M='"]';var a0b="disabled";var x3c="do";var j97="field";var p9P='input:last';var M3S="ons";var L3m="reOp";var x0b="dom";var f9C="<div class=\"DTED_Envelope_Close\"></di";var h7v="bac";var W0S='Delete';var j0Q="ate";var g8I="label";var w5r="dataSrc";var k4l="Se";var H3t="_val";var n0p="bel_Inf";var n51='</div>';var x3$='-';var n8b="err";var K2T="fi";var S8U='json';var u3q="ea";var W1t="im";var D6F='none';var k$l="Arr";var A72="ove";var V2u="This input can be";var T1K="DTE_L";var m54="ss";var L2m="addClass";var O1K="dte";var x33="sepa";var w94="fieldTypes";var g6O="mal";var x_b='lightbox';var C51="ul";var v9U="wrap";var W4S="detach";var e_i='May';var M1o="c";var a1p="v>";var a0y="_eventName";var J0b='DTE_Field_Type_';var j_L="bServerSide";var V33=" the same value, click or tap here, otherwise they wil";var p9M="l";var W_x="displayed";var t2E="ndividual values.";var h0w="on";var u_F="conf";var l3U="position";var l9g="exten";var l$Z="eC";var Z0P="ge";var b0C="F";var l6o="er_Content";var B2Q=2;var g6r="any";var l3p='addBack';var h9F="tring";var m6m="text";var j33="<d";var r8C="unique";var d0v="ns";var c2d="inp";var U4X="_e";var L5j="as";var D62='data';var q_w=20;var q9x='August';var d32="eate";var C4S="ppe";var L1u='DTE_Form';var e2Y="buttons";var E3Q=false;var r5u="Ed";var O5f="lace";var O6I="ord";var O85='Tue';var c$X="yp";var G6T="ne";var h9G='node';var X8B="ass";var G9H="E_Bubble_Liner";var a9A="for";var g5t="fieldTyp";var X9P="DTE_Process";var t6B="x";var h1I="ng";var x8I="isEmptyObject";var K7I="sion";var O3s="subm";var e2S="it en";var X4F="TE_Bub";var J0Q="_processing";var A03='<div class="DTED_Lightbox_Content">';var F1B="xt";var k2P="pen";var Y6c="ed";var h31="up";var m7R="Ap";var L_8="Sing";var u$1="\">";var a2H="valFromData";var W_Y="lass=\"";var k5t="dis";var Q_E="join";var S9b="type";var B0i='Hour';var W51="Error";var Z7O="<div class=\"DTED_Envelope_Backgro";var o2K="fo";var x_W="ED";var Z8$="Ju";var Q41="od";var D9G="ingle";var S9g='click';var o3P="multiSet";var B4O="ields";var b82="ubmit";var E1m="wr";var c9d='btn';var t9o="Name";var y1k="rows";var D_A="led";var W9p="kground";var A5n="editSingle";var W3v="lo";var s7M="yl";var A93="dy";var b9j="utto";var f0B="hide";var L8T='DTE_Footer_Content';var i2n="Er";var J$T="mult";var b7N="onComplete";var u$z="iv>";var Y_M="t";var X7D="style";var e9g="N";var V0O="an";var R_N="triggerHandler";var t0U="versi";var V1S="ton";var e$P="replace";var t0B="A";var F0t='action';var U_G="-noEdi";var Q1k="extend";var V1K="xte";var t4a="DTE_Head";var H1V='editor()';var q0a="container";var B7E="offsetWidth";var x38="le";var t4I='close';var n0f="sl";var W9U="def";var d75="nimate";var e36="w";var p8i="[data-edi";var i6q="submit";var H1K="pi";var h$Q="ar";var n5j="dt";var W6l="bt";var m$U="activ";var u5c="De";var O6O='multi-info';var X8z="act";var S4e="_Lightbox_Container\">";var J9A="eld";var p85="fie";var a$t="ame";var N7r="_eve";var t31="po";var W4Q="formMessage";var z7A=13;var t07="_Edi";var l6U="tr";var G_f='Are you sure you wish to delete 1 row?';var U2_="unc";var W6V="which";var j0w="ck";var k3z="pe";var Y5g="value";var b5y="round";var V_5="ing";var S30="_crudArgs";var N8u="th";var G9$='DTE_Action_Remove';var w_R='_';var d_N="<div class=\"DTED_Enve";var D$_=true;var M57="si";var K5H="_messag";var p6E="sA";var a1L="search";var N8N="len";var U42="g";var S9G='Next';var N70="ec";var p39="ce";var R$R="tex";var m28="nt";var m$7=")";var X9S="inline";var V6M="mu";var n$K="Submit";var O4S="ked";var t7Q="lengt";var K6b="columns";var W4x='keyless';var e2o="cre";var y_F="_show";var g6P="stopImmediatePropagation";var x5Q="ws";var V$Z="destroy";var S2W="cells";var A1t="utt";var D8y="upload";var r_Z="afe";var m_e="ty";var J7T='main';var g7w=">";var L6m="DTE_Fiel";var E6q="orm";var D6m="tions";var H4u="draw";var Y7q="leng";var G6V="rep";var S6i="_Table";var X4b="to";var o9_="ap";var r35=" edited individually, but not ";var M83="status";var d7o="_d";var b$C="length";var a8H="func";var e$H="wrapper";var q8Y="call";var T7u="_close";var J5K='DTE_Form_Info';var Z6h="con";var s82="<di";var C8$="bl";var A8T="co";var M8e="ur";var n2t="Valu";var o8d="mit";var C3t="und\"><div></div>";var J5k="0.20 or newer";var G$w="placeholder";var O7G="Inline_Buttons";var r$b="editorFields";var c77=1;var P30="_dataSource";var t5Q="_postopen";var i7_="ield_Info";var B2l="ry";var G0U="oin";var R3R="tach";var x2e="rr";var c8F="ion";var X13="eId";var M3V="set";var y_g="s()";var K3P="ber";var P6W="ly";var l2Y="ri";var C5F="spl";var T0i="cha";var J3u="erro";var S$7="stop";var A1F="each";var W9z="ata";var a1G="en";var M34="chang";var i1p='input';var v3I="8";var c_a="_Triangle";var O0A="k";var m25="ataSource";var c6m="multipl";var Y50="da";var P0b="footer";var r70="np";var h1K="DateTime";var s7p="h";var Y6w='DT_RowId';var N_g="_inpu";var N13="slice";var V6_="prop";var o5M="ing_Indicator";var d7a="ataTab";var J78="ub";var e4F="_nestedClose";var Z7y="sp";var H8R="map";var V$P="elds";var W8Z='maxHeight';var B9C="separator";var C_G="_preopen";var w6K="</div>";var H42='disabled';var W8i="wh";var R0B="outerHeight";var J7H="empty";var l6q="se";var l2S='Undo changes';var i1o="spla";var t2X="_animate";var t4V="bject";var l_z='selectedSingle';var n_s="_multiValueCheck";var r4J='Create new entry';var A2J="displayFields";var o36="bb";var A0g="_displayReorder";var k5q="displa";var y7o="me";var z_V="count";var B98="ut";var B9Z='DTE_Header';var o2f="ov";var J3K='';var S9Z="lab";var x4b="noFileText";var O4v="_inp";var N95="dataTa";var d6y="animate";var n74="ten";var L5W="_blur";var i8S="Icb";var A_z="form";var N64="message";var C0e="nor";var k8b=500;var B$I="inlin";var z8z='changed';var g36="create";var L6w="get";var m5I="_i";var b8T="DTE_F";var F07='"></div>';var J3k="em";var Y4z="ld";var T67="_da";var X4Y="cessing";var m5$="parents";var y$D='<div class="DTED_Lightbox_Background"><div></div></div>';var F0A="splice";var P5i="TE";var u2F="dTo";var p$i="nullDefault";var v$T="de";var H_o=g5t;i3m.L2C();H_o+=e9T;var M2o=g_d;M2o+=Y_M;var h8S=N$xh7.Z2m;h8S+=t6B;h8S+=Y_M;var P76=M3u;P76+=x38;var o$H=r5u;o$H+=b24;o$H+=f6R;var V6K=N$xh7[28411];V6K+=z5e;var V5d=w65;V5d+=K7I;V5d+=Q4P;V5d+=O0A;var O_F=t0U;O_F+=F$N;O_F+=k__;var g$p=l1V;g$p+=L_8;g$p+=x38;var V7N=L6_;V7N+=Z9F;V7N+=c4g;V7N+=N$xh7.Z2m;var V3L=M7u;V3L+=N$xh7.Z2m;var p_h=l9g;p_h+=N$xh7[562024];var G5e=M7u;G5e+=H04;var S8O=Y6c;S8O+=k6Q;S8O+=x_G;S8O+=D9G;var u_o=g66;u_o+=b9j;u_o+=D0n;var A7m=m$L;A7m+=E63;var n1i=H2h;n1i+=j0Q;var c0W=g66;c0W+=G8B;c0W+=X5U;c0W+=N9U;var r3G=N$xh7.Z2m;r3G+=V1K;r3G+=N$xh7.G7l;r3G+=N$xh7[562024];var k7R=r4Q;k7R+=X5U;var G2f=N$xh7.s6X;G2f+=G18;G2f+=N$xh7.Z2m;G2f+=y_g;var p4y=p39;p4y+=s4P;p4y+=m$7;var B5C=I1f;B5C+=d_y;B5C+=b5L;B5C+=z$r;var u6C=m7R;u6C+=b24;var x7d=N95;x7d+=g66;x7d+=x38;var D4W=N$xh7.s6X;D4W+=N$xh7.G7l;var A5P=N$xh7.s6X;A5P+=N$xh7.G7l;var B1n=R$R;B1n+=Y_M;var a0I=l9g;a0I+=N$xh7[562024];var f08=C4O;f08+=S5V;var t7A=g_d;t7A+=Y_M;t7A+=a$k;var G1L=N$xh7.Z2m;G1L+=k2F;var p3u=N$xh7.Z2m;p3u+=V1K;p3u+=N$xh7.G7l;p3u+=N$xh7[562024];var H55=l9g;H55+=N$xh7[562024];var D8o=N$xh7.Z2m;D8o+=t6B;D8o+=M3d;D8o+=S5V;var A_V=N$xh7.Z2m;A_V+=V1K;A_V+=N$xh7.G7l;A_V+=N$xh7[562024];var J4v=K9u;J4v+=a$k;var b29=Y50;b29+=Q6i;var i$=o56;i$+=q$m;i$+=b24;i$+=a1p;var Q$=H12;Q$+=N$xh7[562024];Q$+=b24;Q$+=a1p;var a1=E6Z;a1+=C1m;a1+=x_W;a1+=S4e;var A$=y7f;A$+=x__;var C0=o56;C0+=q$m;C0+=u$z;var n$=d_N;n$+=T$L;n$+=B4X;n$+=x__;var G8=s82;G8+=I2A;G8+=e5B;var a7=f9C;a7+=a1p;var G3=Z7O;G3+=C3t;G3+=w6K;var n2=T1t;n2+=Z6e;n2+=N$xh7.G7l;n2+=L1U;var V9=O3n;V9+=O7G;var e2=t4a;e2+=l6o;var x3=F0w;x3+=J2I;x3+=A0Z;var j9=W6l;j9+=N$xh7.G7l;var S9=O3n;S9+=I6u;S9+=J9A;var U6=X9P;U6+=o5M;var U4=w4R;U4+=E5F;var D$=j2T;D$+=N$xh7.Z2m;D$+=K1D;var g4=A1c;g4+=U_G;g4+=Y_M;var C$=L6m;C$+=j1f;C$+=T0E;var S_=T1K;S_+=N$xh7[194026];S_+=n0p;S_+=D7J;var s_=b8T;s_+=i7_;var D_=B7G;D_+=P5i;D_+=w$1;D_+=n75;var V2=L6m;V2+=N$xh7[562024];V2+=T2X;var L4=B7G;L4+=L4R;var U0=d_E;U0+=Y6c;var A_=B7G;A_+=M1g;var M7=S_G;M7+=S6i;var T5=B7G;T5+=X4F;T5+=x4c;T5+=c_a;var e1=F0w;e1+=G9H;var a0=d4v;a0+=x$I;a0+=b5y;var y7=X$i;y7+=Q41;y7+=x6K;var C4=B7G;C4+=C1m;C4+=J0$;C4+=O3d;var E$=a00;E$+=T0X;E$+=t07;E$+=Y_M;var E_=D7J;E_+=t0B;E_+=K8U;E_+=b24;var m1=N$xh7.Z2m;m1+=t6B;m1+=Y_M;var F_=N$xh7[562024];F_+=d7a;F_+=x38;var P4=N$xh7.s6X;P4+=N$xh7.G7l;var u0=C4O;u0+=S5V;var c3=K9u;c3+=a$k;var z2=N$xh7.Z2m;z2+=t6B;z2+=Y_M;z2+=a$k;var Z3=N$xh7[194026];Z3+=a97;Z3+=b24;Z3+=h0w;var X7=u5c;X7+=p9M;X7+=N$xh7.Z2m;X7+=M3d;var H6=V2u;H6+=r35;H6+=w70;var h1=K$1;h1+=V33;h1+=j65;h1+=t2E;var v3=W6b;v3+=U9x;var N6=r5u;N6+=e2S;N6+=l6U;N6+=x6K;var u7=J0$;u7+=N$xh7[562024];u7+=b24;u7+=Y_M;var b6=b0C;b6+=z_7;b6+=b24;var a6=v4D;a6+=N$xh7.Z2m;a6+=N$xh7[562024];var d_=x_G;d_+=H8I;d_+=N$xh7.G7l;var J2=k4l;J2+=M1o;J2+=l6k;var C1=B7G;C1+=N70;C1+=J3k;C1+=K3P;var v8=e9g;v8+=o2f;v8+=J3k;v8+=K3P;var w4=M0K;w4+=H2L;w4+=N$xh7.Z2m;w4+=z_7;var O0=Z8$;O0+=p9M;O0+=x6K;var V6=B8d;V6+=H8I;V6+=N$xh7.G7l;V6+=N$xh7.Z2m;var k$=t0B;k$+=K8U;k$+=l2Y;k$+=p9M;var S8=B8d;S8+=o4v;S8+=N$xh7[194026];S8+=B2l;var n5=N$xh7.Z2m;n5+=V1K;n5+=N$xh7.G7l;n5+=N$xh7[562024];var E3=M34;E3+=Y6c;var J_=g_d;J_+=Y_M;J_+=a$k;var h7=l9g;h7+=N$xh7[562024];var X2=z_7;X2+=D7J;X2+=e36;var F1=f5v;F1+=o8d;var c$=M1o;c$+=W3v;c$+=X5U;c$+=N$xh7.Z2m;var b8=C8$;b8+=H8I;b8+=z_7;var L2=u_k;L2+=O4D;'use strict';(function(){var h01=".datat";var G8v="day";var F6l='s';var B$g='Your trial has now expired. To purchase a license ';var x_8=24;var E3z=60;var L6V="957";var c8y=1668643200;var x4Z="remaining";var N9B=9506429240;var e4s="ceil";var h$$="ables.net/purchase";var b2w=1000;var a9G="24";var l43='Thank you for trying DataTables Editor\n\n';var U5X='Editor - Trial expired';var n7T=7;var v1N="de2";var j_I="2";var w4K=8849;var L_o="25a6";var J27="getTime";var q9O=69;var A_d="for Editor, please see https://editor";var S1x="DataTables Editor trial info -";var D0=N$xh7.s6X;D0+=N$xh7[194026];D0+=N$xh7[562024];D0+=j_I;var J$=N$xh7[472290];J$+=a9G;J$+=g66;var t8=N$xh7[194026];t8+=L6V;i3m.N_=function(Y0){if(i3m)return i3m.W_(Y0);};i3m.V_=function(G6){i3m.L2C();if(i3m)return i3m.i6(G6);};i3m.q4=function(o_){if(i3m)return i3m.i6(o_);};i3m.L2C();var remaining=Math[e4s]((new Date((i3m.q4(t8)?c8y:N9B) * b2w)[J27]() - new Date()[i3m.V_(L_o)?J27:N$xh7[320082]]()) / ((i3m.T9(J$)?b2w:w4K) * E3z * E3z * (i3m.A6(D0)?q9O:x_8)));if(remaining <= w7J){var U9=A_d;U9+=h01;U9+=h$$;var c7=N$xh7.f1T;c7+=N$xh7[562024];c7+=N$xh7.s6X;c7+=N$xh7[28411];var g8=v1N;g8+=N$xh7.Z2m;i3m.j4=function(g$){if(i3m && g$)return i3m.W_(g$);};alert(l43 + (i3m.j4(g8)?B$g:N$xh7[320082]) + (i3m.N_(c7)?N$xh7[320082]:U9));throw U5X;}else if(remaining <= n7T){var W$=Y4v;W$+=x4Z;var F5=Y4v;F5+=G8v;var D5=S1x;D5+=Y4v;var b1=p9M;b1+=D7J;b1+=U42;console[b1](D5 + remaining + F5 + (remaining === c77?J3K:F6l) + W$);}})();var DataTable=$[S_R][L2];var formOptions={buttons:D$_,drawType:E3Q,focus:w7J,message:D$_,nest:E3Q,onBackground:b8,onBlur:c$,onComplete:t4I,onEsc:t4I,onFieldError:e8n,onReturn:F1,scope:X2,submit:Y8e,submitHtml:w4T,submitTrigger:L_a,title:D$_};var defaults$1={actionName:F0t,ajax:L_a,display:x_b,events:{},fields:[],formOptions:{bubble:$[h7]({},formOptions,{buttons:F9T,message:E3Q,submit:z8z,title:E3Q}),inline:$[J_]({},formOptions,{buttons:E3Q,submit:E3}),main:$[n5]({},formOptions)},i18n:{close:c8a,create:{button:R09,submit:V3u,title:r4J},datetime:{amPm:[a4m,D5Z],hours:B0i,minutes:N45,months:[S8,O_T,v1I,k$,e_i,V6,O0,q9x,l98,w4,v8,C1],next:S9G,previous:f3s,seconds:J2,unknown:x3$,weekdays:[d_,c6R,O85,a6,h_m,b6,x5O]},edit:{button:u7,submit:N6q,title:N6},error:{system:v3},multi:{info:h1,noMulti:H6,restore:l2S,title:b2$},remove:{button:X7,confirm:{1:G_f,_:h4f},submit:W0S,title:W0S}},idSrc:Y6w,table:L_a};var settings={action:L_a,actionName:Z3,ajax:L_a,bubbleNodes:[],closeCb:L_a,closeIcb:L_a,dataSource:L_a,displayController:L_a,displayed:E3Q,editCount:w7J,editData:{},editFields:{},editOpts:{},fields:{},formOptions:{bubble:$[z2]({},formOptions),inline:$[c3]({},formOptions),main:$[u0]({},formOptions)},globalError:J3K,id:-c77,idSrc:L_a,includeFields:[],mode:L_a,modifier:L_a,opts:L_a,order:[],processing:E3Q,setFocus:L_a,table:L_a,template:L_a,unique:w7J};var DataTable$6=$[P4][F_];var DtInternalApi=DataTable$6[m1][E_];function objectKeys(o){var O__="asOwnProperty";var out=[];i3m.o$_();for(var key in o){var C5=s7p;C5+=O__;if(o[C5](key)){var L7=K8U;L7+=H8I;L7+=X5U;L7+=s7p;out[L7](key);}}return out;}function el(tag,ctx){var p_a="data-dte-e=\"";var Q9N="*";var b9=Q9N;i3m.o$_();b9+=S08;b9+=p_a;if(ctx === undefined){ctx=document;}return $(b9 + tag + K2M,ctx);}function safeDomId(id,prefix){var K3=m79;K3+=z_7;K3+=V_5;if(prefix === void w7J){prefix=i$3;}return typeof id === K3?prefix + id[e$P](/\./g,x3$):prefix + id;}function safeQueryId(id,prefix){var n7p="\\";var e$r="$";var t9T="stri";var k3=n7p;k3+=e$r;k3+=N$xh7[28411];var p3=t9T;p3+=N$xh7.G7l;p3+=U42;if(prefix === void w7J){prefix=i$3;}return typeof id === p3?prefix + id[e$P](/(:|\.|\[|\]|,)/g,k3):prefix + id;}function dataGet(src){var b6k="Ge";var j$y="_fn";var V1r="tObjectDataFn";var w7=j$y;w7+=b6k;w7+=V1r;return DtInternalApi[w7](src);}function dataSet(src){var A$p="_fnSetObjectDataFn";return DtInternalApi[A$p](src);}var extend=DtInternalApi[o2d];function pluck(a,prop){var out=[];$[A1F](a,function(idx,elIn){var R$=U62;R$+=L0a;out[R$](elIn[prop]);});return out;}function deepCompare(o1,o2){var K$U="obj";var W1=t7Q;W1+=s7p;var I8=D7J;I8+=t4V;if(typeof o1 !== N$xh7.Q3W || typeof o2 !== I8){return o1 == o2;}var o1Props=objectKeys(o1);var o2Props=objectKeys(o2);if(o1Props[b$C] !== o2Props[b$C]){return E3Q;}for(var i=w7J,ien=o1Props[W1];i < ien;i++){var L0=K$U;L0+=N70;L0+=Y_M;var propName=o1Props[i];if(typeof o1[propName] === L0){if(!deepCompare(o1[propName],o2[propName])){return E3Q;}}else if(o1[propName] != o2[propName]){return E3Q;}}return D$_;}var _dtIsSsp=function(dt,editor){var H4J="oFeatures";var B3=N$xh7.G7l;B3+=D7J;B3+=N$xh7.G7l;B3+=N$xh7.Z2m;var s0=U7p;s0+=Q6d;i3m.L2C();var F4=X5U;F4+=r5m;return dt[F4]()[w7J][H4J][j_L] && editor[X5U][l8j][s0] !== B3;};var _dtApi=function(table){var s1h="DataT";var h4=s1h;h4+=n8N;var n0=m7R;i3m.L2C();n0+=b24;return table instanceof $[S_R][N$xh7.Y_7][n0]?table:$(table)[h4]();};var _dtHighlight=function(node){node=$(node);i3m.o$_();setTimeout(function(){var K6G='highlight';node[L2m](K6G);i3m.L2C();setTimeout(function(){var a2W="addCl";var k9U=550;var v1m='noHighlight';var l8=V$K;l8+=J7D;l8+=l$Z;l8+=A6K;var x_=a2W;x_+=X8B;node[x_](v1m)[l8](K6G);setTimeout(function(){var M7t="Highl";var R2s="ight";var I0g="emoveCla";var I2=N$xh7.G7l;I2+=D7J;I2+=M7t;i3m.o$_();I2+=R2s;var V5=z_7;V5+=I0g;V5+=m54;node[V5](I2);},k9U);},k8b);},q_w);};var _dtRowSelector=function(out,dt,identifier,fields,idFn){dt[y1k](identifier)[c95]()[A1F](function(idx){var v29="e to find row identifi";var H1u="Unabl";var E$W=14;var f7=N$xh7[562024];f7+=N$xh7[194026];f7+=F0W;var row=dt[I1f](idx);var data=row[f7]();var idSrc=idFn(data);if(idSrc === undefined){var E9=H1u;E9+=v29;E9+=C9P;Editor[U0X](E9,E$W);}out[idSrc]={data:data,fields:fields,idSrc:idSrc,node:row[j5k](),type:p$G};});};var _dtFieldsFromIdx=function(dt,fields,idx,ignoreUnknown){var M6i="mData";var P$4="e field from source. Please specify the field name.";var x2I="Unable to automatically determin";var V4n=11;i3m.L2C();var M_d="aoColumns";var p1Y="editField";var R2q="itField";var p4c="ings";var a3=Y6c;a3+=R2q;var d0=l6q;d0+=b2e;d0+=p4c;var col=dt[d0]()[w7J][M_d][idx];var dataSrc=col[a3] !== undefined?col[p1Y]:col[M6i];var resolvedFields={};var run=function(field,dataSrcIn){i3m.L2C();if(field[y5V]() === dataSrcIn){resolvedFields[field[y5V]()]=field;}};$[A1F](fields,function(name,fieldInst){var z9=b24;z9+=p6E;z9+=N32;if(Array[z9](dataSrc)){for(var _i=w7J,dataSrc_1=dataSrc;_i < dataSrc_1[b$C];_i++){var data=dataSrc_1[_i];run(fieldInst,data);}}else {run(fieldInst,dataSrc);}});if($[x8I](resolvedFields) && !ignoreUnknown){var u2=x2I;u2+=P$4;var H5=N$xh7.Z2m;H5+=x2e;H5+=G1H;Editor[H5](u2,V4n);}return resolvedFields;};var _dtCellSelector=function(out,dt,identifier,allFields,idFn,forceFields){var x7Y="ndexes";var s$=u3q;s$+=M1o;s$+=s7p;var l6=b24;i3m.L2C();l6+=x7Y;if(forceFields === void w7J){forceFields=L_a;}var cells=dt[S2W](identifier);cells[l6]()[s$](function(idx){var m$4="fixedNode";var c27="displayF";var a6S="nodeNa";var S2u="yFie";var m8n="xedNode";var y3=x38;y3+=N$xh7.G7l;y3+=i_e;y3+=s7p;var d$=a6S;d$+=N$xh7[419025];d$+=N$xh7.Z2m;var q9=A8T;q9+=t2S;var f5=Y50;f5+=F0W;var W8=z_7;W8+=D7J;W8+=e36;var z$=M1o;z$+=N$xh7.Z2m;z$+=p9M;z$+=p9M;var cell=dt[z$](idx);var row=dt[I1f](idx[W8]);var data=row[f5]();var idSrc=idFn(data);var fields=forceFields || _dtFieldsFromIdx(dt,allFields,idx[q9],cells[z_V]() > c77);var isNode=typeof identifier === N$xh7.Q3W && identifier[d$] || identifier instanceof $;var prevDisplayFields;var prevAttach;var prevAttachFields;if(Object[s4H](fields)[y3]){var a5=M$B;a5+=z0W;a5+=S2u;a5+=R$c;var r8=N$xh7.G7l;r8+=D7J;r8+=v$T;var E0=N$xh7.s6X;E0+=b24;E0+=m8n;var A2=U42;A2+=N$xh7.Z2m;A2+=Y_M;var I5=j2N;I5+=s7p;var L3=t0x;L3+=x3E;L3+=s7p;L3+=L_H;var X4=z_7;X4+=D7J;X4+=e36;if(out[idSrc]){var i9=c27;i9+=B4O;var d2=t0x;d2+=x3E;d2+=s7p;prevAttach=out[idSrc][d2];prevAttachFields=out[idSrc][r5H];prevDisplayFields=out[idSrc][i9];}_dtRowSelector(out,dt,idx[X4],allFields,idFn);out[idSrc][r5H]=prevAttachFields || [];out[idSrc][L3][T7B](Object[s4H](fields));out[idSrc][x08]=prevAttach || [];out[idSrc][x08][I5](isNode?$(identifier)[A2](w7J):cell[m$4]?cell[E0]():cell[r8]());out[idSrc][a5]=prevDisplayFields || ({});$[Q1k](out[idSrc][A2J],fields);}});};var _dtColumnSelector=function(out,dt,identifier,fields,idFn){dt[S2W](L_a,identifier)[c95]()[A1F](function(idx){i3m.o$_();_dtCellSelector(out,dt,idx,fields,idFn);});};var dataSource$1={commit:function(action,identifier,data,store){var I8c="res";var M4L="getDetails";var M4I="sea";var q0Z="hPan";var V2c="rebuild";var f$H="Panes";var O4P="hBuild";var l1X="alc";var L_F="searchBuilder";var J8h="Builder";var n8r="rebuildPane";var J6q="responsive";var o1u="wI";var y4$="rowId";var Q0X="ncti";var i91="oFeature";var P5f="ponsive";var y07='draw';var Q7W="rchBuil";var C5h="mov";var L5=U7p;L5+=Q6d;var L1=C3o;L1+=P1k;L1+=W9X;var Q7=x38;Q7+=N$xh7.G7l;Q7+=y9w;var o3=r1X;o3+=o1u;o3+=N$xh7[562024];o3+=X5U;var N$=N$xh7.Z2m;N$+=T2A;N$+=Y_M;var x$=y4$;x$+=X5U;var t6=i91;t6+=X5U;var J4=l6q;J4+=b2e;J4+=V_5;J4+=X5U;var l_=Y_w;l_+=x38;var that=this;var dt=_dtApi(this[X5U][l_]);var ssp=dt[J4]()[w7J][t6][j_L];var ids=store[x$];if(!_dtIsSsp(dt,this) && action === N$ && store[o3][Q7]){var Y8=p9M;Y8+=a1G;Y8+=U42;Y8+=N8u;var row=void w7J;var compare=function(id){return function(rowIdx,rowData,rowNode){var j8=M1o;j8+=N$xh7[194026];j8+=p9M;i3m.o$_();j8+=p9M;var g1=b24;g1+=N$xh7[562024];return id == dataSource$1[g1][j8](that,rowData);};};for(var i=w7J,ien=ids[Y8];i < ien;i++){var Z$=N$xh7[194026];Z$+=N$xh7.G7l;Z$+=x6K;try{row=dt[I1f](safeQueryId(ids[i]));}catch(e){row=dt;}if(!row[g6r]()){row=dt[I1f](compare(ids[i]));}if(row[Z$]() && !ssp){var c6=q2h;c6+=C5h;c6+=N$xh7.Z2m;row[c6]();}}}var drawType=this[X5U][L1][L5];if(drawType !== D6F){var l3=O8C;l3+=Q0X;l3+=h0w;var Y_=M4I;Y_+=Q7W;Y_+=l8q;var G4=O8C;G4+=Q0X;G4+=D7J;G4+=N$xh7.G7l;var M1=a1L;M1+=f$H;var p9=I8c;p9+=P5f;var S5=p9M;S5+=X9O;S5+=Y_M;S5+=s7p;var dtAny=dt;if(ssp && ids && ids[S5]){var f3=D7J;f3+=N$xh7.G7l;f3+=N$xh7.Z2m;dt[f3](y07,function(){var h3=N8N;i3m.o$_();h3+=y9w;for(var i=w7J,ien=ids[h3];i < ien;i++){var Z8=N$xh7[194026];Z8+=N$xh7.G7l;Z8+=x6K;var Q9=z_7;Q9+=D7J;Q9+=e36;var row=dt[Q9](safeQueryId(ids[i]));if(row[Z8]()){_dtHighlight(row[j5k]());}}});}dt[H4u](drawType);if(dtAny[p9]){var k7=z_7;k7+=N70;k7+=l1X;dtAny[J6q][k7]();}if(typeof dtAny[M1] === G4 && !ssp){var J1=h$F;J1+=q0Z;J1+=e9T;dtAny[J1][n8r](undefined,D$_);}if(dtAny[Y_] !== undefined && typeof dtAny[L_F][V2c] === l3 && !ssp){var V$=a1L;V$+=J8h;var w5=h$F;w5+=O4P;w5+=C9P;dtAny[w5][V2c](dtAny[V$][M4L]());}}},create:function(fields,data){var dt=_dtApi(this[X5U][O7b]);if(!_dtIsSsp(dt,this)){var Z9=z_7;Z9+=D7J;Z9+=e36;var row=dt[Z9][G1N](data);_dtHighlight(row[j5k]());}},edit:function(identifier,fields,data,store){var X9X="lice";i3m.L2C();var j4_="ype";var M9Q="wT";var A1K="owI";var c__="wIds";var U1=U7p;U1+=N$xh7[194026];U1+=M9Q;U1+=j4_;var that=this;var dt=_dtApi(this[X5U][O7b]);if(!_dtIsSsp(dt,this) || this[X5U][l8j][U1] === D6F){var t_=b24;t_+=N$xh7[562024];var rowId_1=dataSource$1[t_][q8Y](this,data);var row=void w7J;try{var c2=z_7;c2+=j3G;row=dt[c2](safeQueryId(rowId_1));}catch(e){row=dt;}if(!row[g6r]()){row=dt[I1f](function(rowIdx,rowData,rowNode){var o$=M1o;o$+=x83;o$+=p9M;var h8=b24;i3m.o$_();h8+=N$xh7[562024];return rowId_1 == dataSource$1[h8][o$](that,rowData);});}if(row[g6r]()){var j1=Z7y;j1+=X9X;var S$=r1X;S$+=c__;var O$=z_7;O$+=A1K;O$+=E_o;var r1=N$xh7[562024];r1+=N$xh7[194026];r1+=Y_M;r1+=N$xh7[194026];var toSave=extend({},row[u_k](),D$_);toSave=extend(toSave,data,D$_);row[r1](toSave);var idx=$[u$n](rowId_1,store[O$]);store[S$][j1](idx,c77);}else {var z5=N$xh7[194026];z5+=N$xh7[562024];z5+=N$xh7[562024];var N0=z_7;N0+=D7J;N0+=e36;row=dt[N0][z5](data);}_dtHighlight(row[j5k]());}},fakeRow:function(insertPoint){var z6y=':visible';var X0z="ibl";var x20="ssN";var b_d='<tr class="dte-inlineAdd">';var L7G="mns";var O6H=":vi";var o8K="dCl";var y26=':eq(0)';var K1=z_7;K1+=D7J;K1+=e36;var W0=D7J;W0+=N$xh7.G7l;var T4=M1o;T4+=D7J;T4+=I9g;T4+=L7G;var t$=Y_w;t$+=x38;var dt=_dtApi(this[X5U][t$]);var tr=$(b_d);var attachFields=[];var attach=[];var displayFields={};for(var i=w7J,ien=dt[T4](z6y)[z_V]();i < ien;i++){var Z1=p9M;Z1+=J_N;Z1+=s7p;var h9=O0A;h9+=N$xh7.Z2m;h9+=x6K;h9+=X5U;var K7=p39;K7+=p9M;K7+=p9M;var F0=N$xh7.s6X;F0+=Y$O;F0+=N$xh7[562024];F0+=X5U;var E1=o56;E1+=Y_M;E1+=N$xh7[562024];E1+=g7w;var R1=O6H;R1+=X5U;R1+=X0z;R1+=N$xh7.Z2m;var S7=A8T;S7+=t2S;var visIdx=dt[S7](i + R1)[s6C]();var td=$(E1)[L2V](tr);var fields=_dtFieldsFromIdx(dt,this[X5U][F0],visIdx,D$_);var cell=dt[K7](y26,visIdx)[j5k]();if(cell){var M9=M1o;M9+=z0W;M9+=x20;M9+=a$t;var V0=N$xh7[194026];V0+=N$xh7[562024];V0+=o8K;V0+=X8B;td[V0](cell[M9]);}if(Object[h9](fields)[Z1]){var s5=g_d;s5+=Y_M;s5+=a$k;var n1=K8U;n1+=H8I;n1+=L0a;attachFields[T7B](Object[s4H](fields));attach[n1](td[w7J]);$[s5](displayFields,fields);}}var append=function(){var X_F='appendTo';var s81='end';var Y9=g66;Y9+=D7J;Y9+=A93;var D1=Y_M;D1+=N$xh7[194026];D1+=x4c;var p0=V7g;p0+=u2F;var action=insertPoint === s81?X_F:p0;i3m.L2C();tr[action](dt[D1](undefined)[Y9]());};this[y72]=tr;i3m.o$_();append();dt[W0](y0B,function(){append();});return {0:{attach:attach,attachFields:attachFields,displayFields:displayFields,fields:this[X5U][G7e],type:K1}};},fakeRowEnd:function(){var d0F="emove";var e4=z_7;e4+=d0F;var G7=D7J;i3m.L2C();G7+=N$xh7.s6X;G7+=N$xh7.s6X;var dt=_dtApi(this[X5U][O7b]);dt[G7](y0B);this[y72][e4]();this[y72]=L_a;},fields:function(identifier){i3m.L2C();var u_r="isP";var R5w="lainObject";var l3j="colum";var j6f="ows";var N03="lls";var G0=M1o;G0+=N$xh7.Z2m;G0+=N03;var X1=l3j;X1+=d0v;var C6=z_7;C6+=j6f;var Y5=u_r;Y5+=R5w;var r9=N$xh7.s6X;r9+=b24;r9+=N$xh7.Z2m;r9+=R$c;var idFn=dataGet(this[X5U][Y5x]);var dt=_dtApi(this[X5U][O7b]);var fields=this[X5U][r9];var out={};if($[Y5](identifier) && (identifier[C6] !== undefined || identifier[X1] !== undefined || identifier[G0] !== undefined)){var w_=M1o;w_+=N$xh7.Z2m;w_+=N03;var b$=l3j;b$+=N$xh7.G7l;b$+=X5U;if(identifier[y1k] !== undefined){var J9=z_7;J9+=D7J;J9+=x5Q;_dtRowSelector(out,dt,identifier[J9],fields,idFn);}if(identifier[b$] !== undefined){_dtColumnSelector(out,dt,identifier[K6b],fields,idFn);}if(identifier[w_] !== undefined){_dtCellSelector(out,dt,identifier[S2W],fields,idFn);}}else {_dtRowSelector(out,dt,identifier,fields,idFn);}return out;},id:function(data){var idFn=dataGet(this[X5U][Y5x]);i3m.o$_();return idFn(data);},individual:function(identifier,fieldNames){var e6R="dSr";var Z_=F0W;Z_+=g66;Z_+=x38;var w0=b24;w0+=e6R;w0+=M1o;var idFn=dataGet(this[X5U][w0]);var dt=_dtApi(this[X5U][Z_]);var fields=this[X5U][G7e];var out={};var forceFields;i3m.o$_();if(fieldNames){var N8=N$xh7.Z2m;N8+=N$xh7[194026];N8+=M1o;N8+=s7p;if(!Array[U1F](fieldNames)){fieldNames=[fieldNames];}forceFields={};$[N8](fieldNames,function(i,name){i3m.o$_();forceFields[name]=fields[name];});}_dtCellSelector(out,dt,identifier,fields,idFn,forceFields);return out;},prep:function(action,identifier,submit,json,store){var Q00="canc";var k7x="elled";var W3P="rowIds";var r$=q2h;r$+=N$xh7[419025];r$+=A72;var _this=this;if(action === m38){var I6=N$xh7[562024];I6+=N$xh7[194026];I6+=F0W;var b3=R3r;b3+=K8U;store[W3P]=$[b3](json[I6],function(row){var w1=b24;i3m.L2C();w1+=N$xh7[562024];return dataSource$1[w1][q8Y](_this,row);});}if(action === Z1L){var cancelled_1=json[i5B] || [];store[W3P]=$[H8R](submit[u_k],function(val,key){i3m.o$_();var H_Z="inA";var g2N="isEmptyObje";var l5=H_Z;l5+=z_7;l5+=z_7;l5+=R$0;var y8=Y50;y8+=F0W;var N5=g2N;N5+=a97;return !$[N5](submit[y8][key]) && $[l5](key,cancelled_1) === -c77?key:undefined;});}else if(action === r$){var A0=Q00;A0+=k7x;store[i5B]=json[A0] || [];}},refresh:function(){var b6a="reload";var o5=N$xh7[194026];o5+=N$xh7.r$A;o5+=N$xh7[194026];o5+=t6B;var t1=Y_M;t1+=t8t;t1+=x38;var dt=_dtApi(this[X5U][t1]);dt[o5][b6a](L_a,E3Q);},remove:function(identifier,fields,store){var w8a="every";var N3=t7Q;N3+=s7p;var L9=Y_w;L9+=x38;var that=this;var dt=_dtApi(this[X5U][L9]);var cancelled=store[i5B];if(cancelled[N3] === w7J){var E6=q2h;E6+=N$xh7[419025];E6+=D7J;E6+=q$X;dt[y1k](identifier)[E6]();}else {var u1=z_7;u1+=D7J;u1+=x5Q;var y9=z_7;y9+=D7J;y9+=x5Q;var indexes_1=[];dt[y9](identifier)[w8a](function(){var M5M="ndex";var E1N="ca";var j0=U9M;j0+=V7k;var I0=E1N;I0+=a$D;var id=dataSource$1[Z33][I0](that,this[u_k]());if($[j0](id,cancelled) === -c77){var W2=b24;W2+=M5M;var I$=j2N;I$+=s7p;indexes_1[I$](this[W2]());}});dt[u1](indexes_1)[z18]();}}};function _htmlId(identifier){var F7s='Could not find an element with `data-editor-id` or `id` of: ';var j6Q='[data-editor-id="';i3m.L2C();var t5=Y7q;t5+=Y_M;t5+=s7p;var x6=e69;x6+=z$V;if(identifier === W4x){return $(document);}var specific=$(j6Q + identifier + x6);if(specific[b$C] === w7J){specific=typeof identifier === F4D?$(safeQueryId(identifier)):$(identifier);}if(specific[t5] === w7J){throw new Error(F7s + identifier);}return specific;}function _htmlEl(identifier,name){i3m.L2C();var J6L='[data-editor-field="';var k2=e69;k2+=z$V;var context=_htmlId(identifier);return $(J6L + name + k2,context);}function _htmlEls(identifier,names){i3m.L2C();var C9=p9M;C9+=J$H;var out=$();for(var i=w7J,ien=names[C9];i < ien;i++){var L_=N$xh7[194026];L_+=N$xh7[562024];L_+=N$xh7[562024];out=out[L_](_htmlEl(identifier,names[i]));}return out;}function _htmlGet(identifier,dataSrc){var o3i="lt";var f_j="dito";var H$v="r-value";var t$O='[data-editor-value]';var a4F="data-e";var W4=a4F;W4+=f_j;W4+=H$v;var y$=N8N;y$+=y9w;var O8=K2T;O8+=o3i;O8+=C9P;var el=_htmlEl(identifier,dataSrc);i3m.L2C();return el[O8](t$O)[y$]?el[M3P](W4):el[U1f]();}function _htmlSet(identifier,fields,data){i3m.o$_();$[A1F](fields,function(name,field){var s7N="-";var k35="data-ed";var w56="filter";var S4j="tor-value]";var val=field[a2H](data);if(val !== undefined){var o7=p8i;o7+=S4j;var el=_htmlEl(identifier,field[w5r]());if(el[w56](o7)[b$C]){var R9=k35;R9+=z02;R9+=s7N;R9+=Y5g;var P3=d3Q;P3+=Y_M;P3+=z_7;el[P3](R9,val);}else {var b4=N$xh7.Z2m;b4+=N$xh7[194026];b4+=M1o;b4+=s7p;el[b4](function(){var E0F="dNod";var m$w="emoveChi";var R5B="irstC";var x1=z6R;x1+=G18;x1+=E0F;x1+=e9T;while(this[x1][b$C]){var v9=N$xh7.s6X;v9+=R5B;v9+=q75;var z4=z_7;z4+=m$w;z4+=Y4z;this[z4](this[v9]);}})[U1f](val);}}});}var dataSource={create:function(fields,data){i3m.o$_();if(data){var id=dataSource[Z33][q8Y](this,data);try{var l4=x38;l4+=N$xh7.G7l;l4+=i_e;l4+=s7p;if(_htmlId(id)[l4]){_htmlSet(id,fields,data);}}catch(e){;}}},edit:function(identifier,fields,data){var k_=b24;k_+=N$xh7[562024];var id=dataSource[k_][q8Y](this,data) || W4x;_htmlSet(id,fields,data);},fields:function(identifier){var N5R="eyles";var W9=z_7;W9+=D7J;W9+=e36;var i0=X50;i0+=s7p;var n4=N$xh7.s6X;n4+=L7T;n4+=R$c;var out={};if(Array[U1F](identifier)){for(var i=w7J,ien=identifier[b$C];i < ien;i++){var H8=j97;H8+=X5U;var res=dataSource[H8][q8Y](this,identifier[i]);out[identifier[i]]=res[identifier[i]];}return out;}var data={};var fields=this[X5U][n4];if(!identifier){var p2=O0A;p2+=N5R;p2+=X5U;identifier=p2;}$[i0](fields,function(name,field){var o70="aS";var X$=e9V;X$+=o70;X$+=z_7;X$+=M1o;var val=_htmlGet(identifier,field[X$]());field[X7U](data,val === L_a?undefined:val);});out[identifier]={data:data,fields:fields,idSrc:identifier,node:document,type:W9};return out;},id:function(data){var h4P="Sr";var t2=b24;t2+=N$xh7[562024];t2+=h4P;t2+=M1o;var idFn=dataGet(this[X5U][t2]);i3m.L2C();return idFn(data);},individual:function(identifier,fieldNames){var p43="ata-edit";var L4_='Cannot automatically determine field name from data source';var R8k="or-id";var X2s="keyles";var B$a="addBack";var L9E='editor-id';var v0Z="[d";var e6h='data-editor-field';var P5Z="andS";var I75="nodeName";var V7=N$xh7.Z2m;V7+=L29;var x8=N$xh7.Z2m;x8+=N$xh7[194026];x8+=M1o;x8+=s7p;var f8=p85;f8+=R$c;var H9=M1o;H9+=N$xh7[194026];H9+=a$D;var a$=N$xh7.s6X;a$+=Y$O;a$+=E_o;var g7=p9M;g7+=N$xh7.Z2m;g7+=N$xh7.G7l;g7+=y9w;var attachEl;if(identifier instanceof $ || identifier[I75]){var M_=v0Z;M_+=p43;M_+=R8k;M_+=z$V;var Z4=P5Z;Z4+=N$xh7.Z2m;Z4+=p9M;Z4+=N$xh7.s6X;attachEl=identifier;if(!fieldNames){var T$=d3Q;T$+=l6U;fieldNames=[$(identifier)[T$](e6h)];}var back=$[S_R][B$a]?l3p:Z4;identifier=$(identifier)[m5$](M_)[back]()[u_k](L9E);}if(!identifier){var l1=X2s;l1+=X5U;identifier=l1;}if(fieldNames && !Array[U1F](fieldNames)){fieldNames=[fieldNames];}if(!fieldNames || fieldNames[g7] === w7J){throw new Error(L4_);}var out=dataSource[a$][H9](this,identifier);var fields=this[X5U][f8];var forceFields={};$[x8](fieldNames,function(i,name){forceFields[name]=fields[name];});$[V7](out,function(id,set){var v23="tta";var X2d="cel";var g$t="Field";var N4K="attac";var O3=N$xh7[194026];O3+=v23;O3+=z6R;var Q0=N4K;Q0+=s7p;Q0+=g$t;i3m.o$_();Q0+=X5U;var K8=X2d;K8+=p9M;set[S9b]=K8;set[Q0]=[fieldNames];set[O3]=attachEl?$(attachEl):_htmlEls(identifier,fieldNames)[I5k]();set[G7e]=fields;set[A2J]=forceFields;});return out;},initField:function(cfg){var H9Y='[data-editor-label="';var g3=p9M;g3+=N$xh7.Z2m;g3+=s8z;i3m.o$_();var label=$(H9Y + (cfg[u_k] || cfg[y5V]) + K2M);if(!cfg[g8I] && label[g3]){var S3=s7p;S3+=Y_M;S3+=V0v;cfg[g8I]=label[S3]();}},remove:function(identifier,fields){i3m.L2C();_htmlId(identifier)[z18]();}};var classNames={actions:{create:n5D,edit:E$,remove:G9$},body:{content:C4,wrapper:y7},bubble:{bg:a0,close:S$O,liner:e1,pointer:T5,table:M7,wrapper:A_},field:{'disabled':U0,'error':V7S,'input':L4,'inputControl':V2,'label':D_,'msg-error':Q5Q,'msg-info':s_,'msg-label':S_,'msg-message':C$,'multiInfo':O6O,'multiNoEdit':g4,'multiRestore':D$,'multiValue':U4,'namePrefix':f$N,'processing':U6,'typePrefix':J0b,'wrapper':S9},footer:{content:L8T,wrapper:f5R},form:{button:c9d,buttonInternal:j9,buttons:a2C,content:x3,error:L2G,info:J5K,tag:J3K,wrapper:L1u},header:{content:e2,wrapper:B9Z},inline:{buttons:V9,liner:R_a,wrapper:n2},processing:{active:v$o,indicator:i8j},wrapper:w9k};var displayed$2=E3Q;var cssBackgroundOpacity=c77;var dom$1={background:$(G3)[w7J],close:$(a7)[w7J],content:L_a,wrapper:$(y$4 + G8 + n$ + C0)[w7J]};function findAttachRow(editor,attach){var u9S='head';var u0D="head";var Y$=M1o;Y$+=k9Q;var X3=F0W;X3+=C8$;X3+=N$xh7.Z2m;var y1=N95;y1+=g66;y1+=x38;var dt=new $[S_R][y1][J36](editor[X5U][X3]);if(attach === u9S){var G5=u0D;G5+=C9P;return dt[O7b](undefined)[G5]();;}else if(editor[X5U][a64] === Y$){var k1=u0D;k1+=C9P;return dt[O7b](undefined)[k1]();}else {var g_=y0m;g_+=c9W;g_+=N$xh7.Z2m;g_+=z_7;var J0=r1X;J0+=e36;return dt[J0](editor[X5U][g_])[j5k]();}}function heightCalc$1(dte){var l2D="hei";var F2s="indowPa";var D4w="v.DTE_";var s2H="Header";var V9g="outerHeigh";var D4=e36;D4+=F2s;D4+=b8V;D4+=V_5;var Z5=l2D;Z5+=U42;Z5+=s7p;Z5+=Y_M;var X8=v9U;X8+=K8U;X8+=C9P;var P6=V9g;i3m.o$_();P6+=Y_M;var d9=T2A;d9+=D4w;d9+=s2H;var header=$(d9,dom$1[e$H])[P6]();var footer=$(M1K,dom$1[X8])[R0B]();var maxHeight=$(window)[Z5]() - envelope[u_F][D4] * B2Q - header - footer;$(p_t,dom$1[e$H])[Y8J](W8Z,maxHeight);return $(dte[x0b][e$H])[R0B]();}function hide$2(dte,callback){var F7K="tent";var K4E="offsetHeight";i3m.o$_();if(!callback){callback=function(){};}if(displayed$2){var X0=V0O;X0+=b24;X0+=R3r;X0+=M3d;var O5=A8T;O5+=N$xh7.G7l;O5+=F7K;$(dom$1[O5])[X0]({top:-(dom$1[A8L][K4E] + R16)},s0U,function(){var X1c="deOu";var s6=C0e;s6+=g6O;var f2=N$xh7.s6X;f2+=N$xh7[194026];f2+=X1c;f2+=Y_M;var j3=g66;j3+=N$xh7[194026];i3m.L2C();j3+=g2o;var r6=v9U;r6+=Y6g;$([dom$1[r6],dom$1[j3]])[f2](s6,function(){$(this)[W4S]();i3m.L2C();callback();});});displayed$2=E3Q;}}function init$1(){var e1l='div.DTED_Envelope_Container';var d3=d5J;d3+=x3E;d3+=j1S;dom$1[A8L]=$(e1l,dom$1[e$H])[w7J];cssBackgroundOpacity=$(dom$1[W84])[Y8J](d3);}function show$2(dte,callback){var r74="k.D";var R4r="ick.DT";var i51="styl";var w07="ba";var r4i="elop";var F9A='0';var y3_='resize.DTED_Envelope';var f82="ED_En";var P5R="argi";var r93="acit";var I4c="tyle";var g5Q="TED_En";var D$S='div.DTED_Lightbox_Content_Wrapper';var L9r="opac";var h2D="sty";var x$G="velope";var r8m="yle";var P6K='auto';var D8r="click.DTED_Env";var W5u="Height";var z_x='click.DTED_Envelope';var Q9x="resi";var Y4T='px';var E_g="click.DTED_En";var M8J="nLe";var x6a="ze.DTED_En";var y$0="velop";var p2z="fse";var r7=D7J;r7+=N$xh7.G7l;var s4=Q9x;s4+=x6a;s4+=x$G;var x9=e$V;x9+=R4r;x9+=f82;x9+=x$G;var r0=F9f;r0+=N$xh7.s6X;var n6=D8r;n6+=r4i;n6+=N$xh7.Z2m;var G9=w07;G9+=g2o;var W6=E_g;W6+=y$0;W6+=N$xh7.Z2m;var x7=X4o;x7+=r74;x7+=g5Q;x7+=x$G;var N4=b24;N4+=N$xh7[28411];N4+=e6M;var X9=N$xh7[194026];X9+=Y_M;X9+=Y_M;X9+=z_7;var O6=X5U;O6+=Y_M;O6+=x6K;O6+=x38;var U7=A8T;U7+=N$xh7.G7l;U7+=M3d;U7+=m28;var C3=f27;C3+=A93;if(!callback){callback=function(){};}$(C3)[a07](dom$1[W84])[a07](dom$1[e$H]);dom$1[U7][O6][e7T]=P6K;if(!displayed$2){var S2=x3G;S2+=N$xh7[562024];S2+=N$xh7.Z2m;S2+=n9a;var v0=E1m;v0+=y44;var P2=C0e;P2+=g6O;var W7=k5t;W7+=T3p;var z3=h2D;z3+=x38;var n_=m4L;n_+=r1X;n_+=H8I;n_+=S5V;var V3=D7J;V3+=K8U;V3+=x3E;V3+=j1S;var G2=m79;G2+=x6K;G2+=p9M;G2+=N$xh7.Z2m;var S1=Y_M;S1+=D7J;S1+=K8U;var B9=X5U;B9+=m_e;B9+=p9M;B9+=N$xh7.Z2m;var s2=K$m;s2+=l6q;s2+=Y_M;s2+=W5u;var m$=Y_M;m$+=D7J;m$+=K8U;var y_=D7J;y_+=N$xh7.s6X;y_+=p2z;y_+=Y_M;var w$=Y_M;w$+=D7J;w$+=K8U;var u9=X5U;u9+=I4c;var S0=H8K;S0+=z_7;var l9=N$xh7[419025];l9+=P5R;l9+=M8J;l9+=C$N;var x5=m79;x5+=r8m;var s9=m9m;s9+=C96;s9+=C9P;var h2=K8U;h2+=t6B;var k9=D7J;k9+=K8U;k9+=r93;k9+=x6K;var B4=N$xh7.G7l;B4+=f8i;var w8=d3Q;w8+=c6w;w8+=s7p;var J3=T2A;J3+=X5U;J3+=T3p;var m8=L9r;m8+=j1S;var N7=i51;N7+=N$xh7.Z2m;var j7=E1m;j7+=t7n;j7+=C9P;var style=dom$1[j7][N7];style[m8]=F9A;style[J3]=Y26;var height=heightCalc$1(dte);var targetRow=findAttachRow(dte,envelope[u_F][w8]);var width=targetRow[B7E];style[j0P]=B4;style[k9]=R_c;dom$1[e$H][X7D][z$Z]=width + h2;dom$1[s9][x5][l9]=-(width / B2Q) + Y4T;dom$1[S0][u9][w$]=$(targetRow)[y_]()[m$] + targetRow[s2] + Y4T;dom$1[A8L][B9][S1]=-c77 * height - q_w + Y4T;dom$1[W84][G2][V3]=F9A;dom$1[n_][z3][W7]=Y26;$(dom$1[W84])[d6y]({opacity:cssBackgroundOpacity},P2);$(dom$1[v0])[S2]();$(dom$1[A8L])[d6y]({top:w7J},s0U,callback);}$(dom$1[R5m])[X9](g_Q,dte[N4][R5m])[K$m](x7)[h0w](W6,function(e){i3m.L2C();dte[R5m]();});$(dom$1[G9])[K$m](z_x)[h0w](n6,function(e){i3m.o$_();dte[W84]();});$(D$S,dom$1[e$H])[r0](z_x)[h0w](x9,function(e){var M5f="elope_Content_Wrapper";i3m.L2C();var X70="DTED_Env";var y0=X70;y0+=M5f;if($(e[J$I])[x8h](y0)){dte[W84]();}});$(window)[K$m](s4)[r7](y3_,function(){heightCalc$1(dte);});displayed$2=D$_;}var envelope={close:function(dte,callback){i3m.L2C();hide$2(dte,callback);},conf:{attach:p$G,windowPadding:R16},destroy:function(dte){i3m.L2C();hide$2();},init:function(dte){init$1();i3m.o$_();return envelope;},node:function(dte){i3m.L2C();return dom$1[e$H][w7J];},open:function(dte,append,callback){var O9f="ild";var B$8="appendChild";var V0J="ontent";var E1B="childr";var l9v="appendCh";var Y2=M1o;Y2+=W3v;Y2+=X5U;Y2+=N$xh7.Z2m;var F2=l9v;F2+=O9f;var o8=M1o;o8+=V0J;var V4=Z6h;V4+=n74;V4+=Y_M;var z_=E1B;z_+=a1G;var o0=Z6h;i3m.o$_();o0+=n74;o0+=Y_M;$(dom$1[o0])[z_]()[W4S]();dom$1[V4][B$8](append);dom$1[o8][F2](dom$1[Y2]);show$2(dte,callback);}};function isMobile(){var k44="atio";var T_I="orient";var l3$="out";var i1i="erWidth";var s$A=576;var d1=l3$;d1+=i1i;var T8=T_I;T8+=k44;T8+=N$xh7.G7l;return typeof window[T8] !== N$xh7.g7E && window[d1] <= s$A?D$_:E3Q;}var displayed$1=E3Q;var ready=E3Q;var scrollTop=w7J;var dom={background:$(y$D),close:$(A$),content:L_a,wrapper:$(u5e + a1 + I$1 + A03 + Q$ + n51 + n51 + i$)};function heightCalc(){var o1L=".DTE_Header";var t9$="(100vh - ";var l4t="nf";var G6z="dy_Cont";var u2L="lc";var g6W='px)';var q_e="windowPadding";var o5c="xHeight";var G8y="div.DTE_Bo";var Y7=T2A;Y7+=J7D;Y7+=o1L;var headerFooter=$(Y7,dom[e$H])[R0B]() + $(M1K,dom[e$H])[R0B]();if(isMobile()){var F8=M1o;F8+=N$xh7[194026];F8+=u2L;F8+=t9$;var D7=R3r;D7+=o5c;$(p_t,dom[e$H])[Y8J](D7,F8 + headerFooter + g6W);}else {var q5=M1o;q5+=X5U;q5+=X5U;var J5=G8y;J5+=G6z;J5+=r_e;var q_=M1o;q_+=D7J;q_+=l4t;var maxHeight=$(window)[e7T]() - self[q_][q_e] * B2Q - headerFooter;$(J5,dom[e$H])[q5](W8Z,maxHeight);}}function hide$1(dte,callback){var l_u="ox";var V7T="fset";var k5P="oun";var U6W="crollT";var K$e="resize.DTED_Light";var A9$="Ani";var n3=K$e;n3+=g66;n3+=l_u;var j6=m4L;j6+=z_7;j6+=k5P;j6+=N$xh7[562024];var J6=W_n;J6+=d75;var j5=F9f;j5+=V7T;j5+=A9$;var Q5=M1o;i3m.o$_();Q5+=D7J;Q5+=N$xh7.G7l;Q5+=N$xh7.s6X;var S6=X5U;S6+=U6W;S6+=d5J;if(!callback){callback=function(){};}$(Q14)[S6](scrollTop);dte[t2X](dom[e$H],{opacity:w7J,top:self[Q5][j5]},function(){var m4=v$T;m4+=F0W;m4+=M1o;m4+=s7p;$(this)[m4]();callback();});dte[J6](dom[j6],{opacity:w7J},function(){var f6=v$T;f6+=Y_M;i3m.L2C();f6+=L29;$(this)[f6]();});displayed$1=E3Q;$(window)[K$m](n3);}function init(){var B6x="gr";var z0X="div.DTED_Lightbox_Co";var i45="back";var A22="city";var B3H="ntent";var s6n="und";var Z2=D7J;Z2+=z21;Z2+=A22;var R7=M1o;R7+=X5U;R7+=X5U;var P$=i45;P$+=B6x;P$+=D7J;P$+=s6n;var Q1=D7J;Q1+=K8U;Q1+=N$xh7[194026];Q1+=A22;var k4=H8K;k4+=z_7;var A9=z0X;A9+=B3H;if(ready){return;}dom[A8L]=$(A9,dom[k4]);dom[e$H][Y8J](Q1,w7J);dom[P$][R7](Z2,w7J);ready=D$_;}function show$1(dte,callback){var S0L="rapper";var s2x='DTED_Lightbox_Mobile';var E1_="aut";var T87="DTED_Lightbox_Content_W";var P6L="offsetAni";var N3w="k.DTED_Lightbox";var R66="lick.DTED_Lightbox";var P89='resize.DTED_Lightbox';var M_9="div";var n0J="ightbox";var I$w="click.DTED_L";var D9j="scrollTop";var T0W="kg";var c1C="wrapp";var t0E='height';var V6n='click.DTED_Lightbox';var T3b="click.DT";var V_E="addC";var X7R="ED_Lightbox";var A8=X4o;A8+=N3w;var u8=T3b;u8+=X7R;var F7=c1C;F7+=N$xh7.Z2m;F7+=z_7;var W5=M_9;W5+=d_y;W5+=T87;W5+=S0L;var N2=D7J;N2+=N$xh7.s6X;N2+=N$xh7.s6X;var B_=g66;B_+=x3E;B_+=W9p;var O2=I$w;O2+=n0J;var M$=M1o;M$+=R66;var N1=N$xh7[194026];N1+=Y_M;N1+=l6U;var G_=E1m;G_+=p$K;G_+=z_7;if(isMobile()){var h0=V_E;h0+=p9M;h0+=N$xh7[194026];h0+=m54;$(Q14)[h0](s2x);}$(Q14)[a07](dom[W84])[a07](dom[G_]);heightCalc();if(!displayed$1){var j2=g66;j2+=D7J;j2+=N$xh7[562024];j2+=x6K;var B1=h7v;B1+=T0W;B1+=b5y;var m7=M1o;m7+=D7J;m7+=N$xh7.G7l;m7+=N$xh7.s6X;var h5=M1o;h5+=X5U;h5+=X5U;var x2=c1C;x2+=C9P;var A3=E1_;A3+=D7J;var c0=A8T;c0+=m28;c0+=r_e;displayed$1=D$_;dom[c0][Y8J](t0E,A3);dom[x2][h5]({top:-self[m7][P6L]});dte[t2X](dom[e$H],{opacity:c77,top:w7J},callback);dte[t2X](dom[B1],{opacity:c77});$(window)[h0w](P89,function(){heightCalc();});scrollTop=$(j2)[D9j]();}dom[R5m][N1](g_Q,dte[L_E][R5m])[K$m](M$)[h0w](O2,function(e){var V8=M1o;V8+=W3v;V8+=l6q;dte[V8]();});dom[B_][N2](V6n)[h0w](V6n,function(e){var M2t="stopImmediateP";var q83="pagati";var T0=M2t;T0+=r1X;T0+=q83;T0+=h0w;e[T0]();dte[W84]();});$(W5,dom[F7])[K$m](u8)[h0w](A8,function(e){var E7I="Wrapper";var m3Y="DTED_Lightbox_Content_";i3m.L2C();var L8=m3Y;L8+=E7I;var Y4=a8j;Y4+=A6K;var A5=Y_M;A5+=h$Q;A5+=Z0P;A5+=Y_M;if($(e[A5])[Y4](L8)){e[g6P]();dte[W84]();}});}var self={close:function(dte,callback){i3m.o$_();hide$1(dte,callback);},conf:{offsetAni:t2M,windowPadding:t2M},destroy:function(dte){i3m.L2C();if(displayed$1){hide$1(dte);}},init:function(dte){i3m.o$_();init();return self;},node:function(dte){i3m.o$_();return dom[e$H][w7J];},open:function(dte,append,callback){var w6j="det";var T2=p$K;T2+=N$xh7.G7l;T2+=N$xh7[562024];var c8=w6j;c8+=L29;var i5=A8T;i5+=N$xh7.G7l;i5+=M3d;i5+=m28;var content=dom[i5];content[l7P]()[c8]();content[T2](append)[a07](dom[R5m]);show$1(dte,callback);}};var DataTable$5=$[S_R][N$xh7.Y_7];function add(cfg,after,reorder){var o2F="ror adding field. Th";var g0X="tiReset";var A_B="\'.";var f3N="rever";var W7w="e field requires a `name` option";var o9p=" A field already exists with this name";var F3P="if";var Q2h="unsh";var r1D='Error adding field \'';var l_Y='initField';var d5O="ditFie";var P1=N$xh7[419025];P1+=D7J;P1+=N$xh7[562024];P1+=N$xh7.Z2m;var m5=N$xh7.s6X;m5+=Y$O;m5+=N$xh7[562024];var D8=M1o;D8+=p9M;D8+=X8B;D8+=e9T;var Y3=G14;Y3+=N$xh7[562024];var U3=c1w;U3+=V7k;if(reorder === void w7J){reorder=D$_;}if(Array[U3](cfg)){var y5=Y7q;y5+=N8u;if(after !== undefined){var I_=f3N;I_+=l6q;cfg[I_]();}for(var _i=w7J,cfg_1=cfg;_i < cfg_1[y5];_i++){var cfgDp=cfg_1[_i];this[G1N](cfgDp,after,E3Q);}this[A0g](this[c_u]());return this;}var name=cfg[y5V];if(name === undefined){var s7=i2n;s7+=o2F;s7+=W7w;throw new Error(s7);}if(this[X5U][G7e][name]){var d6=A_B;d6+=o9p;throw new Error(r1D + name + d6);}this[P30](l_Y,cfg);var editorField=new Editor[Y3](cfg,this[D8][m5],this);if(this[X5U][P1]){var q3=e9S;q3+=g0X;var g0=N$xh7.Z2m;g0+=d5O;g0+=R$c;var editFields=this[X5U][g0];editorField[q3]();$[A1F](editFields,function(idSrc,editIn){var Z0=v$T;Z0+=N$xh7.s6X;var T_=N$xh7[562024];T_+=N$xh7[194026];T_+=F0W;var value;if(editIn[T_]){var B8=N$xh7[562024];B8+=d3Q;B8+=N$xh7[194026];value=editorField[a2H](editIn[B8]);}editorField[o3P](idSrc,value !== undefined?value:editorField[Z0]());});}this[X5U][G7e][name]=editorField;if(after === undefined){var f$=K8U;f$+=X7L;f$+=s7p;var H3=O6I;H3+=C9P;this[X5U][H3][f$](name);}else if(after === L_a){var B5=Q2h;B5+=F3P;B5+=Y_M;this[X5U][c_u][B5](name);}else {var idx=$[u$n](after,this[X5U][c_u]);this[X5U][c_u][F0A](idx + c77,w7J,name);}if(reorder !== E3Q){this[A0g](this[c_u]());}return this;}function ajax(newAjax){if(newAjax){this[X5U][I5F]=newAjax;return this;}return this[X5U][I5F];}function background(){var g$u="onBackground";var s_6="lose";var H_B="lur";var m_=g66;m_+=H_B;var onBackground=this[X5U][l8j][g$u];if(typeof onBackground === N$xh7[35143]){onBackground(this);}else if(onBackground === m_){var K5=g66;K5+=p9M;K5+=M8e;this[K5]();}else if(onBackground === t4I){var F9=M1o;F9+=s_6;this[F9]();}else if(onBackground === C6c){var P0=H9o;P0+=Y_M;this[P0]();}return this;}function blur(){this[L5W]();return this;}function bubble(cells,fieldNames,showIn,opts){var z1V="ubbl";var S$A='individual';var M4T="ean";var i_=g66;i_+=z1V;i_+=N$xh7.Z2m;var T3=T67;T3+=Y_M;T3+=T1Q;var E4=f27;E4+=D7J;E4+=p9M;E4+=M4T;var _this=this;var that=this;if(this[N3L](function(){i3m.o$_();that[f5w](cells,fieldNames,opts);})){return this;}if($[j4S](fieldNames)){opts=fieldNames;fieldNames=undefined;showIn=D$_;}else if(typeof fieldNames === E4){showIn=fieldNames;fieldNames=undefined;opts=undefined;}if($[j4S](showIn)){opts=showIn;showIn=D$_;}if(showIn === undefined){showIn=D$_;}opts=$[Q1k]({},this[X5U][E6Q][f5w],opts);var editFields=this[T3](S$A,cells,fieldNames);this[d5a](cells,editFields,i_,opts,function(){var t37="pointer";var R4n="ptions";var C67='<div class="DTE_Processing_Indicator"><span></div>';var y2H="prepend";var C2i="ss=\"";var r20="iv cla";var C66="rm";var v97=" c";var A92="formInfo";var K0R="iv></div>";var W31="To";var l6w="bbleP";var r_x="bubbleNodes";var h43="e=\"";var j22="ody";var R20="nca";var y4B="pend";var G3Z="eq";var m4s="osi";var Z9p="\"><d";var M9H=" titl";var E8C='resize.';var N7u="repen";var r77="<div c";var f0j="<div";var l_8="ostop";var W6z="pper";var y$j="ormO";var t9=N3N;t9+=l_8;t9+=a1G;var f4=X4_;f4+=l6w;f4+=m4s;f4+=T0X;var U$=M1o;U$+=p9M;U$+=j6d;U$+=O0A;var t3=D7J;t3+=N$xh7.G7l;var k6=T7u;k6+=X9o;i3m.o$_();var f0=g66;f0+=b9j;f0+=d0v;var c5=o2K;c5+=C66;var r_=A_z;r_+=W51;var h6=N$xh7[562024];h6+=J3x;var Z7=H12;Z7+=T2A;Z7+=J7D;Z7+=g7w;var o6=r77;o6+=W_Y;var H2=H12;H2+=T2A;H2+=J7D;H2+=g7w;var g5=B5J;g5+=N$xh7.G7l;var u3=e69;u3+=M9H;u3+=h43;var n9=e69;n9+=g7w;var m3=f0j;m3+=v97;m3+=A6K;m3+=G97;var W3=e69;W3+=g7w;var E5=p9M;E5+=Z9F;E5+=N$xh7.Z2m;E5+=z_7;var t7=j33;t7+=r20;t7+=C2i;var U8=m9m;U8+=W6z;var l0=Z9p;l0+=K0R;l0+=H12;l0+=V8m;var U_=g66;U_+=U42;var I4=t0x;I4+=x3E;I4+=s7p;var O_=M1o;O_+=D7J;O_+=R20;O_+=Y_M;var G1=D7J;G1+=N$xh7.G7l;var o9=v92;o9+=y$j;o9+=R4n;var namespace=_this[o9](opts);var ret=_this[C_G](F0X);if(!ret){return _this;}$(window)[G1](E8C + namespace,function(){var f2y="bub";var h37="bleP";var U80="osition";var z6=f2y;z6+=h37;z6+=U80;_this[z6]();});var nodes=[];_this[X5U][r_x]=nodes[O_][N9H](nodes,pluck(editFields,I4));var classes=_this[S6t][f5w];var backgroundNode=$(w6y + classes[U_] + l0);var container=$(w6y + classes[U8] + e6e + t7 + classes[E5] + W3 + m3 + classes[O7b] + n9 + w6y + classes[R5m] + u3 + _this[g5][R5m] + F07 + C67 + n51 + H2 + o6 + classes[t37] + F07 + Z7);if(showIn){var q8=g66;q8+=j22;var l2=N$xh7[194026];l2+=K8U;l2+=y4B;l2+=W31;container[L2V](Q14);backgroundNode[l2](q8);}var liner=container[l7P]()[G3Z](w7J);var tableNode=liner[l7P]();var closeNode=tableNode[l7P]();liner[a07](_this[h6][r_]);tableNode[y2H](_this[x0b][c5]);if(opts[N64]){var Q2=d_X;Q2+=K8U;Q2+=a$k;liner[Q2](_this[x0b][A92]);}if(opts[R7J]){var C8=x3c;C8+=N$xh7[419025];var e0=K8U;e0+=N7u;e0+=N$xh7[562024];liner[e0](_this[C8][v4f]);}if(opts[f0]){var h_=g66;h_+=b9j;h_+=d0v;var f1=N$xh7[194026];f1+=K8U;f1+=k2P;f1+=N$xh7[562024];tableNode[f1](_this[x0b][h_]);}var finish=function(){var B$z="namic";var f8u="_clearDy";var r4=M1o;r4+=W3v;r4+=X5U;r4+=Y6c;var i7=f8u;i7+=B$z;i7+=w19;_this[i7]();_this[C3B](r4,[F0X]);};var pair=$()[G1N](container)[G1N](backgroundNode);_this[k6](function(submitComplete){_this[t2X](pair,{opacity:w7J},function(){var R64="e.";var L9j="resiz";if(this === container[w7J]){var F$=L9j;F$+=R64;var z0=D7J;z0+=N$xh7.s6X;z0+=N$xh7.s6X;pair[W4S]();$(window)[z0](F$ + namespace);finish();}});});backgroundNode[h0w](S9g,function(){_this[N3b]();});closeNode[t3](U$,function(){var F3=w$1;F3+=M1o;F3+=p9M;F3+=r1b;_this[F3]();});_this[f4]();_this[t9](F0X,E3Q);var opened=function(){var V_3="eFields";var M1j="lud";var Q4=g66;Q4+=H8I;Q4+=o36;Q4+=x38;var y4=D7J;y4+=k3z;y4+=G6T;y4+=N$xh7[562024];var P9=b24;P9+=n7u;P9+=M1j;P9+=V_3;_this[j0M](_this[X5U][P9],opts[p5c]);_this[C3B](y4,[Q4,_this[X5U][a64]]);};_this[t2X](pair,{opacity:c77},function(){if(this === container[w7J]){opened();}});});return this;}function bubblePosition(){var i83="left";var J55="tto";var U66='below';var i4C="top";var M97='div.DTE_Bubble';var I7P="outerWidth";var X$m="elo";var X$S="bbleNo";var Y7l="bot";var F95="div.DTE_Bubble_L";var K1j="tom";var b0F="offse";var n0K='left';var C4n="right";var K9=b0F;K9+=Y_M;var H1=Y7q;H1+=N8u;var L6=M1o;L6+=X5U;L6+=X5U;var H_=g66;H_+=J78;H_+=g66;H_+=x38;var e$=p9M;e$+=a1G;e$+=i_e;e$+=s7p;var v7=f27;v7+=J55;v7+=N$xh7[419025];var w6=W3j;w6+=s7p;w6+=Y_M;var M6=x38;M6+=C$N;var a2=N8N;a2+=y9w;var p$=X4_;p$+=X$S;p$+=v$T;p$+=X5U;var N9=F95;N9+=I1J;var wrapper=$(M97);var liner=$(N9);var nodes=this[X5U][p$];var position={bottom:w7J,left:w7J,right:w7J,top:w7J};$[A1F](nodes,function(i,nodeIn){var g7V="fsetHeight";var L4h="offset";var J2R="righ";var d2a="eft";var H8H="bottom";var g9=F9f;g9+=g7V;var o4=Y_M;o4+=D7J;o4+=K8U;var v2=J2R;v2+=Y_M;var a4=p9M;a4+=d2a;var g2=x38;g2+=C$N;var I3=Y_M;I3+=D7J;I3+=K8U;var pos=$(nodeIn)[L4h]();nodeIn=$(nodeIn)[L6w](w7J);position[I3]+=pos[i4C];position[g2]+=pos[a4];position[v2]+=pos[i83] + nodeIn[B7E];position[H8H]+=pos[o4] + nodeIn[g9];});position[i4C]/=nodes[a2];position[M6]/=nodes[b$C];position[w6]/=nodes[b$C];position[v7]/=nodes[e$];var top=position[i4C];var left=(position[i83] + position[C4n]) / B2Q;var width=liner[I7P]();var visLeft=left - width / B2Q;var visRight=visLeft + width;var docWidth=$(window)[z$Z]();var padding=c74;this[S6t][H_];wrapper[L6]({left:left,top:top});if(liner[H1] && liner[K9]()[i4C] < w7J){var R3=g66;R3+=X$m;R3+=e36;var U2=Y7l;U2+=K1j;var x0=Y_M;x0+=D7J;x0+=K8U;var p1=M1o;p1+=X5U;p1+=X5U;wrapper[p1](x0,position[U2])[L2m](R3);}else {wrapper[C3Q](U66);}if(visRight + padding > docWidth){var b_=p9M;b_+=N$xh7.Z2m;b_+=N$xh7.s6X;b_+=Y_M;var diff=visRight - docWidth;liner[Y8J](b_,visLeft < padding?-(visLeft - padding):-(diff + padding));}else {var M2=M1o;M2+=X5U;M2+=X5U;liner[M2](n0K,visLeft < padding?-(visLeft - padding):w7J);}return this;}function buttons(buttonsIn){var K6=J3k;K6+=K8U;K6+=Y_M;K6+=x6K;var q1=X4_;q1+=Y_M;q1+=Y_M;q1+=M3S;var _this=this;if(buttonsIn === F9T){buttonsIn=[{action:function(){var D9=f5v;i3m.L2C();D9+=Y5v;D9+=Y_M;this[D9]();},text:this[L_E][this[X5U][a64]][i6q]}];}else if(!Array[U1F](buttonsIn)){buttonsIn=[buttonsIn];}$(this[x0b][q1])[K6]();$[A1F](buttonsIn,function(i,btn){var p_Z="className";var M7J="<but";var g6x="ton>";var M6O="yu";var V5j="ctio";var j3c="ton></but";var s_p="tabIn";var g0r="tabIndex";var d5I="eypress";var H4=N$xh7[562024];H4+=D7J;H4+=N$xh7[419025];var p8=D7J;p8+=N$xh7.G7l;var R8=O0A;R8+=d5I;var p7=O0A;p7+=N$xh7.Z2m;p7+=M6O;p7+=K8U;var E7=s_p;E7+=N17;var R4=Y_w;R4+=H3N;R4+=N$xh7.Z2m;R4+=t6B;var a_=N$xh7.s6X;a_+=A$U;a_+=b24;a_+=h0w;var I9=e$V;I9+=X8B;I9+=t9o;var a8=g66;a8+=B98;a8+=V1S;var C7=W91;C7+=X5U;C7+=e9T;var z1=M7J;z1+=j3c;z1+=g6x;var K0=N$xh7[194026];K0+=V5j;K0+=N$xh7.G7l;if(typeof btn === F4D){btn={action:function(){this[i6q]();},text:btn};}var text=btn[m6m] || btn[g8I];var action=btn[K0] || btn[S_R];var attr=btn[M3P] || ({});$(z1,{class:_this[C7][A_z][a8] + (btn[I9]?u2y + btn[p_Z]:J3K)})[U1f](typeof text === a_?text(_this):text || J3K)[M3P](R4,btn[E7] !== undefined?btn[g0r]:w7J)[M3P](attr)[h0w](p7,function(e){i3m.o$_();if(e[W6V] === z7A && action){action[q8Y](_this);}})[h0w](R8,function(e){var e6=W8i;e6+=j6d;e6+=s7p;if(e[e6] === z7A){e[A6O]();}})[p8](S9g,function(e){e[A6O]();if(action){var z7=M1o;z7+=N$xh7[194026];z7+=a$D;action[z7](_this,e);}})[L2V](_this[H4][e2Y]);});return this;}function clear(fieldName){var F6a="ludeFie";var G15="fieldNam";var V8q="inc";var e2m="udeFie";var that=this;var sFields=this[X5U][G7e];if(typeof fieldName === F4D){var e3=V8q;e3+=p9M;e3+=e2m;e3+=R$c;var b7=O6I;b7+=C9P;var X6=D7J;X6+=a$F;var c9=U9M;c9+=z_7;c9+=N$xh7[194026];c9+=x6K;var P8=N$xh7.s6X;P8+=L7T;P8+=Y4z;that[P8](fieldName)[V$Z]();delete sFields[fieldName];var orderIdx=$[c9](fieldName,this[X5U][X6]);this[X5U][b7][F0A](orderIdx,c77);var includeIdx=$[u$n](fieldName,this[X5U][e3]);if(includeIdx !== -c77){var B6=V8q;B6+=F6a;B6+=R$c;this[X5U][B6][F0A](includeIdx,c77);}}else {var r2=w$1;r2+=G15;r2+=N$xh7.Z2m;r2+=X5U;$[A1F](this[r2](fieldName),function(i,name){var i3=e$V;i3+=N$xh7.Z2m;i3+=h$Q;i3m.L2C();that[i3](name);});}return this;}function close(){var g6=g7L;g6+=D7J;g6+=l6q;this[g6](E3Q);i3m.L2C();return this;}function create(arg1,arg2,arg3,arg4){var o7A="_actionC";var K5U='initCreate';var w3v="numbe";var U0D="itFi";var W9g="editFiel";var w0g="cru";var Q4S="dArgs";var e_=w$1;e_+=N$xh7.Z2m;e_+=b9o;e_+=Y_M;var r5=o7A;r5+=A6K;var e9=m79;e9+=s7M;e9+=N$xh7.Z2m;var U5=N$xh7[562024];U5+=D7J;U5+=N$xh7[419025];var u5=N$xh7[419025];u5+=D7J;u5+=N$xh7[562024];u5+=N$xh7.Z2m;var M0=w$1;M0+=w0g;M0+=Q4S;var v5=N$xh7.Z2m;v5+=N$xh7[562024];v5+=U0D;v5+=V$P;var k0=w3v;k0+=z_7;var A1=N$xh7.s6X;A1+=b24;A1+=Q3b;A1+=E_o;var _this=this;var that=this;var sFields=this[X5U][A1];var count=c77;if(this[N3L](function(){i3m.o$_();var y6=M1o;y6+=k9Q;that[y6](arg1,arg2,arg3,arg4);})){return this;}if(typeof arg1 === k0){count=arg1;arg1=arg2;arg2=arg3;}this[X5U][v5]={};for(var i=w7J;i < count;i++){var J7=K2T;J7+=V$P;var O7=W9g;O7+=E_o;this[X5U][O7][i]={fields:this[X5U][J7]};}var argOpts=this[M0](arg1,arg2,arg3,arg4);this[X5U][u5]=J7T;this[X5U][a64]=m38;this[X5U][L6i]=L_a;this[U5][A_z][e9][j0P]=Y26;this[r5]();this[A0g](this[G7e]());$[A1F](sFields,function(name,fieldIn){var q8X="multiReset";fieldIn[q8X]();for(var i=w7J;i < count;i++){fieldIn[o3P](i,fieldIn[W9U]());}fieldIn[M3V](fieldIn[W9U]());});this[e_](K5U,L_a,function(){var D9f="Optio";var l_o="maybe";var P4I="bleMain";var d4=l_o;d4+=b7_;var P5=D7J;P5+=s4f;var i4=w$1;i4+=A_z;i4+=D9f;i4+=d0v;var q0=g_Z;q0+=P4I;_this[q0]();_this[i4](argOpts[P5]);argOpts[d4]();});return this;}function undependent(parent){i3m.L2C();var d1O="undependent";var o9X="dep";var p_=d_y;p_+=N$xh7.Z2m;p_+=o9X;var s3=N$xh7.G7l;s3+=D7J;s3+=N$xh7[562024];s3+=N$xh7.Z2m;var X_=K2T;X_+=Q3b;X_+=N$xh7[562024];if(Array[U1F](parent)){var m6=N8N;m6+=U42;m6+=Y_M;m6+=s7p;for(var i=w7J,ien=parent[m6];i < ien;i++){this[d1O](parent[i]);}return this;}$(this[X_](parent)[s3]())[K$m](p_);return this;}function dependent(parent,url,opts){var y85='.edep';var E5H="pendent";var i6g='change';var i2=K7v;i2+=a1G;i2+=Y_M;var m0=D7J;m0+=N$xh7.G7l;var I7=w62;I7+=v$T;var e7=g_d;e7+=Y_M;e7+=a1G;e7+=N$xh7[562024];var R5=p22;R5+=x_G;R5+=C1m;var w3=c1w;i3m.o$_();w3+=g1u;w3+=x6K;var _this=this;if(Array[w3](parent)){for(var i=w7J,ien=parent[b$C];i < ien;i++){var l$=v$T;l$+=E5H;this[l$](parent[i],url,opts);}return this;}var that=this;var parentField=this[j97](parent);var ajaxOpts={dataType:S8U,type:R5};opts=$[e7]({data:L_a,event:i6g,postUpdate:L_a,preUpdate:L_a},opts);var update=function(json){var z0n="isable";var s$o='show';var z$J="postUpdate";var D1n="preUpdate";var h9j='error';var s_Z="enab";var z9i='hide';var g$s='message';var k5=N$xh7[562024];k5+=z0n;var C_=s_Z;C_+=x38;var s1=N$xh7.Z2m;s1+=L29;var D2=J7D;D2+=x83;var u4=h31;u4+=N$xh7[562024];u4+=d3Q;u4+=N$xh7.Z2m;var n8=u3q;n8+=z6R;if(opts[D1n]){opts[D1n](json);}$[n8]({errors:h9j,labels:D4S,messages:g$s,options:u4,values:D2},function(jsonProp,fieldFn){i3m.L2C();if(json[jsonProp]){var d8=N$xh7.Z2m;d8+=x3E;d8+=s7p;$[d8](json[jsonProp],function(fieldIn,valIn){var m9=y7Q;m9+=N$xh7[562024];that[m9](fieldIn)[fieldFn](valIn);});}});i3m.o$_();$[s1]([z9i,s$o,C_,k5],function(i,key){i3m.o$_();if(json[key]){that[key](json[key],json[d6y]);}});if(opts[z$J]){opts[z$J](json);}parentField[l9B](E3Q);};$(parentField[I7]())[m0](opts[i2] + y85,function(e){var p4o="then";var R99="editF";var r2$="isPla";var J0v="inObject";var F$5="rl";var l3t="values";var v6=N$xh7[562024];v6+=d3Q;v6+=N$xh7[194026];var i8=J7D;i8+=N$xh7[194026];i8+=p9M;var d7=r1X;d7+=x5Q;var e5=r1X;e5+=x5Q;var K2=z_7;K2+=D7J;K2+=e36;var b5=R99;b5+=B4O;var b0=r1X;b0+=e36;b0+=X5U;var x4=G4$;x4+=s$j;x4+=U42;var E8=K2T;E8+=N$xh7.G7l;E8+=N$xh7[562024];if($(parentField[j5k]())[E8](e[J$I])[b$C] === w7J){return;}parentField[x4](D$_);var data={};data[b0]=_this[X5U][X5X]?pluck(_this[X5U][b5],D62):L_a;data[K2]=data[e5]?data[d7][w7J]:L_a;data[l3t]=_this[i8]();if(opts[v6]){var F6=N$xh7[562024];F6+=d3Q;F6+=N$xh7[194026];var ret=opts[F6](data);if(ret){opts[u_k]=ret;}}if(typeof url === N$xh7[35143]){var v1=J7D;v1+=x83;var c_=I1q;c_+=p9M;var o=url[c_](_this,parentField[v1](),data,update,e);if(o){var i1=O8C;i1+=n7u;i1+=Y_M;i1+=c8F;var R6=Y_M;R6+=s7p;R6+=a1G;if(typeof o === N$xh7.Q3W && typeof o[R6] === i1){o[p4o](function(resolved){if(resolved){update(resolved);}});}else {update(o);}}}else {var M4=N$xh7[194026];M4+=y4g;M4+=t6B;var v4=r2$;v4+=J0v;if($[v4](url)){$[Q1k](ajaxOpts,url);}else {var p4=H8I;p4+=F$5;ajaxOpts[p4]=url;}$[M4]($[Q1k](ajaxOpts,{data:data,success:update}));}});return this;}function destroy(){var c3c="estroy";var b6q="ayContr";var w7Q="yed";var e2K="ol";var o6q="ppen";var P3n='.dte';var B6_="plate";var L$=D7J;L$+=N$xh7.s6X;L$+=N$xh7.s6X;var w2=C6e;w2+=b6q;w2+=e2K;w2+=U3S;var p6=l9R;i3m.o$_();p6+=B6_;var M8=e$V;M8+=u3q;M8+=z_7;var v_=T2A;v_+=i1o;v_+=w7Q;if(this[X5U][v_]){var f9=J5R;f9+=N$xh7.Z2m;this[f9]();}this[M8]();if(this[X5U][p6]){var l7=N$xh7[194026];l7+=o6q;l7+=N$xh7[562024];var q2=g66;q2+=D7J;q2+=N$xh7[562024];q2+=x6K;$(q2)[l7](this[X5U][K1w]);}var controller=this[X5U][w2];if(controller[V$Z]){var V1=N$xh7[562024];V1+=c3c;controller[V1](this);}$(document)[L$](P3n + this[X5U][r8C]);this[x0b]=L_a;this[X5U]=L_a;}function disable(name){var w1D="eldN";var W18="ames";var K4=d4q;K4+=w1D;i3m.o$_();K4+=W18;var that=this;$[A1F](this[K4](name),function(i,n){i3m.L2C();var P7=T2A;P7+=P0L;P7+=x4c;that[j97](n)[P7]();});return this;}function display(showIn){var u$=D7J;u$+=K8U;u$+=N$xh7.Z2m;u$+=N$xh7.G7l;if(showIn === undefined){var H0=j0P;H0+=Y6c;return this[X5U][H0];}i3m.L2C();return this[showIn?u$:t4I]();}function displayed(){return $[H8R](this[X5U][G7e],function(fieldIn,name){i3m.L2C();return fieldIn[W_x]()?name:L_a;});}function displayNode(){var m86="lle";var D4_="nod";var t3S="displayCo";var T4w="ntro";var Q_=D4_;Q_+=N$xh7.Z2m;var S4=t3S;S4+=T4w;S4+=m86;S4+=z_7;return this[X5U][S4][Q_](this);}function edit(items,arg1,arg2,arg3,arg4){var e0K="crudArg";var R2=d5J;R2+=W9X;var K$=K2T;K$+=N$xh7.Z2m;K$+=R$c;var j$=T67;j$+=Y_M;j$+=T1Q;var n7=w$1;n7+=Y6c;n7+=b24;n7+=Y_M;var T1=w$1;T1+=e0K;T1+=X5U;var _this=this;var that=this;if(this[N3L](function(){var b2=N$xh7.Z2m;b2+=T2A;b2+=Y_M;that[b2](items,arg1,arg2,arg3,arg4);})){return this;}var argOpts=this[T1](arg1,arg2,arg3,arg4);this[n7](items,this[j$](K$,items),J7T,argOpts[R2],function(){var W2q="maybeOpen";var k4Y="Op";var F3j="_assembleMain";var r9C="_form";var T7=r9C;T7+=k4Y;T7+=d$j;T7+=d0v;_this[F3j]();_this[T7](argOpts[r0$]);argOpts[W2q]();});return this;}function enable(name){var Z7N="_fieldNames";var that=this;$[A1F](this[Z7N](name),function(i,n){var Q3=K2T;Q3+=N$xh7.Z2m;Q3+=p9M;Q3+=N$xh7[562024];that[Q3](n)[a6L]();});return this;}function error$1(name,msg){var M3X="global";var D6=N$xh7[562024];D6+=D7J;D6+=N$xh7[419025];var wrapper=$(this[D6][e$H]);if(msg === undefined){var I1=M3X;I1+=J0$;I1+=w90;I1+=z_7;var K_=K5H;K_+=N$xh7.Z2m;this[K_](this[x0b][s6q],name,D$_,function(){var W1e='inFormError';var B29="ggleClass";var t4=X4b;t4+=B29;wrapper[t4](W1e,name !== undefined && name !== J3K);});this[X5U][I1]=name;}else {var k8=K2T;k8+=J9A;this[k8](name)[U0X](msg);}return this;}function field(name){var r3N="eld na";var d5k="me - ";var q29="Unknown fi";var sFields=this[X5U][G7e];if(!sFields[name]){var M3=q29;M3+=r3N;M3+=d5k;throw new Error(M3 + name);}return sFields[name];}function fields(){var J8=p85;J8+=Y4z;J8+=X5U;return $[H8R](this[X5U][J8],function(fieldIn,name){i3m.o$_();return name;});}function file(name,id){var n45="e i";var P3Z="d ";var u0f="Unknown fil";var p5D=' in table ';i3m.o$_();var tableFromFile=this[j$v](name);var fileFromTable=tableFromFile[id];if(!fileFromTable){var Y6=u0f;Y6+=n45;Y6+=P3Z;throw new Error(Y6 + id + p5D + name);}return tableFromFile[id];}function files(name){var D0s='Unknown file table name: ';var Q7C=K2T;Q7C+=p9M;Q7C+=e9T;if(!name){return Editor[j$v];}var editorTable=Editor[Q7C][name];if(!editorTable){throw new Error(D0s + name);}return editorTable;}function get(name){var that=this;if(!name){name=this[G7e]();}i3m.L2C();if(Array[U1F](name)){var out_1={};$[A1F](name,function(i,n){var l5W=K2T;l5W+=Q3b;l5W+=N$xh7[562024];out_1[n]=that[l5W](n)[L6w]();});return out_1;}return this[j97](name)[L6w]();}function hide(names,animate){var h8Z="Na";i3m.L2C();var C3D="_field";var Q9k=C3D;Q9k+=h8Z;Q9k+=r7I;var that=this;$[A1F](this[Q9k](names),function(i,n){var y3I=K2T;y3I+=N$xh7.Z2m;y3I+=p9M;y3I+=N$xh7[562024];i3m.L2C();that[y3I](n)[f0B](animate);});return this;}function ids(includeHash){i3m.L2C();var w3s="tFields";var z4T=C3o;z4T+=w3s;var q$y=R3r;q$y+=K8U;if(includeHash === void w7J){includeHash=E3Q;}return $[q$y](this[X5U][z4T],function(editIn,idSrc){i3m.o$_();return includeHash === D$_?i$3 + idSrc:idSrc;});}function inError(inNames){var c9Q="glo";var b2p="balEr";var p1k="dNames";var Z8m="formE";var Z3a=d4q;Z3a+=N$xh7.Z2m;Z3a+=p9M;Z3a+=p1k;var g2A=c9Q;g2A+=b2p;g2A+=l9f;var i_S=Z8m;i_S+=z_7;i_S+=l9f;var Q$6=N$xh7[562024];Q$6+=D7J;Q$6+=N$xh7[419025];$(this[Q$6][i_S]);if(this[X5U][g2A]){return D$_;}var names=this[Z3a](inNames);for(var i=w7J,ien=names[b$C];i < ien;i++){var W8b=Z9F;W8b+=J0$;W8b+=D6H;var Q9u=K2T;Q9u+=J9A;if(this[Q9u](names[i])[W8b]()){return D$_;}}return E3Q;}function inline(cell,fieldName,opts){var n82='Cannot edit more than one row inline at a time';var H3q="Opt";var S2i="ndivi";var v08="dual";var Z4R='div.DTE_Field';var B08="ush";var b7x=Z9F;b7x+=L1U;var E5Q=d3Q;E5Q+=R3R;var b3q=t7Q;b3q+=s7p;var W4X=O0A;W4X+=N$xh7.Z2m;W4X+=x6K;W4X+=X5U;var D7S=b24;D7S+=S2i;D7S+=v08;var v59=a9A;v59+=N$xh7[419025];v59+=H3q;v59+=a1u;var i75=g_d;i75+=M3d;i75+=S5V;var _this=this;var that=this;if($[j4S](fieldName)){opts=fieldName;fieldName=undefined;}opts=$[i75]({},this[X5U][v59][X9S],opts);var editFields=this[P30](D7S,cell,fieldName);i3m.L2C();var keys=Object[W4X](editFields);if(keys[b3q] > c77){throw new Error(n82);}var editRow=editFields[keys[w7J]];var hosts=[];for(var _i=w7J,_a=editRow[E5Q];_i < _a[b$C];_i++){var A7x=K8U;A7x+=B08;var row=_a[_i];hosts[A7x](row);}if($(Z4R,hosts)[b$C]){return this;}if(this[N3L](function(){i3m.L2C();that[X9S](cell,fieldName,opts);})){return this;}this[d5a](cell,editFields,b7x,opts,function(){var r$G="_inline";_this[r$G](editFields,opts);});return this;}function inlineCreate(insertPoint,opts){var r5r="lin";var y7H="formOpti";var V7v="sPlainO";var v9o="xten";var e4p="ionClas";var L2w="fak";var B6s="initC";var c9X="Row";var j20=B6s;j20+=k9Q;var k19=U_Y;k19+=r_e;var X6m=m2i;X6m+=G14;X6m+=E_o;var l2I=w$1;l2I+=Z9F;l2I+=r5r;l2I+=N$xh7.Z2m;var C2s=W_n;C2s+=a97;C2s+=e4p;C2s+=X5U;var M6U=y7H;M6U+=h0w;M6U+=X5U;var K5t=N$xh7.Z2m;K5t+=v9o;K5t+=N$xh7[562024];i3m.o$_();var n9r=L2w;n9r+=N$xh7.Z2m;n9r+=c9X;var g8H=x3E;g8H+=Y_M;g8H+=O3R;g8H+=N$xh7.G7l;var Z9f=y7Q;Z9f+=E_o;var N_f=b24;N_f+=V7v;N_f+=t4V;var _this=this;if($[N_f](insertPoint)){opts=insertPoint;insertPoint=L_a;}if(this[N3L](function(){var H$r="Create";var j6K=Z9F;j6K+=o$N;i3m.o$_();j6K+=G6T;j6K+=H$r;_this[j6K](insertPoint,opts);})){return this;}$[A1F](this[X5U][Z9f],function(name,fieldIn){var c$M="ultiS";var Z_d="ltiReset";var w1l=N$xh7[562024];w1l+=N$xh7.Z2m;w1l+=N$xh7.s6X;var O8R=X5U;O8R+=N$xh7.Z2m;O8R+=Y_M;var t7u=N$xh7[419025];t7u+=c$M;t7u+=N$xh7.Z2m;t7u+=Y_M;var N0L=V6M;N0L+=Z_d;fieldIn[N0L]();fieldIn[t7u](w7J,fieldIn[W9U]());fieldIn[O8R](fieldIn[w1l]());});this[X5U][m3l]=J7T;this[X5U][g8H]=m38;this[X5U][L6i]=L_a;this[X5U][X5X]=this[P30](n9r,insertPoint);opts=$[K5t]({},this[X5U][M6U][X9S],opts);this[C2s]();this[l2I](this[X5U][X6m],opts,function(){var U30="ource";var o52="ke";var V6g="RowEnd";var G2s="taS";var V2$=N$xh7.s6X;V2$+=N$xh7[194026];V2$+=o52;V2$+=V6g;var n_q=w$1;n_q+=Y50;i3m.o$_();n_q+=G2s;n_q+=U30;_this[n_q](V2$);});this[k19](j20,L_a);return this;}function message(name,msg){var s20="_message";var L5f="rmInfo";if(msg === undefined){var i9e=o2K;i9e+=L5f;this[s20](this[x0b][i9e],name);}else {var W_k=N$xh7.s6X;W_k+=Y$O;W_k+=N$xh7[562024];this[W_k](name)[N64](msg);}return this;}function mode(modeIn){var N0i="Changing from cre";var n9Q="is not supported";var V3X="ate mode ";var L0b="Not currently in an editing";var q8N=N$xh7[194026];q8N+=p$I;var t_E=b5L;t_E+=Y_M;t_E+=N$xh7.Z2m;var k5s=e2o;k5s+=d3Q;k5s+=N$xh7.Z2m;var d4c=N$xh7[194026];d4c+=M1o;d4c+=Y_M;d4c+=c8F;if(!modeIn){return this[X5U][a64];}if(!this[X5U][a64]){var O$2=L0b;O$2+=Y4v;O$2+=N$xh7[419025];O$2+=Q6J;throw new Error(O$2);}else if(this[X5U][d4c] === k5s && modeIn !== t_E){var b9R=N0i;b9R+=V3X;b9R+=n9Q;throw new Error(b9R);}this[X5U][q8N]=modeIn;return this;}function modifier(){i3m.L2C();var Q2l="modifi";var l6$=Q2l;l6$+=C9P;return this[X5U][l6$];}function multiGet(fieldNames){var u5h="ltiGet";i3m.o$_();var Q0Q=V6M;Q0Q+=u5h;var that=this;if(fieldNames === undefined){var l1j=N$xh7.s6X;l1j+=Y$O;l1j+=E_o;fieldNames=this[l1j]();}if(Array[U1F](fieldNames)){var l$h=N$xh7.Z2m;l$h+=N$xh7[194026];l$h+=M1o;l$h+=s7p;var out_2={};$[l$h](fieldNames,function(i,name){var j7F=V6M;j7F+=u5h;var T8p=K2T;T8p+=J9A;out_2[name]=that[T8p](name)[j7F]();});return out_2;}return this[j97](fieldNames)[Q0Q]();}function multiSet(fieldNames,valIn){var O4r="ltiS";var j42=M_x;j42+=j3D;var that=this;if($[j42](fieldNames) && valIn === undefined){$[A1F](fieldNames,function(name,value){var h2M="ltiSet";var D9o=V6M;D9o+=h2M;that[j97](name)[D9o](value);});}else {var A09=V6M;A09+=O4r;A09+=v1p;var D6u=N$xh7.s6X;D6u+=v7d;this[D6u](fieldNames)[A09](valIn);}return this;}function node(name){var v3K=X$Z;v3K+=t0B;v3K+=x2e;v3K+=R$0;var that=this;if(!name){var V8N=D7J;V8N+=a$F;name=this[V8N]();}return Array[v3K](name)?$[H8R](name,function(n){var v3z=N$xh7.G7l;v3z+=D7J;v3z+=N$xh7[562024];i3m.L2C();v3z+=N$xh7.Z2m;return that[j97](n)[v3z]();}):this[j97](name)[j5k]();}function off(name,fn){$(this)[K$m](this[a0y](name),fn);return this;}function on(name,fn){$(this)[h0w](this[a0y](name),fn);i3m.L2C();return this;}function one(name,fn){var u34=U4X;u34+=J7D;u34+=r_e;u34+=t9o;$(this)[f8i](this[u34](name),fn);return this;}function open(){var U50="_nest";var b9t="oseReg";var N46="nest";var A3_="editO";var b_1=A3_;b_1+=s4f;var k2o=U50;k2o+=Y6c;k2o+=b7_;var X5K=g7L;X5K+=b9t;var _this=this;this[A0g]();this[X5K](function(){i3m.L2C();_this[e4F](function(){var B3B="_cle";var p1X="arD";var e0g="ynamicInfo";var u9n='closed';var P2M=N$xh7[419025];P2M+=N$xh7[194026];P2M+=b24;P2M+=N$xh7.G7l;var Z1o=U4X;Z1o+=J7D;Z1o+=r_e;var G74=B3B;G74+=p1X;G74+=e0g;_this[G74]();_this[Z1o](u9n,[P2M]);});});var ret=this[C_G](J7T);if(!ret){return this;}this[k2o](function(){var i_s="orde";var M3r=X8z;M3r+=O3R;M3r+=N$xh7.G7l;var Y58=P$0;Y58+=N$xh7.G7l;i3m.L2C();Y58+=N$xh7.Z2m;Y58+=N$xh7[562024];var E9D=N7r;E9D+=N$xh7.G7l;E9D+=Y_M;var g8A=i_s;g8A+=z_7;var D_V=N$xh7[419025];D_V+=N$xh7[194026];D_V+=K8U;var d74=w$1;d74+=o2K;d74+=M1o;d74+=X7L;_this[d74]($[D_V](_this[X5U][g8A],function(name){var h$z=N$xh7.s6X;h$z+=b24;i3m.o$_();h$z+=J9A;h$z+=X5U;return _this[X5U][h$z][name];}),_this[X5U][l8j][p5c]);_this[E9D](Y58,[J7T,_this[X5U][M3r]]);},this[X5U][b_1][N46]);this[t5Q](J7T,E3Q);return this;}function order(setIn){var c1G="layReorder";var j_h="sor";var M7y='All fields, and no additional fields, must be provided for ordering.';var n5m=d7o;n5m+=C6Y;n5m+=c1G;var S1w=G1H;S1w+=l8q;var d6u=l9g;d6u+=N$xh7[562024];var L59=X5U;L59+=G1H;L59+=Y_M;var H_f=X5U;H_f+=p9M;H_f+=b24;H_f+=p39;var l8U=j_h;l8U+=Y_M;var F$J=m8l;F$J+=x6K;var L4H=Y7q;L4H+=N8u;if(!setIn){return this[X5U][c_u];}if(arguments[L4H] && !Array[F$J](setIn)){var P0Z=n0f;P0Z+=b24;P0Z+=p39;setIn=Array[U1C][P0Z][q8Y](arguments);}if(this[X5U][c_u][N13]()[l8U]()[Q_E](x3$) !== setIn[H_f]()[L59]()[Q_E](x3$)){throw new Error(M7y);}$[d6u](this[X5U][S1w],setIn);this[n5m]();return this;}function remove(items,arg1,arg2,arg3,arg4){var V_O="_actionCl";var C3G='initRemove';var v9w="_dat";var H0f=N$xh7[562024];H0f+=N$xh7[194026];H0f+=Y_M;H0f+=N$xh7[194026];var e6J=V_O;e6J+=X8B;var n3v=w62;n3v+=G6T;var G51=m79;G51+=s7M;G51+=N$xh7.Z2m;var I31=N$xh7.s6X;I31+=D7J;I31+=z_7;I31+=N$xh7[419025];var z8D=N$xh7[562024];z8D+=D7J;z8D+=N$xh7[419025];var s9$=N$xh7.Z2m;s9$+=g4Z;s9$+=Q3b;s9$+=E_o;var h05=U$T;h05+=h0w;var J$p=v9w;J$p+=T1Q;var L7p=p9M;L7p+=X9O;L7p+=Y_M;L7p+=s7p;var _this=this;var that=this;if(this[N3L](function(){i3m.L2C();that[z18](items,arg1,arg2,arg3,arg4);})){return this;}if(items[L7p] === undefined){items=[items];}var argOpts=this[S30](arg1,arg2,arg3,arg4);var editFields=this[J$p](C$J,items);this[X5U][h05]=k2r;this[X5U][L6i]=items;this[X5U][s9$]=editFields;this[z8D][I31][G51][j0P]=n3v;this[e6J]();this[C3B](C3G,[pluck(editFields,h9G),pluck(editFields,H0f),items],function(){var y79="initMultiRem";i3m.L2C();var T8f=y79;T8f+=A72;var M7V=w$1;M7V+=K7v;M7V+=a1G;M7V+=Y_M;_this[M7V](T8f,[editFields,items],function(){var z8u="_assemb";var l5x="_formOptions";var L6H="leMain";var c_Z="aybeO";var a2o=N$xh7[419025];a2o+=c_Z;a2o+=k3z;a2o+=N$xh7.G7l;var a9P=D7J;a9P+=K8U;a9P+=Y_M;a9P+=X5U;var z9W=z8u;z9W+=L6H;i3m.o$_();_this[z9W]();_this[l5x](argOpts[a9P]);argOpts[a2o]();var opts=_this[X5U][l8j];if(opts[p5c] !== L_a){var W3x=N6r;W3x+=X5U;var z4B=N$xh7.s6X;z4B+=s1g;z4B+=H8I;z4B+=X5U;var T6h=N$xh7.Z2m;T6h+=q3F;var U7c=x3c;U7c+=N$xh7[419025];var p3l=m0i;p3l+=h0w;$(p3l,_this[U7c][e2Y])[T6h](opts[z4B])[W3x]();}});});return this;}function set(setIn,valIn){var s4_="ject";i3m.o$_();var T9b="isPlain";var J6v="Ob";var B0s=T9b;B0s+=J6v;B0s+=s4_;var that=this;if(!$[B0s](setIn)){var o={};o[setIn]=valIn;setIn=o;}$[A1F](setIn,function(n,v){var n7E=X5U;n7E+=v1p;var A0H=K2T;A0H+=J9A;i3m.L2C();that[A0H](n)[n7E](v);});return this;}function show(names,animate){var u6Y="ldNames";var W3U=v92;W3U+=L7T;W3U+=u6Y;var that=this;$[A1F](this[W3U](names),function(i,n){var F_b=X5U;F_b+=s7p;F_b+=D7J;F_b+=e36;i3m.L2C();that[j97](n)[F_b](animate);});i3m.L2C();return this;}function submit(successCallback,errorCallback,formatdata,hideIn){var T12="_process";var E2v="ces";var q36=N$xh7.Z2m;q36+=N$xh7[194026];q36+=M1o;q36+=s7p;var h3q=N$xh7.Z2m;h3q+=L29;var w7r=T12;w7r+=b24;w7r+=h1I;var l08=K8U;l08+=r1X;l08+=E2v;l08+=O2x;var i5a=j97;i5a+=X5U;var _this=this;var sFields=this[X5U][i5a];var errorFields=[];var errorReady=w7J;var sent=E3Q;if(this[X5U][l08] || !this[X5U][a64]){return this;}this[w7r](D$_);var send=function(){var b9u='initSubmit';var f72=x3E;f72+=Y_M;i3m.o$_();f72+=c8F;if(errorFields[b$C] !== errorReady || sent){return;}_this[C3B](b9u,[_this[X5U][f72]],function(result){i3m.o$_();if(result === E3Q){_this[J0Q](E3Q);return;}sent=D$_;_this[g$H](successCallback,errorCallback,formatdata,hideIn);});};this[U0X]();$[h3q](sFields,function(name,fieldIn){i3m.o$_();if(fieldIn[a$K]()){errorFields[T7B](name);}});$[q36](errorFields,function(i,name){i3m.o$_();sFields[name][U0X](J3K,function(){errorReady++;i3m.L2C();send();});});send();return this;}function table(setIn){if(setIn === undefined){var o8u=Y_w;o8u+=x38;return this[X5U][o8u];}this[X5U][O7b]=setIn;return this;}function template(setIn){var y4c="pla";i3m.L2C();if(setIn === undefined){var d55=l9R;d55+=y4c;d55+=M3d;return this[X5U][d55];}this[X5U][K1w]=setIn === L_a?L_a:$(setIn);return this;}function title(titleIn){var V9J="v.";var x4r=s7p;x4r+=Y_M;x4r+=V0v;var R$Y=N$xh7.s6X;R$Y+=U2_;R$Y+=Y_M;R$Y+=c8F;var M$f=m6i;M$f+=m3D;M$f+=N$xh7.Z2m;M$f+=z_7;var w9A=N$xh7[562024];w9A+=b24;w9A+=V9J;var Z1r=N$xh7[562024];Z1r+=D7J;Z1r+=N$xh7[419025];var header=$(this[Z1r][v4f])[l7P](w9A + this[S6t][M$f][A8L]);if(titleIn === undefined){var W9l=s7p;W9l+=z_A;W9l+=p9M;return header[W9l]();}if(typeof titleIn === R$Y){var W_N=Y_M;W_N+=N$xh7[194026];W_N+=x4c;titleIn=titleIn(this,new DataTable$5[J36](this[X5U][W_N]));}header[x4r](titleIn);return this;}function val(fieldIn,value){if(value !== undefined || $[j4S](fieldIn)){var P_x=X5U;P_x+=N$xh7.Z2m;P_x+=Y_M;return this[P_x](fieldIn,value);}return this[L6w](fieldIn);;}function error(msg,tn,thro){var n7w="mation, please refer to https://datatables.net/tn/";var G8T="infor";var A31=" For more ";i3m.L2C();var v0L="warn";var l5U=A31;l5U+=G8T;l5U+=n7w;if(thro === void w7J){thro=D$_;}var display=tn?msg + l5U + tn:msg;if(thro){throw display;}else {console[v0L](display);}}function pairs(data,props,fn){var q4E="isPl";var d2l="ai";i3m.L2C();var j_C="abe";var e0p="nObj";var T9t=b24;T9t+=X5U;T9t+=p6h;var i;var ien;var dataPoint;props=$[Q1k]({label:D4S,value:K0T},props);if(Array[T9t](data)){var O6d=t7Q;O6d+=s7p;for((i=w7J,ien=data[O6d]);i < ien;i++){var j9P=q4E;j9P+=d2l;j9P+=e0p;j9P+=j3D;dataPoint=data[i];if($[j9P](dataPoint)){var s5w=N$xh7[194026];s5w+=b2e;s5w+=z_7;var l$C=p9M;l$C+=j_C;l$C+=p9M;var o7S=p9M;o7S+=N$xh7[194026];o7S+=g66;o7S+=Q3b;fn(dataPoint[props[Y5g]] === undefined?dataPoint[props[o7S]]:dataPoint[props[Y5g]],dataPoint[props[l$C]],i,dataPoint[s5w]);}else {fn(dataPoint,dataPoint,i);}}}else {i=w7J;$[A1F](data,function(key,val){fn(val,key,i);i3m.o$_();i++;});}}function upload$1(editor,conf,files,progressCallback,completeCallback){var t3V="itLe";var T9u="sDataURL";var W$c="aj";var e3q="ing file</i>";var n06="<i>Upload";var b$i="nam";var e56="ileRea";var E3P="_limitLeft";var K1o="onload";var I3E="dText";var x5H="_lim";var t6Z="readA";var L5P='A server error occurred while uploading the file';var F8P=t6Z;F8P+=T9u;var u6X=x5H;u6X+=t3V;u6X+=C$N;var h8G=n06;h8G+=e3q;var j9D=N$xh7.s6X;j9D+=e56;j9D+=I3E;var Z3d=T64;Z3d+=M1o;Z3d+=T0X;var Y1G=W$c;Y1G+=N$xh7[194026];Y1G+=t6B;var G7C=b$i;G7C+=N$xh7.Z2m;var reader=new FileReader();var counter=w7J;var ids=[];var generalError=L5P;editor[U0X](conf[G7C],J3K);if(typeof conf[Y1G] === Z3d){var K3h=N$xh7[194026];K3h+=N$xh7.r$A;K3h+=N$xh7[194026];K3h+=t6B;conf[K3h](files,function(idsIn){var n1M=I1q;n1M+=p9M;completeCallback[n1M](editor,idsIn);});return;}progressCallback(conf,conf[j9D] || h8G);reader[K1o]=function(e){var H1c="object. Please use i";var o_D="uploa";var z7_="ajaxData";var p_k="t as a function instead.";var Y7h="jax";var I_6='uploadField';var n1N="Upload feature cannot use `ajax.data` with an ";var M99="load";var i_5='No Ajax option specified for upload plug-in';var N8M="preU";var r9M="pload";var Z3q=N8M;Z3q+=r9M;var h6i=N$xh7[562024];h6i+=N$xh7[194026];h6i+=Y_M;h6i+=N$xh7[194026];var N$V=N$xh7[194026];N$V+=N$xh7.r$A;N$V+=N$xh7[194026];N$V+=t6B;var Y8j=M_x;Y8j+=N70;Y8j+=Y_M;var I1M=N$xh7[194026];I1M+=Y7h;var o9A=H8I;o9A+=K8U;o9A+=M99;var k1P=t7n;k1P+=a$k;var K5g=N$xh7.G7l;K5g+=N$xh7[194026];K5g+=y7o;var X8e=H8I;X8e+=a87;X8e+=D7J;X8e+=m3D;var data=new FormData();i3m.o$_();var ajax;data[a07](F0t,X8e);data[a07](I_6,conf[K5g]);data[k1P](o9A,files[counter]);if(conf[z7_]){conf[z7_](data,files[counter],counter);}if(conf[I1M]){ajax=conf[I5F];}else if($[Y8j](editor[X5U][I5F])){var l5n=N$xh7[194026];l5n+=N$xh7.r$A;l5n+=f8E;var p3H=H8I;p3H+=r9M;var H5I=o_D;H5I+=N$xh7[562024];var K8_=N$xh7[194026];K8_+=y4g;K8_+=t6B;ajax=editor[X5U][K8_][H5I]?editor[X5U][I5F][p3H]:editor[X5U][l5n];}else if(typeof editor[X5U][N$V] === F4D){ajax=editor[X5U][I5F];}if(!ajax){throw new Error(i_5);}if(typeof ajax === F4D){ajax={url:ajax};}if(typeof ajax[u_k] === N$xh7[35143]){var t6n=N$xh7.Z2m;t6n+=L29;var O9_=X5U;O9_+=h9F;var T3c=N$xh7[562024];T3c+=d3Q;T3c+=N$xh7[194026];var d={};var ret=ajax[T3c](d);if(ret !== undefined && typeof ret !== O9_){d=ret;}$[t6n](d,function(key,value){i3m.o$_();data[a07](key,value);});}else if($[j4S](ajax[h6i])){var b5n=n1N;b5n+=H1c;b5n+=p_k;throw new Error(b5n);}editor[C3B](Z3q,[conf[y5V],files[counter],data],function(preRet){var s8H="readAsDataURL";var t8k='preSubmit.DTE_Upload';var M2y=t31;M2y+=X5U;M2y+=Y_M;var o5F=N$xh7.Z2m;o5F+=F1B;o5F+=a1G;o5F+=N$xh7[562024];i3m.L2C();var j3i=N$xh7[194026];j3i+=N$xh7.r$A;j3i+=N$xh7[194026];j3i+=t6B;if(preRet === E3Q){var k_S=p9M;k_S+=N$xh7.Z2m;k_S+=N$xh7.G7l;k_S+=y9w;if(counter < files[k_S] - c77){counter++;reader[s8H](files[counter]);}else {completeCallback[q8Y](editor,ids);}return;}var submit=E3Q;editor[h0w](t8k,function(){i3m.o$_();submit=D$_;return E3Q;});$[j3i]($[o5F]({},ajax,{contentType:E3Q,data:data,dataType:S8U,error:function(xhr){var u4r="rError";var W3w="ploadXh";var o7k=H8I;o7k+=W3w;o7k+=u4r;var n6G=w$1;n6G+=K7v;n6G+=a1G;n6G+=Y_M;var J4U=N$xh7.Z2m;J4U+=w90;J4U+=z_7;editor[J4U](conf[y5V],generalError);editor[n6G](o7k,[conf[y5V],xhr]);i3m.L2C();progressCallback(conf);},processData:E3Q,success:function(json){var e1q="AsDataURL";var W7m="it.DTE_U";var S$Z="ccess";var A6q="preS";var o$c="ubm";var Q7q="fieldErrors";var J8o="ors";var C_P="fieldErr";var U3l="eldError";var n7h="stat";var P85="uploadXh";var w5O="rSu";var M3L=b24;M3L+=N$xh7[562024];var h7o=h31;h7o+=W3v;h7o+=m3D;var Y5N=N$xh7.Z2m;Y5N+=z_7;Y5N+=l9f;var b$N=t7Q;b$N+=s7p;var V74=C_P;V74+=J8o;var G2m=N$xh7.G7l;G2m+=N$xh7[194026];G2m+=N$xh7[419025];G2m+=N$xh7.Z2m;var M6L=P85;M6L+=w5O;M6L+=S$Z;var n4X=U_Y;n4X+=r_e;var o_0=A6q;o_0+=o$c;o_0+=W7m;o_0+=r9M;editor[K$m](o_0);editor[n4X](M6L,[conf[G2m],json]);if(json[V74] && json[Q7q][b$N]){var i6I=K2T;i6I+=U3l;i6I+=X5U;var errors=json[i6I];for(var i=w7J,ien=errors[b$C];i < ien;i++){var a_S=n7h;a_S+=X7L;var C8r=n8b;C8r+=D7J;C8r+=z_7;editor[C8r](errors[i][y5V],errors[i][a_S]);}}else if(json[Y5N]){var x$3=n8b;x$3+=G1H;var O4t=J3u;O4t+=z_7;editor[O4t](json[x$3]);}else if(!json[D8y] || !json[h7o][M3L]){editor[U0X](conf[y5V],generalError);}else {var b1h=p9M;b1h+=a1G;b1h+=y9w;var o5H=H8I;o5H+=K8U;o5H+=W3v;o5H+=m3D;var t34=U62;t34+=L0a;if(json[j$v]){var J5x=N$xh7.s6X;J5x+=b24;J5x+=p9M;J5x+=e9T;var c$z=N$xh7.Z2m;c$z+=N$xh7[194026];c$z+=z6R;$[c$z](json[J5x],function(table,filesIn){var I7$="ile";var P1M=g_d;P1M+=n74;P1M+=N$xh7[562024];var L3l=N$xh7.s6X;L3l+=I7$;L3l+=X5U;if(!Editor[L3l][table]){Editor[j$v][table]={};}$[P1M](Editor[j$v][table],filesIn);});}ids[t34](json[o5H][Z33]);if(counter < files[b1h] - c77){var z7S=R1t;z7S+=e1q;counter++;reader[z7S](files[counter]);}else {var v0G=M1o;v0G+=N$xh7[194026];v0G+=p9M;v0G+=p9M;completeCallback[v0G](editor,ids);if(submit){editor[i6q]();}}}progressCallback(conf);},type:M2y,xhr:function(){var b_H="onprogress";var U9_="loa";var J$8="onloadend";var k0J="ajaxS";var J34=t6B;J34+=s7p;J34+=z_7;var K8N=k0J;K8N+=r5m;var xhr=$[K8N][J34]();if(xhr[D8y]){var C7Y=H8I;C7Y+=K8U;C7Y+=M99;var l_D=h31;l_D+=U9_;l_D+=N$xh7[562024];xhr[l_D][b_H]=function(){var P0w="loaded";var W3Q=100;var G6c="total";var d7I="toFix";var C9m="gthComputable";var b2v=':';var f51='%';i3m.L2C();var b1N=N8N;b1N+=C9m;if(e[b1N]){var n3o=p9M;n3o+=X9O;n3o+=Y_M;n3o+=s7p;var d2h=d7I;d2h+=Y6c;var percent=(e[P0w] / e[G6c] * W3Q)[d2h](w7J) + f51;progressCallback(conf,files[n3o] === c77?percent:counter + b2v + files[b$C] + u2y + percent);}};xhr[C7Y][J$8]=function(){var K2v="Pro";var u0w="processingText";var C_O=K2v;C_O+=X4Y;progressCallback(conf,conf[u0w] || C_O);};}return xhr;}}));});};files=$[H8R](files,function(val){return val;});if(conf[u6X] !== undefined){var Q_2=Y7q;Q_2+=N8u;files[F0A](conf[E3P],files[Q_2]);}reader[F8P](files[w7J]);}var DataTable$4=$[S_R][b29];var _inlineCounter=w7J;function _actionClass(){var q9n="removeCl";var z_J=M1o;z_J+=q2h;z_J+=d3Q;z_J+=N$xh7.Z2m;var n6M=q9n;n6M+=X8B;var Q5Y=m9m;Q5Y+=K8U;Q5Y+=K8U;Q5Y+=C9P;var h0_=N$xh7[194026];h0_+=M1o;h0_+=Y_M;h0_+=a1u;var e02=W91;e02+=A3E;var classesActions=this[e02][h0_];var action=this[X5U][a64];var wrapper=$(this[x0b][Q5Y]);wrapper[n6M]([classesActions[g36],classesActions[m2i],classesActions[z18]][Q_E](u2y));if(action === z_J){wrapper[L2m](classesActions[g36]);}else if(action === Z1L){var T2x=N$xh7.Z2m;T2x+=N$xh7[562024];T2x+=b24;T2x+=Y_M;wrapper[L2m](classesActions[T2x]);}else if(action === k2r){var E8H=B0X;E8H+=A72;wrapper[L2m](classesActions[E8H]);}}function _ajax(data,success,error,submitParams){var g9c="am";var q_k="plete";var O0G='?';var Z62="eleteBody";var o9Q="cti";var U7I="indexO";var q8m="unshi";var S5g="replacements";var H2n="ST";var N0a='DELETE';var v1s="url";var J5m=/_id_/;var m$s="omp";var b7h="complete";var G2w=/{id}/;var J_T="deleteBody";var Q$g='idSrc';var S3t="lacem";var w0V=N$xh7[194026];w0V+=N$xh7.r$A;w0V+=N$xh7[194026];w0V+=t6B;var O6i=N$xh7[562024];O6i+=Z62;var R32=c8S;R32+=N$xh7.Z2m;var d0j=N$xh7[562024];d0j+=N$xh7[194026];d0j+=Y_M;d0j+=N$xh7[194026];var S5y=N$xh7[562024];S5y+=W9z;var B5R=a8H;i3m.o$_();B5R+=d$j;B5R+=N$xh7.G7l;var n1E=Y6c;n1E+=b24;n1E+=Y_M;var A7b=p22;A7b+=H2n;var h5a=N$xh7.r$A;h5a+=X5U;h5a+=D7J;h5a+=N$xh7.G7l;var l11=N$xh7[194026];l11+=o9Q;l11+=h0w;var action=this[X5U][l11];var thrown;var opts={complete:[function(xhr,text){var B2x="response";var v3Q="Text";var r4k="responseJSON";var R0F="seJSON";var g7t="respo";var i28="nseTe";var D2O="tu";var y1I=204;var M2s="respon";i3m.L2C();var N2N=400;var d1U=N$xh7.G7l;d1U+=C51;d1U+=p9M;var G84=B2x;G84+=v3Q;var n0r=m79;n0r+=N$xh7[194026];n0r+=D2O;n0r+=X5U;var json=L_a;if(xhr[n0r] === y1I || xhr[G84] === d1U){json={};}else {try{var u6s=g7t;u6s+=i28;u6s+=F1B;var t3W=z21;t3W+=z_7;t3W+=l6q;var G8L=M2s;G8L+=R0F;json=xhr[r4k]?xhr[G8L]:JSON[t3W](xhr[u6s]);}catch(e){}}if($[j4S](json) || Array[U1F](json)){success(json,xhr[M83] >= N2N,xhr);}else {error(xhr,text,thrown);}}],data:L_a,dataType:h5a,error:[function(xhr,text,err){thrown=err;}],success:[],type:A7b};var a;var ajaxSrc=this[X5U][I5F];var id=action === n1E || action === k2r?pluck(this[X5U][X5X],Q$g)[Q_E](n47):L_a;if($[j4S](ajaxSrc) && ajaxSrc[action]){ajaxSrc=ajaxSrc[action];}if(typeof ajaxSrc === B5R){ajaxSrc[q8Y](this,L_a,L_a,data,success,error);return;}else if(typeof ajaxSrc === F4D){if(ajaxSrc[b6o](u2y) !== -c77){var Q1l=Y_M;Q1l+=x6K;Q1l+=K8U;Q1l+=N$xh7.Z2m;a=ajaxSrc[U9H](u2y);opts[Q1l]=a[w7J];opts[v1s]=a[c77];}else {opts[v1s]=ajaxSrc;}}else {var E0M=M1o;E0M+=m$s;E0M+=x38;E0M+=M3d;var optsCopy=$[Q1k]({},ajaxSrc || ({}));if(optsCopy[E0M]){var V0g=A8T;V0g+=N$xh7[419025];V0g+=q_k;var d_r=q8m;d_r+=C$N;opts[b7h][d_r](optsCopy[b7h]);delete optsCopy[V0g];}if(optsCopy[U0X]){var t2s=N$xh7.Z2m;t2s+=x2e;t2s+=D7J;t2s+=z_7;var f15=q8m;f15+=C$N;opts[U0X][f15](optsCopy[t2s]);delete optsCopy[U0X];}opts=$[Q1k]({},opts,optsCopy);}if(opts[S5g]){var S0X=G6V;S0X+=S3t;S0X+=r_e;S0X+=X5U;$[A1F](opts[S0X],function(key,repl){var x$O="plac";var p2G='}';var k3T='{';var E$G=M1o;E$G+=x83;i3m.L2C();E$G+=p9M;var p9E=q2h;p9E+=x$O;p9E+=N$xh7.Z2m;opts[v1s]=opts[v1s][p9E](k3T + key + p2G,repl[E$G](this,key,id,action,data));});}opts[v1s]=opts[v1s][e$P](J5m,id)[e$P](G2w,id);if(opts[S5y]){var x49=N$xh7.s6X;x49+=A$U;x49+=c8F;var R$1=N$xh7[562024];R$1+=N$xh7[194026];R$1+=F0W;var isFn=typeof opts[R$1] === x49;var newData=isFn?opts[u_k](data):opts[u_k];data=isFn && newData?newData:$[Q1k](D$_,data,newData);}opts[d0j]=data;if(opts[R32] === N0a && (opts[J_T] === undefined || opts[O6i] === D$_)){var j$z=N$xh7[562024];j$z+=N$xh7[194026];j$z+=F0W;var x4D=U7I;x4D+=N$xh7.s6X;var D0u=M8e;D0u+=p9M;var I53=H8I;I53+=z_7;I53+=p9M;var Q7k=z21;Q7k+=z_7;Q7k+=g9c;var params=$[Q7k](opts[u_k]);opts[I53]+=opts[D0u][x4D](O0G) === -c77?O0G + params:o3I + params;delete opts[j$z];}$[w0V](opts);}function _animate(target,style,time,callback){i3m.L2C();var y$7="mate";var m_w="ni";var G6i=N$xh7[194026];G6i+=m_w;G6i+=y$7;if($[S_R][G6i]){var O9A=N$xh7[194026];O9A+=d75;target[S$7]()[O9A](style,time,callback);}else {target[Y8J](style);if(typeof time === N$xh7[35143]){time[q8Y](target);}else if(callback){var e4f=I1q;e4f+=p9M;callback[e4f](target);}}}function _assembleMain(){var i$X="foo";var u8g="ormIn";var Y8B=o2K;Y8B+=z_7;Y8B+=N$xh7[419025];var c3M=N$xh7[194026];c3M+=C96;c3M+=a1G;c3M+=N$xh7[562024];var q5y=N$xh7.s6X;q5y+=u8g;q5y+=o2K;var D8S=N$xh7[194026];D8S+=C4S;D8S+=N$xh7.G7l;D8S+=N$xh7[562024];var w8P=o9_;w8P+=k3z;w8P+=N$xh7.G7l;w8P+=N$xh7[562024];var X5T=i$X;X5T+=a0G;var a09=V7g;a09+=N$xh7[562024];var e1t=m9m;e1t+=C96;e1t+=C9P;var dom=this[x0b];$(dom[e1t])[a09](dom[v4f]);$(dom[X5T])[w8P](dom[s6q])[a07](dom[e2Y]);$(dom[n48])[D8S](dom[q5y])[c3M](dom[Y8B]);}function _blur(){var y9P="nBlu";var b96='preBlur';var d7p="ubmi";var J7r=M1o;J7r+=p9M;J7r+=r1b;var d25=N$xh7.s6X;d25+=U2_;d25+=d$j;d25+=N$xh7.G7l;var z4U=D7J;z4U+=y9P;z4U+=z_7;var g8u=Y6c;g8u+=b24;g8u+=P1k;g8u+=W9X;var opts=this[X5U][g8u];var onBlur=opts[z4U];if(this[C3B](b96) === E3Q){return;}if(typeof onBlur === d25){onBlur(this);}else if(onBlur === C6c){var X_D=X5U;X_D+=d7p;X_D+=Y_M;this[X_D]();}else if(onBlur === J7r){this[T7u]();}}function _clearDynamicInfo(errorsOnly){i3m.o$_();var b50="ag";var U0f=n8b;U0f+=G1H;var f9I=N$xh7.Z2m;f9I+=L29;var O$6=E1m;O$6+=o9_;O$6+=k3z;O$6+=z_7;var L_0=K2T;L_0+=V$P;var C3r=N$xh7.Z2m;C3r+=z_7;C3r+=z_7;C3r+=G1H;if(errorsOnly === void w7J){errorsOnly=E3Q;}if(!this[X5U]){return;}var errorClass=this[S6t][j97][C3r];var fields=this[X5U][L_0];$(K4m + errorClass,this[x0b][O$6])[C3Q](errorClass);$[f9I](fields,function(name,field){var Q7A=n8b;Q7A+=G1H;field[Q7A](J3K);if(!errorsOnly){field[N64](J3K);}});this[U0f](J3K);if(!errorsOnly){var Z97=r7I;Z97+=X5U;Z97+=b50;Z97+=N$xh7.Z2m;this[Z97](J3K);}}function _close(submitComplete,mode){var P$x='preClose';var h4T="sed";var i5k="-focus";var v4G="layed";i3m.L2C();var L$z="loseC";var F_Q=M$B;F_Q+=v4G;var P8d=p5c;P8d+=d_y;P8d+=y96;P8d+=i5k;var closed;if(this[C3B](P$x) === E3Q){return;}if(this[X5U][X4H]){var o_o=M1o;o_o+=L$z;o_o+=g66;var O89=R3J;O89+=X5U;O89+=l$Z;O89+=g66;closed=this[X5U][O89](submitComplete,mode);this[X5U][o_o]=L_a;}if(this[X5U][N4H]){var q0n=R5m;q0n+=i8S;this[X5U][q0n]();this[X5U][N4H]=L_a;}$(Q14)[K$m](P8d);this[X5U][F_Q]=E3Q;this[C3B](t4I);if(closed){var E_l=e$V;E_l+=D7J;E_l+=h4T;this[C3B](E_l,[closed]);}}function _closeReg(fn){this[X5U][X4H]=fn;}function _crudArgs(arg1,arg2,arg3,arg4){var M1t="main";var l2$="oolean";var d_7=g66;d_7+=l2$;var that=this;var title;var buttons;var show;var opts;if($[j4S](arg1)){opts=arg1;}else if(typeof arg1 === d_7){show=arg1;opts=arg2;;}else {title=arg1;buttons=arg2;show=arg3;opts=arg4;;}if(show === undefined){show=D$_;}if(title){that[R7J](title);}if(buttons){var Z2h=l5H;Z2h+=V1S;Z2h+=X5U;that[Z2h](buttons);}return {maybeOpen:function(){if(show){var d$G=D7J;d$G+=k3z;d$G+=N$xh7.G7l;that[d$G]();}},opts:$[Q1k]({},this[X5U][E6Q][M1t],opts)};}function _dataSource(name){var W4l="Tabl";var b$o=N$xh7[562024];b$o+=W9z;b$o+=W4l;b$o+=N$xh7.Z2m;var Q4o=p9M;Q4o+=N$xh7.Z2m;Q4o+=k39;Q4o+=s7p;var args=[];for(var _i=c77;_i < arguments[Q4o];_i++){args[_i - c77]=arguments[_i];}var dataSource=this[X5U][O7b]?Editor[x4e][b$o]:Editor[x4e][U1f];var fn=dataSource[name];if(fn){var j9U=o9_;j9U+=a87;j9U+=x6K;return fn[j9U](this,args);}}function _displayReorder(includeFields){var y8p="includeFields";var p2c="mai";var F8J="playOrde";var O9h="endTo";var C_n="incl";var t0O="rmCo";var n$T="udeFields";var P_T=X8z;P_T+=c8F;var t7D=T2A;t7D+=i1o;t7D+=x6K;t7D+=Y6c;var F_y=k5t;F_y+=F8J;F_y+=z_7;var i52=p2c;i52+=N$xh7.G7l;var z76=N$xh7.Z2m;z76+=N$xh7[194026];z76+=M1o;z76+=s7p;var V$h=v$T;V$h+=R3R;var m$Q=o2K;m$Q+=t0O;m$Q+=m28;m$Q+=r_e;var _this=this;var formContent=$(this[x0b][m$Q]);var fields=this[X5U][G7e];var order=this[X5U][c_u];var template=this[X5U][K1w];var mode=this[X5U][m3l] || J7T;if(includeFields){this[X5U][y8p]=includeFields;}else {var C3K=C_n;C3K+=n$T;includeFields=this[X5U][C3K];}formContent[l7P]()[V$h]();$[z76](order,function(i,name){var E1C="ate=\"";var q$E="_weakIn";var m82="or-f";var A_w="after";i3m.L2C();var l6f="tor-templ";var G2r="ield[name=\"";var S9n=q$E;S9n+=k$l;S9n+=R$0;if(_this[S9n](name,includeFields) !== -c77){var p5W=N$xh7[419025];p5W+=N$xh7[194026];p5W+=b24;p5W+=N$xh7.G7l;if(template && mode === p5W){var U5i=N$xh7[194026];U5i+=K8U;U5i+=k2P;U5i+=N$xh7[562024];var R3T=e69;R3T+=z$V;var r4z=p8i;r4z+=l6f;r4z+=E1C;var H$l=N$xh7.G7l;H$l+=D7J;H$l+=v$T;var Z_C=m2i;Z_C+=m82;Z_C+=G2r;var Z5V=N$xh7.s6X;Z5V+=b24;Z5V+=N$xh7.G7l;Z5V+=N$xh7[562024];template[Z5V](Z_C + name + K2M)[A_w](fields[name][H$l]());template[t_f](r4z + name + R3T)[U5i](fields[name][j5k]());}else {var c2_=t7n;c2_+=N$xh7.Z2m;c2_+=S5V;formContent[c2_](fields[name][j5k]());}}});if(template && mode === i52){var l8n=t7n;l8n+=O9h;template[l8n](formContent);}this[C3B](F_y,[this[X5U][t7D],this[X5U][P_T],formContent]);}function _edit(items,editFields,type,formOptions,setupDone){var z0i='initEdit';var C7j="_di";var A4u="eorder";var V3T="toString";var R8F="splayR";var l48=w$1;l48+=N$xh7.Z2m;l48+=b9o;l48+=Y_M;var b5J=C7j;b5J+=R8F;b5J+=A4u;i3m.o$_();var U9C=p9M;U9C+=a1G;U9C+=y9w;var f_e=N$xh7[419025];f_e+=Q6J;var k8S=g66;k8S+=p9M;k8S+=D7J;k8S+=j0w;var G__=T2A;G__+=x95;var K5Z=m79;K5Z+=x6K;K5Z+=x38;var T44=a9A;T44+=N$xh7[419025];var k9J=N$xh7.Z2m;k9J+=T2A;k9J+=Y_M;var b6j=N$xh7[194026];b6j+=a97;b6j+=c8F;var r2f=N$xh7.Z2m;r2f+=g4Z;r2f+=N$xh7.Z2m;r2f+=R$c;var T8o=j97;T8o+=X5U;var _this=this;var fields=this[X5U][T8o];var usedFields=[];var includeInOrder;var editData={};this[X5U][r2f]=editFields;this[X5U][j8S]=editData;this[X5U][L6i]=items;this[X5U][b6j]=k9J;this[x0b][T44][K5Z][G__]=k8S;this[X5U][f_e]=type;this[t2C]();$[A1F](fields,function(name,field){var c1f="ultiRes";var s8b=p9M;s8b+=J$H;var y4x=u3q;y4x+=z6R;var O6E=N$xh7[419025];O6E+=c1f;O6E+=v1p;field[O6E]();includeInOrder=E3Q;editData[name]={};$[y4x](editFields,function(idSrc,edit){var O6T="isplayF";var c6I="romData";var b_g="tiSet";var f8e="yF";var c_T="displayFi";var L3f="scope";if(edit[G7e][name]){var G2a=X5U;G2a+=o$N;G2a+=p39;var L77=m8l;L77+=x6K;var M2v=N$xh7[562024];M2v+=N$xh7[194026];M2v+=Y_M;M2v+=N$xh7[194026];var F9O=o05;F9O+=p9M;F9O+=b0C;F9O+=c6I;var val=field[F9O](edit[M2v]);var nullDefault=field[p$i]();editData[name][idSrc]=val === L_a?J3K:Array[L77](val)?val[G2a]():val;if(!formOptions || formOptions[L3f] === p$G){var K68=c_T;K68+=J9A;K68+=X5U;var J$e=N$xh7[562024];J$e+=N$xh7.Z2m;J$e+=N$xh7.s6X;field[o3P](idSrc,val === undefined || nullDefault && val === L_a?field[J$e]():val,E3Q);if(!edit[A2J] || edit[K68][name]){includeInOrder=D$_;}}else {var p6P=k5q;p6P+=f8e;p6P+=B4O;var z46=N$xh7[562024];z46+=O6T;z46+=b24;z46+=V$P;if(!edit[z46] || edit[p6P][name]){var P0M=N$xh7[419025];P0M+=C51;P0M+=b_g;field[P0M](idSrc,val === undefined || nullDefault && val === L_a?field[W9U]():val,E3Q);includeInOrder=D$_;}}}});field[n_s]();if(field[a2T]()[s8b] !== w7J && includeInOrder){var n0b=K8U;n0b+=H8I;n0b+=L0a;usedFields[n0b](name);}});var currOrder=this[c_u]()[N13]();for(var i=currOrder[U9C] - c77;i >= w7J;i--){var M4o=Z9F;M4o+=p6h;if($[M4o](currOrder[i][V3T](),usedFields) === -c77){currOrder[F0A](i,c77);}}this[b5J](currOrder);this[l48](z0i,[pluck(editFields,h9G)[w7J],pluck(editFields,D62)[w7J],items,type],function(){var s2t="ultiEdit";i3m.o$_();var i7c="M";var Y2C=Y2_;Y2C+=Y_M;Y2C+=i7c;Y2C+=s2t;_this[C3B](Y2C,[editFields,items,type],function(){setupDone();});});}function _event(trigger,args,promiseComplete){var Q7J="result";var d0i="triggerHand";var t5R="ob";var x1i="Cance";var K0Q="Event";var m07="Ev";var D_N=b24;D_N+=p6E;D_N+=N32;if(args === void w7J){args=[];}if(promiseComplete === void w7J){promiseComplete=undefined;}if(Array[D_N](trigger)){var q5G=t7Q;q5G+=s7p;for(var i=w7J,ien=trigger[q5G];i < ien;i++){this[C3B](trigger[i],args);}}else {var a4s=K8U;a4s+=z_7;a4s+=N$xh7.Z2m;var N8J=d0i;N8J+=U3S;var e=$[K0Q](trigger);$(this)[N8J](e,args);var result=e[Q7J];if(trigger[b6o](a4s) === w7J && result === E3Q){var V27=x1i;V27+=p9M;V27+=x38;V27+=N$xh7[562024];var h1p=m07;h1p+=N$xh7.Z2m;h1p+=N$xh7.G7l;h1p+=Y_M;$(this)[R_N]($[h1p](trigger + V27),args);}if(promiseComplete){var C37=Y_M;C37+=s7p;C37+=a1G;var M$E=t5R;M$E+=N$xh7.r$A;M$E+=N$xh7.Z2m;M$E+=a97;if(result && typeof result === M$E && result[C37]){var D0T=N8u;D0T+=a1G;result[D0T](promiseComplete);}else {promiseComplete(result);}}return result;}}function _eventName(input){var Q3j=/^on([A-Z])/;var l0J="substring";var C0K=3;var m7d="toLowerCase";var f6b="tch";var c7m=N$xh7.r$A;c7m+=G0U;var name;var names=input[U9H](u2y);for(var i=w7J,ien=names[b$C];i < ien;i++){var K2P=R3r;K2P+=f6b;name=names[i];var onStyle=name[K2P](Q3j);if(onStyle){name=onStyle[c77][m7d]() + name[l0J](C0K);}names[i]=name;}return names[c7m](u2y);}function _fieldFromNode(node){var t1z=N$xh7.s6X;t1z+=Y$O;t1z+=E_o;var Y2U=u3q;Y2U+=M1o;Y2U+=s7p;var foundField=L_a;$[Y2U](this[X5U][t1z],function(name,field){var g_L=x38;g_L+=s8z;i3m.o$_();if($(field[j5k]())[t_f](node)[g_L]){foundField=field;}});i3m.o$_();return foundField;}function _fieldNames(fieldNames){var K5m=c1w;i3m.L2C();K5m+=V7k;if(fieldNames === undefined){var C$V=N$xh7.s6X;C$V+=L7T;C$V+=p9M;C$V+=E_o;return this[C$V]();}else if(!Array[K5m](fieldNames)){return [fieldNames];}return fieldNames;}function _focus(fieldsIn,focus){var h5k="emo";i3m.o$_();var m47=/^jq:/;var J3J="iv.DT";var x90="tFocu";var J$3="replac";var M41="nu";var i6F="Elem";var P$Y=l6q;P$Y+=x90;P$Y+=X5U;var U44=M41;U44+=N$xh7[419025];U44+=g66;U44+=C9P;var U43=z_7;U43+=h5k;U43+=q$X;var F0K=U$T;F0K+=h0w;var _this=this;if(this[X5U][F0K] === U43){return;}var field;var fields=$[H8R](fieldsIn,function(fieldOrName){var r_q=N$xh7.s6X;r_q+=b24;r_q+=N$xh7.Z2m;r_q+=R$c;return typeof fieldOrName === F4D?_this[X5U][r_q][fieldOrName]:fieldOrName;});if(typeof focus === U44){field=fields[focus];}else if(focus){var h6Y=N$xh7.r$A;h6Y+=q3F;h6Y+=d2b;if(focus[b6o](h6Y) === w7J){var A94=J$3;A94+=N$xh7.Z2m;var n2T=N$xh7[562024];n2T+=J3J;n2T+=J0$;n2T+=Y4v;field=$(n2T + focus[A94](m47,J3K));}else {var O2d=j97;O2d+=X5U;field=this[X5U][O2d][focus];}}else {var e4h=g66;e4h+=p9M;e4h+=M8e;var A4Q=m$U;A4Q+=N$xh7.Z2m;A4Q+=i6F;A4Q+=r_e;document[A4Q][e4h]();}this[X5U][P$Y]=field;if(field){field[p5c]();}}function _formOptions(opts){var D7u="mess";var v0b="funct";var x8x="sag";var w9C='boolean';var m6Z="key";var y1W="activeElem";var E4X="ssage";i3m.L2C();var T0D="dow";var k89="str";var H19='.dteInline';var D1U="tit";var Y21=R3J;Y21+=l6q;Y21+=i8S;var k5U=m6Z;k5U+=H8I;k5U+=K8U;var a3S=m6Z;a3S+=T0D;a3S+=N$xh7.G7l;var m$c=D7J;m$c+=N$xh7.G7l;var D8a=a8H;D8a+=T0X;var Y3_=N$xh7[419025];Y3_+=e9T;Y3_+=x8x;Y3_+=N$xh7.Z2m;var O$m=m79;O$m+=z_7;O$m+=V_5;var Z8Q=v0b;Z8Q+=c8F;var l2b=Y_M;l2b+=b24;l2b+=q3I;l2b+=N$xh7.Z2m;var G94=k89;G94+=V_5;var W6L=V3K;W6L+=Y_M;W6L+=p9M;W6L+=N$xh7.Z2m;var _this=this;var that=this;var inlineCount=_inlineCounter++;var namespace=H19 + inlineCount;this[X5U][l8j]=opts;this[X5U][C95]=inlineCount;if(typeof opts[W6L] === G94 || typeof opts[l2b] === Z8Q){var B32=V3K;B32+=Y_M;B32+=p9M;B32+=N$xh7.Z2m;var w0Y=D1U;w0Y+=x38;this[w0Y](opts[R7J]);opts[B32]=D$_;}if(typeof opts[N64] === O$m || typeof opts[Y3_] === D8a){var m3U=D7u;m3U+=N$xh7[194026];m3U+=U42;m3U+=N$xh7.Z2m;var t7E=N$xh7[419025];t7E+=N$xh7.Z2m;t7E+=E4X;this[t7E](opts[N64]);opts[m3U]=D$_;}if(typeof opts[e2Y] !== w9C){var u4P=g66;u4P+=A1t;u4P+=h0w;u4P+=X5U;this[u4P](opts[e2Y]);opts[e2Y]=D$_;}$(document)[m$c](a3S + namespace,function(e){var r_B="ventDefa";var T3r="canReturnSubmit";var O1E="nct";var g63="canReturnS";var j4y="_fieldF";var Y9I="romNode";var E0G=j0P;E0G+=Y6c;if(e[W6V] === z7A && _this[X5U][E0G]){var h0j=y1W;h0j+=r_e;var el=$(document[h0j]);if(el){var P6P=g63;P6P+=J78;P6P+=o8d;var u1N=N$xh7.s6X;u1N+=H8I;u1N+=O1E;u1N+=c8F;var E09=j4y;E09+=Y9I;var field=_this[E09](el);if(field && typeof field[T3r] === u1N && field[P6P](el)){var a5R=d_X;a5R+=r_B;a5R+=V5J;e[a5R]();}}}});$(document)[h0w](k5U + namespace,function(e){var w1x="sc";var O4G="DTE_Fo";var v5z=39;var g5J="ye";var d6L="canReturn";var u$k="foc";var k5x='button';var R48="turnSubm";var C$3="ventDefaul";var a_E=27;var g4E="onReturn";var e_M=37;var O32="eventDefault";var T3J="onEs";var n7F="onEsc";var N4o="prev";var n_t="onE";var C5d="ieldFromNode";var W21="nE";var T35="canRe";var d4M="rm_Buttons";var T4x=N8N;T4x+=y9w;var N0A=d_y;N0A+=O4G;N0A+=d4M;var W2A=M$B;W2A+=z0W;W2A+=g5J;W2A+=N$xh7[562024];var c_I=y1W;c_I+=r_e;var el=$(document[c_I]);if(e[W6V] === z7A && _this[X5U][W2A]){var w7W=d6L;w7W+=n$K;var C4d=T35;C4d+=R48;C4d+=b24;C4d+=Y_M;var P0n=v92;P0n+=C5d;var field=_this[P0n](el);if(field && typeof field[C4d] === N$xh7[35143] && field[w7W](el)){if(opts[g4E] === C6c){var S_M=X5U;S_M+=J78;S_M+=o8d;var A91=d_X;A91+=C$3;A91+=Y_M;e[A91]();_this[S_M]();}else if(typeof opts[g4E] === N$xh7[35143]){e[A6O]();opts[g4E](_this,e);}}}else if(e[W6V] === a_E){var K_n=O3s;K_n+=k6Q;var Y57=T3J;Y57+=M1o;var U4w=e$V;U4w+=D7J;U4w+=X5U;U4w+=N$xh7.Z2m;var o8x=D7J;o8x+=W21;o8x+=w1x;var h1z=g66;h1z+=p9M;h1z+=M8e;var L2Z=a8H;L2Z+=T0X;var v8_=M$w;v8_+=O32;e[v8_]();if(typeof opts[n7F] === L2Z){var a63=n_t;a63+=w1x;opts[a63](that,e);}else if(opts[n7F] === h1z){that[N3b]();}else if(opts[o8x] === U4w){that[R5m]();}else if(opts[Y57] === K_n){that[i6q]();}}else if(el[m5$](N0A)[T4x]){var F_A=W8i;F_A+=b24;F_A+=z6R;if(e[W6V] === e_M){var s$l=u$k;s$l+=H8I;s$l+=X5U;el[N4o](k5x)[n7R](s$l);}else if(e[F_A] === v5z){var i0x=N6r;i0x+=X5U;var j8u=N$xh7.G7l;j8u+=N$xh7.Z2m;j8u+=F1B;el[j8u](k5x)[n7R](i0x);}}});this[X5U][Y21]=function(){var X$U="down";var C50=m6Z;C50+=H8I;C50+=K8U;var L1v=F9f;L1v+=N$xh7.s6X;var Z6Q=m6Z;Z6Q+=X$U;$(document)[K$m](Z6Q + namespace);$(document)[L1v](C50 + namespace);};return namespace;}function _inline(editFields,opts,closeCb){var m30="_postope";var o4A='px"';var F6M="ren";var H0R="s=\"";var y$K="childNodes";var H2v='Edge/';var z5F="exOf";var l7R="umber";var H49="eg";var w7M="v class=\"DTE_Processing_Indicator\"><span></span></div>";var M9V="tml";var G0$="<div ";var G9t='style="width:';var K7w="submitTrigger";var x2F="use";var X67="k.dte-submit";var P_k='.';var l3o="conten";var p0x="tH";var H6h="closeR";var U6Q="inli";var h8m="_pre";var M6c="lasses";var o_p="Agent";var Y4R="las";var G$a="ey";var K69="idth";var f6s=m30;f6s+=N$xh7.G7l;var u2x=o2K;u2x+=M1o;u2x+=X7L;var T2R=w$1;T2R+=H6h;T2R+=H49;var o10=x38;o10+=N$xh7.G7l;o10+=i_e;o10+=s7p;var z2Y=U6Q;z2Y+=N$xh7.G7l;z2Y+=N$xh7.Z2m;var K3n=h8m;K3n+=D7J;K3n+=k3z;K3n+=N$xh7.G7l;var S4F=n8O;S4F+=s_R;S4F+=Y_M;S4F+=a1u;var c$5=Y7q;c$5+=Y_M;c$5+=s7p;var J5N=O0A;J5N+=G$a;J5N+=X5U;var C5B=B$I;C5B+=N$xh7.Z2m;var J9U=M1o;J9U+=M6c;var _this=this;if(closeCb === void w7J){closeCb=L_a;}var closed=E3Q;var classes=this[J9U][C5B];var keys=Object[J5N](editFields);var editRow=editFields[keys[w7J]];var children=L_a;var lastAttachPoint;var elements=[];for(var i=w7J;i < editRow[x08][c$5];i++){var name_1=editRow[r5H][i][w7J];elements[T7B]({field:this[X5U][G7e][name_1],name:name_1,node:$(editRow[x08][i])});}var namespace=this[S4F](opts);var ret=this[K3n](z2Y);if(!ret){return this;}for(var _i=w7J,elements_1=elements;_i < elements_1[o10];_i++){var O7M=N$xh7.s6X;O7M+=Y$O;O7M+=N$xh7[562024];var e5J=N$xh7[562024];e5J+=D7J;e5J+=N$xh7[419025];var H0I=N$xh7.G7l;H0I+=D7J;H0I+=v$T;var O8w=q2h;O8w+=K8U;O8w+=z0W;O8w+=p39;var C$$=p9M;C$$+=Z9F;C$$+=C9P;var l_3=H12;l_3+=V8m;var U1t=e69;U1t+=g7w;U1t+=w6K;var V7h=H12;V7h+=V8m;var d26=s82;d26+=w7M;var M79=e69;M79+=Y4v;var h6o=p9M;h6o+=b24;h6o+=N$xh7.G7l;h6o+=C9P;var J_W=G0$;J_W+=M1o;J_W+=Y4R;J_W+=H0R;var m7$=e69;m7$+=g7w;var k_x=E1m;k_x+=y44;var s_W=t7n;s_W+=a1G;s_W+=N$xh7[562024];var o$W=e36;o$W+=K69;var R$2=H3N;R$2+=z5F;var U7G=x2F;U7G+=z_7;U7G+=o_p;var d8u=v$T;d8u+=c6w;d8u+=s7p;var s7_=l3o;s7_+=Y_M;s7_+=X5U;var el=elements_1[_i];var node=el[j5k];el[l7P]=node[s7_]()[d8u]();var style=navigator[U7G][R$2](H2v) !== -c77?G9t + node[o$W]() + o4A:J3K;node[s_W]($(w6y + classes[k_x] + m7$ + J_W + classes[h6o] + M79 + style + h7e + d26 + V7h + w6y + classes[e2Y] + U1t + l_3));node[t_f](K4m + classes[C$$][O8w](/ /g,P_k))[a07](el[j97][H0I]())[a07](this[e5J][s6q]);lastAttachPoint=el[O7M][j5k]();if(opts[e2Y]){var P2j=N$xh7[562024];P2j+=D7J;P2j+=N$xh7[419025];var e0I=o9_;e0I+=K8U;e0I+=N$xh7.Z2m;e0I+=S5V;var F_x=G6V;F_x+=O5f;node[t_f](K4m + classes[e2Y][F_x](/ /g,P_k))[e0I](this[P2j][e2Y]);}}var submitTrigger=opts[K7w];if(submitTrigger !== L_a){var q8e=O3s;q8e+=b24;q8e+=p0x;q8e+=M9V;var i$B=N$xh7[194026];i$B+=C96;i$B+=a1G;i$B+=N$xh7[562024];var s1I=e$V;s1I+=j6d;s1I+=X67;var G2U=N$xh7[562024];G2U+=N$xh7.Z2m;G2U+=F0W;G2U+=z6R;var U1P=i_k;U1P+=M1o;U1P+=N$xh7.Z2m;var C4o=N$xh7.G7l;C4o+=l7R;if(typeof submitTrigger === C4o){var R8u=M1o;R8u+=q75;R8u+=F6M;var f7S=Y_M;f7S+=z_7;var X3J=J5R;X3J+=N3E;var kids=$(lastAttachPoint)[X3J](f7S)[R8u]();submitTrigger=submitTrigger < w7J?kids[kids[b$C] + submitTrigger]:kids[submitTrigger];}children=Array[U1C][U1P][q8Y]($(submitTrigger)[w7J][y$K]);$(children)[G2U]();$(submitTrigger)[h0w](s1I,function(e){i3m.o$_();e[g6P]();_this[i6q]();})[i$B](opts[q8e]);}this[T2R](function(submitComplete,action){var p$Y="orEa";var E22="click.dte-subm";var q6M="ppend";var B1x=N$xh7.Z2m;B1x+=o27;var c7Z=M1o;c7Z+=o$N;c7Z+=j0w;var c0r=D7J;c0r+=N$xh7.s6X;c0r+=N$xh7.s6X;closed=D$_;$(document)[c0r](c7Z + namespace);if(!submitComplete || action !== B1x){var l9W=N$xh7.s6X;l9W+=p$Y;l9W+=M1o;l9W+=s7p;elements[l9W](function(el){i3m.o$_();var Y1t="hil";var I87="contents";var z2x=M1o;z2x+=Y1t;z2x+=N$xh7[562024];z2x+=F6M;var o_N=N$xh7[194026];o_N+=K8U;o_N+=k2P;o_N+=N$xh7[562024];var E8b=w62;E8b+=v$T;var k9W=N$xh7.G7l;k9W+=Q6J;el[k9W][I87]()[W4S]();el[E8b][o_N](el[z2x]);});}if(submitTrigger){var u29=N$xh7[194026];u29+=q6M;var K2O=E22;K2O+=k6Q;$(submitTrigger)[K$m](K2O)[J7H]()[u29](children);}_this[j0I]();if(closeCb){closeCb();}return C9f;;});setTimeout(function(){var H0S="ick";var k09="dB";var j3l="eydow";var Y2m="usedow";var E11='andSelf';var K71=M1o;K71+=p9M;K71+=H0S;var y6_=D7J;y6_+=N$xh7.G7l;var E4W=O0A;E4W+=j3l;E4W+=N$xh7.G7l;var Y__=D7J;Y__+=N$xh7.G7l;var l9F=N$xh7[419025];l9F+=D7J;l9F+=Y2m;l9F+=N$xh7.G7l;var j4J=D7J;j4J+=N$xh7.G7l;var F4S=m3D;i3m.o$_();F4S+=k09;F4S+=N$xh7[194026];F4S+=j0w;if(closed){return;}var back=$[S_R][F4S]?l3p:E11;var target;$(document)[j4J](l9F + namespace,function(e){target=e[J$I];})[Y__](E4W + namespace,function(e){var W7M="targ";var q1c=W7M;q1c+=v1p;target=e[q1c];})[y6_](K71 + namespace,function(e){var R$A='owns';var I0p="_typeF";var f6L=t7Q;f6L+=s7p;var isIn=E3Q;for(var _i=w7J,elements_2=elements;_i < elements_2[f6L];_i++){var p$b=w62;p$b+=v$T;var x2i=b24;x2i+=N$xh7.G7l;x2i+=p6h;var b26=I0p;b26+=N$xh7.G7l;var el=elements_2[_i];if(el[j97][b26](R$A,target) || $[x2i](el[p$b][w7J],$(target)[m5$]()[back]()) !== -c77){isIn=D$_;}}if(!isIn){var s7e=g66;s7e+=p9M;s7e+=H8I;s7e+=z_7;_this[s7e]();}});},w7J);this[j0M]($[H8R](elements,function(el){i3m.L2C();return el[j97];}),opts[u2x]);this[f6s](C9f,D$_);}function _optionsUpdate(json){var that=this;i3m.o$_();if(json[n$$]){$[A1F](this[X5U][G7e],function(name,field){var C3_="pt";var t4U=D7J;t4U+=C3_;t4U+=b24;t4U+=M3S;i3m.o$_();if(json[t4U][name] !== undefined){var W_b=h31;W_b+=Y50;W_b+=M3d;var i0J=N$xh7.s6X;i0J+=Y$O;i0J+=N$xh7[562024];var fieldInst=that[i0J](name);if(fieldInst && fieldInst[W_b]){var o$S=d5J;o$S+=V3K;o$S+=h0w;o$S+=X5U;fieldInst[W5n](json[o$S][name]);}}});}}function _message(el,msg,title,fn){var u6a="removeAttr";var b2U="fadeIn";var u71="ani";var q0C="fadeOut";var s3z="playe";var Y1K="played";var X0X="ht";var h_H=T64;h_H+=a97;h_H+=O3R;h_H+=N$xh7.G7l;var a_k=u71;a_k+=R3r;a_k+=M3d;var canAnimate=$[S_R][a_k]?D$_:E3Q;if(title === undefined){title=E3Q;}if(!fn){fn=function(){};}if(typeof msg === h_H){var C8u=F0W;C8u+=g66;C8u+=p9M;C8u+=N$xh7.Z2m;msg=msg(this,new DataTable$4[J36](this[X5U][C8u]));}el=$(el);if(canAnimate){el[S$7]();}if(!msg){var N0f=k5t;N0f+=s3z;N0f+=N$xh7[562024];if(this[X5U][N0f] && canAnimate){el[q0C](function(){el[U1f](J3K);fn();});}else {el[U1f](J3K)[Y8J](I8T,D6F);fn();}if(title){el[u6a](g_Q);}}else {var N_0=T2A;N_0+=X5U;N_0+=Y1K;fn();if(this[X5U][N_0] && canAnimate){var l9X=X0X;l9X+=V0v;el[l9X](msg)[b2U]();}else {var Y8G=N$xh7[562024];Y8G+=C6Y;Y8G+=p9M;Y8G+=R$0;var r1m=e8B;r1m+=X5U;el[U1f](msg)[r1m](Y8G,Y26);}if(title){var L1C=Y_M;L1C+=b24;L1C+=q3I;L1C+=N$xh7.Z2m;el[M3P](L1C,msg);}}}function _multiInfo(){var F$l="foShown";var i$s="ltiEdi";var P19="multiI";var S9Q="isMu";var g16="includ";var Q4e=Y7q;Q4e+=N8u;var p3n=g16;p3n+=N$xh7.Z2m;p3n+=G14;p3n+=E_o;var F40=N$xh7.s6X;F40+=b24;F40+=V$P;var fields=this[X5U][F40];var include=this[X5U][p3n];var show=D$_;var state;if(!include){return;}for(var i=w7J,ien=include[Q4e];i < ien;i++){var s4i=P19;s4i+=N$xh7.G7l;s4i+=F$l;var n3l=S9Q;n3l+=j8Q;n3l+=n2t;n3l+=N$xh7.Z2m;var H2N=V6M;H2N+=i$s;H2N+=Y_w;H2N+=x38;var field=fields[include[i]];var multiEditable=field[H2N]();if(field[A56]() && multiEditable && show){state=D$_;show=E3Q;}else if(field[n3l]() && !multiEditable){state=D$_;}else {state=E3Q;}fields[include[i]][s4i](state);}}function _nestedClose(cb){var Y_6="displayCon";var M1z="troller";var n7I="callback";var g1f="open";var s$7=Y7q;s$7+=Y_M;i3m.o$_();s$7+=s7p;var disCtrl=this[X5U][B8m];var show=disCtrl[y_F];if(!show || !show[s$7]){if(cb){cb();}}else if(show[b$C] > c77){var L64=Y_6;L64+=M1z;var m_b=p9M;m_b+=N$xh7.Z2m;m_b+=N$xh7.G7l;m_b+=y9w;var M0E=K8U;M0E+=D7J;M0E+=K8U;show[M0E]();var last=show[show[m_b] - c77];if(cb){cb();}this[X5U][L64][g1f](last[O1K],last[a07],last[n7I]);}else {this[X5U][B8m][R5m](this,cb);show[b$C]=w7J;}}function _nestedOpen(cb,nest){var Z_o=m9m;Z_o+=K8U;Z_o+=Y6g;var L1B=D7J;L1B+=K8U;L1B+=a1G;var Q5I=E1m;Q5I+=o9_;Q5I+=k3z;Q5I+=z_7;var m5_=N$xh7[562024];m5_+=J3x;var C2F=U62;C2F+=L0a;var n9v=w$1;n9v+=X5U;n9v+=j8h;var H9i=d$M;H9i+=s7p;H9i+=D7J;H9i+=e36;var disCtrl=this[X5U][B8m];if(!disCtrl[H9i]){var j2$=d$M;j2$+=s7p;j2$+=j3G;disCtrl[j2$]=[];}if(!nest){disCtrl[y_F][b$C]=w7J;}disCtrl[n9v][C2F]({append:this[m5_][Q5I],callback:cb,dte:this});this[X5U][B8m][L1B](this,this[x0b][Z_o],cb);}function _postopen(type,immediate){var i9M="ubmit.";var O1l='focus.editor-focus';var J2e="mit.edit";var g3a='open';var e1I="ene";var h3j="rnal";var R_T="ureFocus";var R2N="iInfo";var G1j="capt";var Z3W="ain";var y7s="or-inte";var c$V="editor-internal";var d6w=w$1;d6w+=N$xh7.Z2m;d6w+=q$X;d6w+=m28;var y5J=i80;y5J+=R2N;var Z2Z=N$xh7[419025];Z2Z+=Z3W;var z6r=X5U;z6r+=i9M;z6r+=c$V;var F0R=f5v;F0R+=J2e;F0R+=y7s;F0R+=h3j;var a1J=F9f;a1J+=N$xh7.s6X;var F$E=N$xh7.s6X;F$E+=E6q;var s_d=N$xh7[562024];s_d+=D7J;s_d+=N$xh7[419025];var y3o=G1j;y3o+=R_T;var _this=this;var focusCapture=this[X5U][B8m][y3o];if(focusCapture === undefined){focusCapture=D$_;}$(this[s_d][F$E])[a1J](F0R)[h0w](z6r,function(e){var m6j="ntDefa";var l8v=d_X;l8v+=q$X;l8v+=m6j;l8v+=V5J;e[l8v]();});if(focusCapture && (type === Z2Z || type === F0X)){var N9$=f27;N9$+=N$xh7[562024];N9$+=x6K;$(N9$)[h0w](O1l,function(){var v_J="tFocus";var U$d="setFocus";i3m.L2C();var P9j="activeElement";var U3Z=d_y;U3Z+=B7G;U3Z+=C1m;U3Z+=x_W;var U29=p9M;U29+=a1G;U29+=i_e;U29+=s7p;var f52=d_y;f52+=B7G;f52+=P5i;if($(document[P9j])[m5$](f52)[U29] === w7J && $(document[P9j])[m5$](U3Z)[b$C] === w7J){if(_this[X5U][U$d]){var L4Q=X5U;L4Q+=N$xh7.Z2m;L4Q+=v_J;_this[X5U][L4Q][p5c]();}}});}this[y5J]();this[d6w](g3a,[type,this[X5U][a64]]);if(immediate){var u3l=N$xh7[194026];u3l+=a97;u3l+=O3R;u3l+=N$xh7.G7l;var w98=d5J;w98+=e1I;w98+=N$xh7[562024];this[C3B](w98,[type,this[X5U][u3l]]);}return D$_;}function _preopen(type){var M$4='cancelOpen';var a6C="lea";var B9m="_c";var n5y="amicInfo";var l2H="rDyn";var N2z=B9m;N2z+=a6C;N2z+=l2H;N2z+=n5y;var M$d=x3E;M$d+=Y_M;M$d+=O3R;M$d+=N$xh7.G7l;var w7i=K8U;w7i+=L3m;w7i+=N$xh7.Z2m;w7i+=N$xh7.G7l;if(this[C3B](w7i,[type,this[X5U][M$d]]) === E3Q){var y46=X4_;y46+=o36;y46+=x38;this[j0I]();this[C3B](M$4,[type,this[X5U][a64]]);if((this[X5U][m3l] === C9f || this[X5U][m3l] === y46) && this[X5U][N4H]){this[X5U][N4H]();}this[X5U][N4H]=L_a;return E3Q;}this[N2z](D$_);this[X5U][W_x]=type;return D$_;}function _processing(processing){var J85="ocessi";var p65="rocessi";var Q8K='div.DTE';var N9G="toggleCla";var x4Q=K8U;x4Q+=p65;x4Q+=h1I;var T53=N9G;T53+=m54;var P8u=m$U;P8u+=N$xh7.Z2m;var h_C=M$w;h_C+=J85;h_C+=h1I;var procClass=this[S6t][h_C][P8u];$([Q8K,this[x0b][e$H]])[T53](procClass,processing);this[X5U][l9B]=processing;this[C3B](x4Q,[processing]);}function _noProcessing(args){var a5_="processing-f";var v5m=K2T;v5m+=N$xh7.Z2m;v5m+=Y4z;v5m+=X5U;var G2G=X50;G2G+=s7p;var processing=E3Q;$[G2G](this[X5U][v5m],function(name,field){var x05="cessi";var E1T=I7o;E1T+=x05;E1T+=N$xh7.G7l;E1T+=U42;if(field[E1T]()){processing=D$_;}});if(processing){var C21=a5_;C21+=v7d;var V3D=D7J;V3D+=G6T;this[V3D](C21,function(){var J9a="_noP";var K06=J9a;K06+=z_7;K06+=D7J;K06+=X4Y;if(this[K06](args) === D$_){this[g$H][N9H](this,args);}});}return !processing;}function _submit(successCallback,errorCallback,formatdata,hide){var i55="nged";var Z9m="_noProces";var G$j="actio";var X6z="ll processing";var C2E="lete";var m0C="nComp";var M7d="fChanged";var q7P="onCo";var B2T="d is sti";var S8K="lI";var s6k="mplete";var A4w="ocessing";var P1m=16;var v2j="eSubmit";var f0r="nName";var n8E=K8U;n8E+=z_7;n8E+=v2j;var h7Y=w$1;h7Y+=N$xh7.Z2m;h7Y+=q$X;h7Y+=m28;var B5u=V$K;B5u+=J7D;B5u+=N$xh7.Z2m;var j11=N$xh7.Z2m;j11+=o27;var r$e=G$j;r$e+=f0r;var s0z=Z9m;s0z+=O2x;var k8s=C3o;k8s+=Y_M;k8s+=L_H;var _this=this;var changed=E3Q;var allData={};var changedData={};var setBuilder=dataSet;var fields=this[X5U][G7e];var editCount=this[X5U][C95];var editFields=this[X5U][k8s];var editData=this[X5U][j8S];var opts=this[X5U][l8j];var changedSubmit=opts[i6q];var submitParamsLocal;if(this[s0z](arguments) === E3Q){var H33=b0C;H33+=Y$O;H33+=B2T;H33+=X6z;Editor[U0X](H33,P1m,E3Q);return;}var action=this[X5U][a64];var submitParams={data:{}};submitParams[this[X5U][r$e]]=action;if(action === m38 || action === j11){var m7c=z6R;m7c+=N$xh7[194026];m7c+=i55;var w4S=x83;w4S+=S8K;w4S+=M7d;var j$7=N$xh7[194026];j$7+=p9M;j$7+=p9M;var I_H=M1o;I_H+=z_7;I_H+=d32;$[A1F](editFields,function(idSrc,edit){var h2_="EmptyObject";var k24=X$Z;k24+=h2_;var U1o=u3q;U1o+=z6R;var allRowData={};var changedRowData={};i3m.L2C();$[U1o](fields,function(name,field){var y6W="romDa";var c88=/\[.*$/;var w8m="-many-cou";var w58="Get";var Z4w="lF";var f3z="Of";var I_d="tabl";var V2J="ompa";var e8z=H9o;e8z+=Y_M;e8z+=I_d;e8z+=N$xh7.Z2m;i3m.L2C();if(edit[G7e][name] && field[e8z]()){var w23=M1o;w23+=V2J;w23+=q2h;var Q2o=w8m;Q2o+=m28;var g9V=S08;g9V+=z$V;var S4x=s6C;S4x+=f3z;var i2b=b24;i2b+=X5U;i2b+=k$l;i2b+=R$0;var e0T=J$T;e0T+=b24;e0T+=w58;var multiGet=field[e0T]();var builder=setBuilder(name);if(multiGet[idSrc] === undefined){var C_R=N$xh7[562024];C_R+=W9z;var i1S=o05;i1S+=Z4w;i1S+=y6W;i1S+=F0W;var originalVal=field[i1S](edit[C_R]);builder(allRowData,originalVal);return;}var value=multiGet[idSrc];var manyBuilder=Array[i2b](value) && typeof name === F4D && name[S4x](g9V) !== -c77?setBuilder(name[e$P](c88,J3K) + Q2o):L_a;builder(allRowData,value);if(manyBuilder){manyBuilder(allRowData,value[b$C]);}if(action === Z1L && (!editData[name] || !field[w23](value,editData[name][idSrc]))){builder(changedRowData,value);changed=D$_;if(manyBuilder){manyBuilder(changedRowData,value[b$C]);}}}});if(!$[k24](allRowData)){allData[idSrc]=allRowData;}if(!$[x8I](changedRowData)){changedData[idSrc]=changedRowData;}});if(action === I_H || changedSubmit === j$7 || changedSubmit === w4S && changed){submitParams[u_k]=allData;}else if(changedSubmit === m7c && changed){submitParams[u_k]=changedData;}else {var z48=w$1;z48+=M$w;z48+=A4w;var s_F=D7J;s_F+=m0C;s_F+=C2E;var f7j=J5R;f7j+=N$xh7.Z2m;var V0k=G$j;V0k+=N$xh7.G7l;this[X5U][V0k]=L_a;if(opts[b7N] === f7j && (hide === undefined || hide)){var P78=s1c;P78+=N$xh7.Z2m;this[P78](E3Q);}else if(typeof opts[s_F] === N$xh7[35143]){var i$d=q7P;i$d+=s6k;opts[i$d](this);}if(successCallback){var e88=M1o;e88+=x83;e88+=p9M;successCallback[e88](this);}this[z48](E3Q);this[C3B](O3u);return;}}else if(action === B5u){$[A1F](editFields,function(idSrc,edit){submitParams[u_k][idSrc]=edit[u_k];});}submitParamsLocal=$[Q1k](D$_,{},submitParams);if(formatdata){formatdata(submitParams);}this[h7Y](n8E,[submitParams,action],function(result){i3m.o$_();if(result === E3Q){_this[J0Q](E3Q);}else {var S0F=w$1;S0F+=I5F;var submitWire=_this[X5U][I5F]?_this[S0F]:_this[z_I];submitWire[q8Y](_this,submitParams,function(json,notGood,xhr){var Q6S="ubmitSucce";var v3o=N$xh7[194026];v3o+=p$I;var e4b=d$M;e4b+=Q6S;e4b+=m54;_this[e4b](json,notGood,submitParams,submitParamsLocal,_this[X5U][v3o],editCount,hide,successCallback,errorCallback,xhr);},function(xhr,err,thrown){var d1Y="_su";var U2a="bmitErr";var j3r=d1Y;j3r+=U2a;j3r+=G1H;_this[j3r](xhr,err,thrown,errorCallback,submitParams,_this[X5U][a64]);},submitParams);}});}function _submitTable(data,success,error,submitParams){var Y7n="indivi";var X2k="_dataSou";var N5U="fier";var T07=x3E;T07+=Y_M;T07+=O3R;T07+=N$xh7.G7l;var action=data[T07];var out={data:[]};var idGet=dataGet(this[X5U][Y5x]);var idSet=dataSet(this[X5U][Y5x]);i3m.L2C();if(action !== k2r){var a8n=Y50;a8n+=Y_M;a8n+=N$xh7[194026];var k5Q=y0m;k5Q+=T2A;k5Q+=N5U;var S3L=Y7n;S3L+=N$xh7[562024];S3L+=H8I;S3L+=x83;var g3A=X2k;g3A+=q0g;var S5k=y0m;S5k+=c9W;S5k+=C9P;var s$u=w$1;s$u+=N$xh7[562024];s$u+=m25;var s37=N$xh7[419025];s37+=N$xh7[194026];s37+=b24;s37+=N$xh7.G7l;var n1u=y0m;n1u+=N$xh7[562024];n1u+=N$xh7.Z2m;var originalData_1=this[X5U][n1u] === s37?this[s$u](C$J,this[S5k]()):this[g3A](S3L,this[k5Q]());$[A1F](data[a8n],function(key,vals){var o6d="ring";var o50="toSt";var k7s=Y8T;k7s+=d32;var toSave;var extender=extend;if(action === Z1L){var F5B=N$xh7[562024];F5B+=W9z;var rowData=originalData_1[key][F5B];toSave=extender({},rowData,D$_);toSave=extender(toSave,vals,D$_);}else {toSave=extender({},vals,D$_);}var overrideId=idGet(toSave);i3m.L2C();if(action === k7s && overrideId === undefined){var E$s=o50;E$s+=o6d;idSet(toSave,+new Date() + key[E$s]());}else {idSet(toSave,overrideId);}out[u_k][T7B](toSave);});}success(out);}function _submitSuccess(json,notGood,submitParams,submitParamsLocal,action,editCount,hide,successCallback,errorCallback,xhr){var v7q="reC";var C1k="reat";i3m.o$_();var F6t="tEdit";var b49="nction";var o3s="ieldEr";var w0O="vent";var S6y='prep';var C0u="omplet";var C8J='postSubmit';var w8N="ldError";var i6w="itC";var W$o='postRemove';var x1e='commit';var X7B='postCreate';var x4S="preE";var M2X="dErro";var K2o="_dataSo";var k34='preRemove';var v7J='submitUnsuccessful';var p6J="ifie";var m8Y="urce";var M3J="rs";var Y8p='submitSuccess';var s84='setData';var V_e="ataSou";var Z_X="ataSo";var c$w=O3s;c$w+=i6w;c$w+=C0u;c$w+=N$xh7.Z2m;var k_Y=x38;k_Y+=h1I;k_Y+=N8u;var b4i=N$xh7.s6X;b4i+=L7T;b4i+=w8N;b4i+=X5U;var m2F=n8b;m2F+=G1H;var A5s=N$xh7.s6X;A5s+=o3s;A5s+=r1X;A5s+=M3J;var J2o=N$xh7.Z2m;J2o+=z_7;J2o+=r1X;J2o+=z_7;var K4$=N$xh7[419025];K4$+=Q41;K4$+=p6J;K4$+=z_7;var _this=this;var that=this;var setData;var fields=this[X5U][G7e];var opts=this[X5U][l8j];var modifier=this[X5U][K4$];this[C3B](C8J,[json,submitParams,action,xhr]);if(!json[J2o]){json[U0X]=J3K;}if(!json[A5s]){var G7v=y7Q;G7v+=M2X;G7v+=M3J;json[G7v]=[];}if(notGood || json[m2F] || json[b4i][k_Y]){var X0D=o56;X0D+=g66;X0D+=z_7;X0D+=g7w;var p26=N$xh7.Z2m;p26+=z_7;p26+=r1X;p26+=z_7;var a8t=j97;a8t+=u_O;a8t+=M3J;var B3W=N$xh7.Z2m;B3W+=N$xh7[194026];B3W+=M1o;B3W+=s7p;var globalError_1=[];if(json[U0X]){globalError_1[T7B](json[U0X]);}$[B3W](json[a8t],function(i,err){var B33='Unknown field: ';var l2N="onFieldE";var s3R="onFieldError";var g9m="tatus";var h3P='Error';var D0B=': ';var s9V=M$B;s9V+=z0W;s9V+=x6K;s9V+=Y6c;var field=fields[err[y5V]];if(!field){throw new Error(B33 + err[y5V]);}else if(field[s9V]()){var r0u=X5U;r0u+=g9m;var i0U=C9P;i0U+=z_7;i0U+=D7J;i0U+=z_7;field[i0U](err[r0u] || h3P);if(i === w7J){var U8s=l2N;U8s+=w90;U8s+=z_7;if(opts[U8s] === e8n){var l65=Y_M;l65+=D7J;l65+=K8U;var c0_=N$xh7.G7l;c0_+=Q41;c0_+=N$xh7.Z2m;_this[t2X]($(_this[x0b][n48]),{scrollTop:$(field[c0_]())[l3U]()[l65]},k8b);field[p5c]();}else if(typeof opts[s3R] === N$xh7[35143]){opts[s3R](_this,err);}}}else {var d2I=J0$;d2I+=x2e;d2I+=D7J;d2I+=z_7;globalError_1[T7B](field[y5V]() + D0B + (err[M83] || d2I));}});this[p26](globalError_1[Q_E](X0D));this[C3B](v7J,[json]);if(errorCallback){errorCallback[q8Y](that,json);}}else {var u2K=w$1;u2K+=N$xh7.Z2m;u2K+=J7D;u2K+=r_e;var Z0a=N$xh7.Z2m;Z0a+=o27;var store={};if(json[u_k] && (action === m38 || action === Z0a)){var G8d=K8U;G8d+=z_7;G8d+=N$xh7.Z2m;G8d+=K8U;var E6F=K2o;E6F+=m8Y;this[E6F](G8d,action,modifier,submitParamsLocal,json,store);for(var _i=w7J,_a=json[u_k];_i < _a[b$C];_i++){var G9b=b24;G9b+=N$xh7[562024];var data=_a[_i];setData=data;var id=this[P30](G9b,data);this[C3B](s84,[json,data,action]);if(action === m38){var e$6=b5L;e$6+=M3d;var A1f=w$1;A1f+=N$xh7.Z2m;A1f+=w0O;var X5O=K8U;X5O+=v7q;X5O+=C1k;X5O+=N$xh7.Z2m;this[C3B](X5O,[json,data,id]);this[P30](m38,fields,data,store);this[A1f]([e$6,X7B],[json,data,id]);}else if(action === Z1L){var x6c=t31;x6c+=X5U;x6c+=F6t;var N60=Y6c;N60+=k6Q;var w_z=w$1;w_z+=K7v;w_z+=a1G;w_z+=Y_M;var X_a=N$xh7.Z2m;X_a+=N$xh7[562024];X_a+=b24;X_a+=Y_M;var M4s=x4S;M4s+=o27;this[C3B](M4s,[json,data,id]);this[P30](X_a,modifier,fields,data,store);this[w_z]([N60,x6c],[json,data,id]);}}this[P30](x1e,action,modifier,json[u_k],store);}else if(action === k2r){var T3n=N$xh7[562024];T3n+=N$xh7[194026];T3n+=Y_M;T3n+=N$xh7[194026];var j$V=q2h;j$V+=y0m;j$V+=q$X;var y3S=U_Y;y3S+=a1G;y3S+=Y_M;var g04=d7o;g04+=V_e;g04+=q0g;var f1I=b24;f1I+=N$xh7[562024];f1I+=X5U;var e1N=d7o;e1N+=Z_X;e1N+=M8e;e1N+=p39;this[e1N](S6y,action,modifier,submitParamsLocal,json,store);this[C3B](k34,[json,this[f1I]()]);this[g04](k2r,modifier,fields,store);this[y3S]([j$V,W$o],[json,this[F8v]()]);this[P30](x1e,action,modifier,json[T3n],store);}if(editCount === this[X5U][C95]){var D7k=O8C;D7k+=b49;var sAction=this[X5U][a64];this[X5U][a64]=L_a;if(opts[b7N] === t4I && (hide === undefined || hide)){var i70=N$xh7[562024];i70+=N$xh7[194026];i70+=Y_M;i70+=N$xh7[194026];var g5$=g7L;g5$+=r1b;this[g5$](json[i70]?D$_:E3Q,sAction);}else if(typeof opts[b7N] === D7k){opts[b7N](this);}}if(successCallback){successCallback[q8Y](that,json);}this[u2K](Y8p,[json,setData,action]);}this[J0Q](E3Q);this[C3B](c$w,[json,setData,action]);}function _submitError(xhr,err,thrown,errorCallback,submitParams,action){var N8k="system";var a01="itErro";var g$y="su";var o5p="bm";var D1y=g$y;D1y+=o5p;D1y+=a01;D1y+=z_7;var V08=w$1;V08+=N$xh7.Z2m;V08+=q$X;V08+=m28;var L85=b24;L85+=N$xh7[28411];L85+=v3I;L85+=N$xh7.G7l;var r5J=K8U;r5J+=u_G;r5J+=Y_M;r5J+=n$K;this[C3B](r5J,[L_a,submitParams,action,xhr]);this[U0X](this[L85][U0X][N8k]);this[J0Q](E3Q);if(errorCallback){var T1a=M1o;T1a+=x83;T1a+=p9M;errorCallback[T1a](this,xhr,err,thrown);}this[V08]([D1y,O3u],[xhr,err,thrown,submitParams]);}function _tidy(fn){var K0V="ubmitCompl";var x39="ServerSide";var s15=10;var d3C="ture";var T4j="Fea";var l1n=C6e;l1n+=R$0;var P6f=B$I;P6f+=N$xh7.Z2m;var w6R=y1U;w6R+=h1I;var N52=m7R;N52+=b24;var N0m=N$xh7.s6X;N0m+=N$xh7.G7l;var S9R=Y_M;S9R+=t8t;S9R+=p9M;S9R+=N$xh7.Z2m;var _this=this;var dt=this[X5U][S9R]?new $[N0m][N$xh7.Y_7][N52](this[X5U][O7b]):L_a;var ssp=E3Q;if(dt){var F4P=g66;F4P+=x39;var E_0=D7J;E_0+=T4j;E_0+=d3C;E_0+=X5U;var A2m=X5U;A2m+=r5m;ssp=dt[A2m]()[w7J][E_0][F4P];}if(this[X5U][w6R]){var L2N=X5U;L2N+=K0V;L2N+=N$xh7.Z2m;L2N+=M3d;this[f8i](L2N,function(){i3m.L2C();if(ssp){var d_p=N$xh7[562024];d_p+=g1u;d_p+=e36;var R_L=D7J;R_L+=N$xh7.G7l;R_L+=N$xh7.Z2m;dt[R_L](d_p,fn);}else {setTimeout(function(){fn();},s15);}});return D$_;}else if(this[j0P]() === P6f || this[l1n]() === F0X){var M5N=g66;M5N+=p9M;M5N+=H8I;M5N+=z_7;this[f8i](t4I,function(){if(!_this[X5U][l9B]){setTimeout(function(){if(_this[X5U]){fn();}},s15);}else {var V_V=D7J;V_V+=G6T;_this[V_V](O3u,function(e,json){if(ssp && json){var a1W=N$xh7[562024];a1W+=W48;var B3K=D7J;B3K+=G6T;dt[B3K](a1W,fn);}else {setTimeout(function(){if(_this[X5U]){fn();}},s15);}});}})[M5N]();return D$_;}return E3Q;}function _weakInArray(name,arr){var u56=p9M;u56+=N$xh7.Z2m;i3m.L2C();u56+=k39;u56+=s7p;for(var i=w7J,ien=arr[u56];i < ien;i++){if(name == arr[i]){return i;}}return -c77;}var fieldType={create:function(){},disable:function(){},enable:function(){},get:function(){},set:function(){}};var DataTable$3=$[S_R][N$xh7.Y_7];function _buttonText(conf,textIn){var k6I="htm";var s25='Choose file...';var X_t="adText";var U6I="load button";var A8l="uplo";i3m.o$_();var V55=k6I;V55+=p9M;var w4o=e4k;w4o+=h31;w4o+=U6I;var b7B=N$xh7.s6X;b7B+=b24;b7B+=S5V;var v6N=Z8f;v6N+=I56;if(textIn === L_a || textIn === undefined){var u$4=A8l;u$4+=X_t;textIn=conf[u$4] || s25;}conf[v6N][b7B](w4o)[V55](textIn);}function _commonUpload(editor,conf,dropCallback,multiple){var m5z="div.c";var N25="ss=\"cell uplo";var D_R="ade";var C2y="oad\">";var U9Q="dro";var b3a="nput ty";var C0n="e=file]";var M5K="nab";var D3q="l ";var y64="d limitHide\">";var a2M="learValue button";var h5t=" here to upload";var v7I='<button class="';var X$r="n class=\"";var M1a="ut>";var Y89="<div class=\"cel";var n8S='drop';var q9D="<i";var r_c="=\"file\" ";var v45="<div clas";var d_s=" drop a fil";var Z7R="\"></bu";var K4q='<div class="eu_table">';var E3C="n>";var w7R='dragover';var Z_W="dragDr";var X9B="dragDropText";var V4Y="tton>";var Z_i="p\"><span><";var j6j="></inp";var Q40='<div class="rendered"></div>';var J8k='dragleave dragexit';var D2C="\"></butto";var o02="div class=\"dro";var f9S="Cl";var W9M='<div class="row second">';var b3v="ileRe";var o6b="oDrop";var c4S='<div class="row">';var S68="<div cla";var a6m='input[type=file]';var e6F="ered";var s0Y="tor_upl";var A3B="div.rend";var D3D='multiple';var I5j="nput[t";var A8Y="Drag and";var N7M='<div class="cell">';var X3N="/span></div>";var z60="clearValue\">";var c1e="s=\"edi";var T9R='div.drop span';var k$T='<div class="cell limitHide">';var R_3="ttonInter";var f3x=m5z;f3x+=a2M;var l33=N$xh7.s6X;l33+=b24;l33+=N$xh7.G7l;l33+=N$xh7[562024];var s1_=Z_W;s1_+=d5J;var Z2c=b0C;Z2c+=b3v;Z2c+=D_R;Z2c+=z_7;var I1I=U4X;I1I+=M5K;I1I+=x38;I1I+=N$xh7[562024];var h0V=H12;h0V+=V8m;var Q0B=o56;Q0B+=o02;Q0B+=Z_i;Q0B+=X3N;var O0j=H12;O0j+=N$xh7[562024];O0j+=a40;O0j+=g7w;var A3V=D2C;A3V+=E3C;var o2U=o56;o2U+=g66;o2U+=b9j;o2U+=X$r;var U02=Y89;U02+=D3q;U02+=z60;var V$U=Z9e;V$U+=u$z;var k4G=j6j;k4G+=M1a;var f4Z=q9D;f4Z+=b3a;f4Z+=k3z;f4Z+=r_c;var l7W=Z7R;l7W+=V4Y;var s8C=S68;s8C+=N25;s8C+=N$xh7[194026];s8C+=y64;var L4n=v45;L4n+=c1e;L4n+=s0Y;L4n+=C2y;var j1t=X4_;j1t+=R_3;j1t+=Z6b;j1t+=p9M;var c2l=j7u;c2l+=e9T;if(multiple === void w7J){multiple=E3Q;}var btnClass=editor[c2l][A_z][j1t];var container=$(L4n + K4q + c4S + s8C + v7I + btnClass + l7W + f4Z + (multiple?D3D:J3K) + k4G + V$U + U02 + o2U + btnClass + A3V + n51 + O0j + W9M + k$T + Q0B + n51 + N7M + Q40 + h0V + n51 + n51 + n51);conf[f0s]=container;conf[I1I]=D$_;if(conf[Z33]){var P7k=b24;P7k+=N$xh7[562024];var n7f=b24;n7f+=N$xh7[562024];var D_S=b24;D_S+=I5j;D_S+=c$X;D_S+=C0n;container[t_f](D_S)[M3P](n7f,Editor[J3R](conf[P7k]));}if(conf[M3P]){container[t_f](a6m)[M3P](conf[M3P]);}_buttonText(conf);if(window[Z2c] && conf[s1_] !== E3Q){var R8d=D7J;R8d+=N$xh7.G7l;var P5s=D7J;P5s+=k2P;var J2t=D7J;J2t+=N$xh7.G7l;var z6E=D7J;z6E+=N$xh7.G7l;var P2b=D7J;P2b+=N$xh7.G7l;var h0D=e4k;h0D+=U9Q;h0D+=K8U;var e7U=N$xh7.s6X;e7U+=Z9F;e7U+=N$xh7[562024];var H_u=A8Y;H_u+=d_s;H_u+=N$xh7.Z2m;H_u+=h5t;var C03=m04;C03+=N$xh7[562024];container[C03](T9R)[m6m](conf[X9B] || H_u);var dragDrop_1=container[e7U](h0D);dragDrop_1[P2b](n8S,function(e){var G1U="aTransf";var k9e="_enab";var f36="inalEvent";var G5y=k9e;G5y+=D_A;if(conf[G5y]){var U2l=o2f;U2l+=C9P;var L7W=e9V;L7W+=G1U;L7W+=C9P;var d8N=D7J;d8N+=W3j;d8N+=f36;Editor[D8y](editor,conf,e[d8N][L7W][j$v],_buttonText,dropCallback);dragDrop_1[C3Q](U2l);}return E3Q;})[h0w](J8k,function(e){var O5l='over';i3m.L2C();var b64=w$1;b64+=d7z;b64+=N$xh7.Z2m;b64+=N$xh7[562024];if(conf[b64]){dragDrop_1[C3Q](O5l);}return E3Q;})[z6E](w7R,function(e){var x_V="C";if(conf[Q9Q]){var H7G=D7J;H7G+=J7D;H7G+=N$xh7.Z2m;H7G+=z_7;var o0f=G1N;o0f+=x_V;o0f+=p9M;o0f+=X8B;dragDrop_1[o0f](H7G);}return E3Q;});editor[J2t](P5s,function(){var o6w="er.DTE_Upload ";var Q9J="drop.DTE_Upload";var I__="ragov";var r9d=N$xh7[562024];r9d+=I__;r9d+=o6w;r9d+=Q9J;var t3Y=D7J;t3Y+=N$xh7.G7l;$(Q14)[t3Y](r9d,function(e){i3m.L2C();return E3Q;});})[R8d](t4I,function(){var Y14="ad drop.DTE";var Y5e="dragover.DTE_Uplo";var p2l="_Upload";var i8X=Y5e;i8X+=Y14;i8X+=p2l;var W0h=g66;W0h+=D7J;W0h+=A93;$(W0h)[K$m](i8X);});}else {var l0F=A3B;l0F+=e6F;var z94=N$xh7.s6X;z94+=b24;z94+=N$xh7.G7l;z94+=N$xh7[562024];var q3e=N$xh7[194026];q3e+=K8U;q3e+=k2P;q3e+=N$xh7[562024];var l63=N$xh7.G7l;l63+=o6b;var D8u=G1N;D8u+=f9S;D8u+=N$xh7[194026];D8u+=m54;container[D8u](l63);container[q3e](container[z94](l0F));}container[l33](f3x)[h0w](S9g,function(e){var I5_=w$1;I5_+=d7z;I5_+=Y6c;e[A6O]();if(conf[I5_]){var a9g=M1o;a9g+=N$xh7[194026];a9g+=p9M;a9g+=p9M;upload[M3V][a9g](editor,conf,J3K);}});container[t_f](a6m)[h0w](i1p,function(){var U1D="ploa";var z4d=K2T;z4d+=p9M;z4d+=N$xh7.Z2m;z4d+=X5U;var n_E=H8I;n_E+=U1D;n_E+=N$xh7[562024];Editor[n_E](editor,conf,this[z4d],_buttonText,function(ids){var Q1n="nput[type=fi";var X0q="e]";var W1s=n6T;W1s+=M_I;var B6l=b24;B6l+=Q1n;B6l+=p9M;B6l+=X0q;var d0w=N$xh7.s6X;d0w+=b24;i3m.L2C();d0w+=N$xh7.G7l;d0w+=N$xh7[562024];dropCallback[q8Y](editor,ids);container[d0w](B6l)[w7J][W1s]=J3K;});});return container;}function _triggerChange(input){setTimeout(function(){var n80=T0i;n80+=h1I;n80+=N$xh7.Z2m;input[n7R](n80,{editor:D$_,editorSet:D$_});;},w7J);}var baseFieldType=$[Q1k](D$_,{},fieldType,{canReturnSubmit:function(conf,node){return D$_;},disable:function(conf){var z3p=d_E;z3p+=Y6c;var W76=K8U;W76+=z_7;W76+=D7J;W76+=K8U;var c_h=w$1;c_h+=c2d;c_h+=H8I;c_h+=Y_M;conf[c_h][W76](z3p,D$_);},enable:function(conf){conf[f0s][V6_](H42,E3Q);},get:function(conf){var v_j=J7D;v_j+=x83;return conf[f0s][v_j]();},set:function(conf,val){var o$E=O4v;o$E+=B98;conf[o$E][n6T](val);i3m.L2C();_triggerChange(conf[f0s]);}});var hidden={create:function(conf){conf[H3t]=conf[Y5g];return L_a;},get:function(conf){var N6J=w$1;N6J+=J7D;N6J+=N$xh7[194026];N6J+=p9M;return conf[N6J];},set:function(conf,val){var w4Z=w$1;i3m.L2C();w4Z+=J7D;w4Z+=N$xh7[194026];w4Z+=p9M;conf[w4Z]=val;}};var readonly=$[J4v](D$_,{},baseFieldType,{create:function(conf){var Y6U="ead";var i95=Y_M;i95+=N$xh7.Z2m;i95+=F1B;var W2$=z_7;W2$+=Y6U;W2$+=h0w;W2$+=P6W;var p2m=P0L;p2m+=N$xh7.s6X;p2m+=X13;var D5z=N$xh7.Z2m;D5z+=t6B;D5z+=Y_M;D5z+=a$k;var D1$=w$1;D1$+=G9c;conf[D1$]=$(o3v)[M3P]($[D5z]({id:Editor[p2m](conf[Z33]),readonly:W2$,type:i95},conf[M3P] || ({})));return conf[f0s][w7J];}});var text=$[Q1k](D$_,{},baseFieldType,{create:function(conf){var P5j=b24;P5j+=N$xh7[562024];var C6v=g_d;C6v+=M3d;C6v+=N$xh7.G7l;C6v+=N$xh7[562024];var Y2v=N$xh7[194026];Y2v+=Y_M;Y2v+=Y_M;Y2v+=z_7;conf[f0s]=$(o3v)[Y2v]($[C6v]({id:Editor[J3R](conf[P5j]),type:g$w},conf[M3P] || ({})));return conf[f0s][w7J];}});var password=$[A_V](D$_,{},baseFieldType,{create:function(conf){var m9c='password';var C4C="saf";var f5D="eI";var C90=b24;i3m.o$_();C90+=N$xh7[562024];var B0U=C4C;B0U+=f5D;B0U+=N$xh7[562024];conf[f0s]=$(o3v)[M3P]($[Q1k]({id:Editor[B0U](conf[C90]),type:m9c},conf[M3P] || ({})));return conf[f0s][w7J];}});var textarea=$[D8o](D$_,{},baseFieldType,{canReturnSubmit:function(conf,node){return E3Q;},create:function(conf){var m72="afeId";var z4A='<textarea></textarea>';var Q2g=m5I;Q2g+=r70;Q2g+=H8I;Q2g+=Y_M;var y8G=N$xh7[194026];y8G+=Y_M;y8G+=Y_M;y8G+=z_7;var J2i=b24;J2i+=N$xh7[562024];var T3E=X5U;T3E+=m72;var Z2f=N$xh7[194026];Z2f+=b2e;Z2f+=z_7;var n2K=m5I;n2K+=n0n;conf[n2K]=$(z4A)[Z2f]($[Q1k]({id:Editor[T3E](conf[J2i])},conf[y8G] || ({})));return conf[Q2g][w7J];}});var select=$[H55](D$_,{},baseFieldType,{_addOptions:function(conf,opts,append){var H8S="placeholderValue";var q_V="derDisable";var O1z="placeho";var s5E="holderDisabled";var l64="hi";if(append === void w7J){append=E3Q;}var elOpts=conf[f0s][w7J][n$$];var countOffset=w7J;i3m.L2C();if(!append){var i71=p9M;i71+=N$xh7.Z2m;i71+=N$xh7.G7l;i71+=y9w;elOpts[i71]=w7J;if(conf[G$w] !== undefined){var I5V=l64;I5V+=b8V;I5V+=a1G;var E8g=O1z;E8g+=p9M;E8g+=q_V;E8g+=N$xh7[562024];var p5f=K8U;p5f+=O5f;p5f+=s5E;var placeholderValue=conf[H8S] !== undefined?conf[H8S]:J3K;countOffset+=c77;elOpts[w7J]=new Option(conf[G$w],placeholderValue);var disabled=conf[p5f] !== undefined?conf[E8g]:D$_;elOpts[w7J][I5V]=disabled;elOpts[w7J][a0b]=disabled;elOpts[w7J][W0L]=placeholderValue;}}else {var F9R=Y7q;F9R+=N8u;countOffset=elOpts[F9R];}if(opts){Editor[W6H](opts,conf[P$X],function(val,label,i,attr){var option=new Option(label,val);i3m.L2C();option[W0L]=val;if(attr){$(option)[M3P](attr);}elOpts[i + countOffset]=option;});}},create:function(conf){var i94="nge.";var m9T="opt";var L0P="pOp";var v5Z='<select></select>';var g0T=N_g;g0T+=Y_M;var v_S=b24;v_S+=L0P;v_S+=Y_M;v_S+=X5U;var A0s=m9T;A0s+=O3R;A0s+=N$xh7.G7l;A0s+=X5U;var W1j=z6R;W1j+=N$xh7[194026];W1j+=i94;W1j+=O1K;var z40=X5U;z40+=r_Z;z40+=D$3;z40+=N$xh7[562024];conf[f0s]=$(v5Z)[M3P]($[Q1k]({id:Editor[z40](conf[Z33]),multiple:conf[T8Q] === D$_},conf[M3P] || ({})))[h0w](W1j,function(e,d){var m1u="_l";var s0_="Set";var u3T=Y6c;u3T+=b24;u3T+=X4b;u3T+=z_7;i3m.o$_();if(!d || !d[u3T]){var r5C=m1u;r5C+=N$xh7[194026];r5C+=m79;r5C+=s0_;conf[r5C]=select[L6w](conf);}});select[L09](conf,conf[A0s] || conf[v_S]);return conf[g0T][w7J];},destroy:function(conf){var A4e="nge.dte";var u_v=T0i;u_v+=A4e;conf[f0s][K$m](u_v);},get:function(conf){var u8x="ep";var B4T="ator";var s$6="ara";var D1w='option:selected';var p0w=c6m;p0w+=N$xh7.Z2m;var l4c=w$1;l4c+=c2d;l4c+=H8I;l4c+=Y_M;var val=conf[l4c][t_f](D1w)[H8R](function(){i3m.L2C();var H8p="r_val";var n8A=H2Q;n8A+=H8p;return this[n8A];})[I5k]();if(conf[p0w]){var w3n=X5U;w3n+=u8x;w3n+=s$6;w3n+=f6R;var O36=x33;O36+=z_7;O36+=B4T;return conf[O36]?val[Q_E](conf[w3n]):val;}return val[b$C]?val[w7J]:L_a;},set:function(conf,val,localUpdate){var P9k="epa";var K_H="_lastSet";var t7a="rator";var e1a='option';var d0A=Y7q;d0A+=N8u;var e8k=c6m;e8k+=N$xh7.Z2m;var l_5=N$xh7.Z2m;l_5+=N$xh7[194026];l_5+=z6R;var P2Q=m04;P2Q+=N$xh7[562024];var V56=w$1;V56+=c2d;V56+=H8I;V56+=Y_M;var c_j=m8l;c_j+=x6K;var F6h=X5U;F6h+=P9k;F6h+=t7a;if(!localUpdate){conf[K_H]=val;}if(conf[T8Q] && conf[F6h] && !Array[U1F](val)){var i_q=x33;i_q+=t7a;var P27=X5U;P27+=K8U;P27+=p9M;P27+=k6Q;var p0Y=m79;p0Y+=z_7;p0Y+=Z9F;p0Y+=U42;val=typeof val === p0Y?val[P27](conf[i_q]):[];}else if(!Array[c_j](val)){val=[val];}var i;var len=val[b$C];var found;var allFound=E3Q;var options=conf[V56][t_f](e1a);conf[f0s][P2Q](e1a)[l_5](function(){found=E3Q;for(i=w7J;i < len;i++){if(this[W0L] == val[i]){found=D$_;allFound=D$_;break;}}this[l1V]=found;});if(conf[G$w] && !allFound && !conf[e8k] && options[d0A]){options[w7J][l1V]=D$_;}if(!localUpdate){var x2_=w$1;x2_+=b24;x2_+=N$xh7.G7l;x2_+=I56;_triggerChange(conf[x2_]);}return allFound;},update:function(conf,options,append){var n67="_lastS";i3m.o$_();var q_z="_addOption";var I_e=n67;I_e+=v1p;var B$Q=q_z;B$Q+=X5U;select[B$Q](conf,options,append);var lastSet=conf[I_e];if(lastSet !== undefined){select[M3V](conf,lastSet,D$_);}_triggerChange(conf[f0s]);}});var checkbox=$[p3u](D$_,{},baseFieldType,{_addOptions:function(conf,opts,append){var t3T="onsPa";var t3_="pti";if(append === void w7J){append=E3Q;}var jqInput=conf[f0s];var offset=w7J;if(!append){jqInput[J7H]();}else {var E8U=p9M;E8U+=N$xh7.Z2m;E8U+=s8z;var K1k=b24;K1k+=N$xh7.G7l;K1k+=K8U;K1k+=B98;offset=$(K1k,jqInput)[E8U];}if(opts){var r_1=D7J;r_1+=t3_;r_1+=t3T;r_1+=v9E;Editor[W6H](opts,conf[r_1],function(val,label,i,attr){var R7Q="put id=\"";var u_P="nput:";var X81="/label>";var x6R='<div>';var j7X="\"checkbox\" />";var B12="\" type=";var c8m=t0x;c8m+=z_7;var B76=b24;B76+=u_P;B76+=z0W;B76+=m79;var o98=o56;o98+=X81;var n8P=b24;n8P+=N$xh7[562024];var H8Y=B12;H8Y+=j7X;var x45=X5U;x45+=N$xh7[194026];x45+=N$xh7.s6X;x45+=X13;var r9I=o56;r9I+=Z9F;r9I+=R7Q;jqInput[a07](x6R + r9I + Editor[x45](conf[Z33]) + w_R + (i + offset) + H8Y + s42 + Editor[J3R](conf[n8P]) + w_R + (i + offset) + e6e + label + o98 + n51);$(B76,jqInput)[c8m](K0T,val)[w7J][W0L]=val;if(attr){$(p9P,jqInput)[M3P](attr);}});}},create:function(conf){var w1C="<div><";var u60="ipOpts";var F1b="_addOp";var g3Z=F1b;g3Z+=D6m;var T$S=w1C;T$S+=v7e;T$S+=N$xh7[562024];T$S+=u$z;var n9e=w$1;n9e+=Z9F;n9e+=I56;conf[n9e]=$(T$S);checkbox[g3Z](conf,conf[n$$] || conf[u60]);return conf[f0s][w7J];},disable:function(conf){var J5X=K8U;J5X+=z_7;J5X+=D7J;J5X+=K8U;var W8g=b24;W8g+=N$xh7.G7l;W8g+=I56;conf[f0s][t_f](W8g)[J5X](H42,D$_);},enable:function(conf){conf[f0s][t_f](i1p)[V6_](H42,E3Q);},get:function(conf){var m1L="unselectedValue";var D7l="input:";var O6k="eparator";var y2i="check";var A9N=N$xh7.r$A;A9N+=D7J;A9N+=b24;A9N+=N$xh7.G7l;var j$e=X5U;j$e+=O6k;var n6x=t7Q;n6x+=s7p;var r7W=D7l;r7W+=y2i;r7W+=Y6c;var o$n=m04;o$n+=N$xh7[562024];var v$L=O4v;v$L+=B98;var out=[];var selected=conf[v$L][o$n](r7W);if(selected[n6x]){selected[A1F](function(){out[T7B](this[W0L]);});}else if(conf[m1L] !== undefined){out[T7B](conf[m1L]);}return conf[j$e] === undefined || conf[B9C] === L_a?out:out[A9N](conf[B9C]);},set:function(conf,val){var h2A='|';var O4p=u9_;O4p+=z_7;O4p+=z_7;O4p+=R$0;var e5L=X5U;e5L+=h9F;var J_D=m8l;J_D+=x6K;var E$j=w$1;E$j+=Z9F;E$j+=K8U;E$j+=B98;var jqInputs=conf[E$j][t_f](i1p);if(!Array[J_D](val) && typeof val === e5L){var z5c=Z7y;z5c+=p9M;z5c+=b24;z5c+=Y_M;val=val[z5c](conf[B9C] || h2A);}else if(!Array[O4p](val)){val=[val];}var i;var len=val[b$C];var found;jqInputs[A1F](function(){var V2d="hec";var V9D="or_val";var Z6S=M1o;Z6S+=V2d;Z6S+=O4S;found=E3Q;for(i=w7J;i < len;i++){var C7H=U4X;C7H+=T2A;C7H+=Y_M;C7H+=V9D;if(this[C7H] == val[i]){found=D$_;break;}}this[Z6S]=found;});_triggerChange(jqInputs);},update:function(conf,options,append){var n7o=U42;n7o+=v1p;var currVal=checkbox[n7o](conf);checkbox[L09](conf,options,append);checkbox[M3V](conf,currVal);}});var radio=$[G1L](D$_,{},baseFieldType,{_addOptions:function(conf,opts,append){var a4l="option";var j3z="mpt";var A8s="pair";var s7H="sPair";i3m.L2C();if(append === void w7J){append=E3Q;}var jqInput=conf[f0s];var offset=w7J;if(!append){var q5H=N$xh7.Z2m;q5H+=j3z;q5H+=x6K;jqInput[q5H]();}else {var b2t=b24;b2t+=r70;b2t+=B98;offset=$(b2t,jqInput)[b$C];}if(opts){var P8t=a4l;P8t+=s7H;var K_L=A8s;K_L+=X5U;Editor[K_L](opts,conf[P8t],function(val,label,i,attr){var t1m="feId";var E06='" type="radio" name="';var h3R="ut:last";var m$g=" /";var c5M='<input id="';var N_q=J7D;N_q+=N$xh7[194026];N_q+=E5F;var F9j=c2d;F9j+=h3R;i3m.o$_();var V2v=Z9e;V2v+=b24;V2v+=a1p;var c6A=H12;c6A+=S9Z;c6A+=A4p;var d50=b24;d50+=N$xh7[562024];var O$Y=X5U;O$Y+=N$xh7[194026];O$Y+=t1m;var G3G=e69;G3G+=m$g;G3G+=g7w;var P$W=N$xh7.G7l;P$W+=N$xh7[194026];P$W+=N$xh7[419025];P$W+=N$xh7.Z2m;var B2s=X5U;B2s+=r_Z;B2s+=D$3;B2s+=N$xh7[562024];var V5i=j33;V5i+=b24;V5i+=J7D;V5i+=g7w;jqInput[a07](V5i + c5M + Editor[B2s](conf[Z33]) + w_R + (i + offset) + E06 + conf[P$W] + G3G + s42 + Editor[O$Y](conf[d50]) + w_R + (i + offset) + e6e + label + c6A + V2v);$(F9j,jqInput)[M3P](N_q,val)[w7J][W0L]=val;if(attr){var q0V=d3Q;q0V+=Y_M;q0V+=z_7;$(p9P,jqInput)[q0V](attr);}});}},create:function(conf){var E81='<div />';var E9n="pOpt";var I2u="ddOp";var W7_=m5I;W7_+=N$xh7.G7l;W7_+=I56;var k1i=P$0;k1i+=N$xh7.G7l;var N3I=D7J;N3I+=N$xh7.G7l;var i4t=b24;i4t+=E9n;i4t+=X5U;var H32=W_n;H32+=I2u;H32+=D6m;conf[f0s]=$(E81);radio[H32](conf,conf[n$$] || conf[i4t]);this[N3I](k1i,function(){var Z87=K2T;i3m.L2C();Z87+=N$xh7.G7l;Z87+=N$xh7[562024];conf[f0s][Z87](i1p)[A1F](function(){var M3O=w$1;i3m.o$_();M3O+=M$w;M3O+=k3Q;if(this[M3O]){var G7u=M1o;G7u+=m6i;G7u+=M1o;G7u+=O4S;this[G7u]=D$_;}});});return conf[W7_][w7J];},disable:function(conf){var Q$r=N_g;Q$r+=Y_M;conf[Q$r][t_f](i1p)[V6_](H42,D$_);},enable:function(conf){var M8m="sab";var J76=T2A;J76+=M8m;J76+=D_A;var N7K=b24;N7K+=N$xh7.G7l;N7K+=K8U;N7K+=B98;conf[f0s][t_f](N7K)[V6_](J76,E3Q);},get:function(conf){var C3x="editor_val";var x8J="V";var k3U='input:checked';i3m.o$_();var K3k="tedValu";var J9j="unselected";var H5Q="unselec";var h3N=J9j;h3N+=x8J;h3N+=R_8;var T$b=H5Q;T$b+=K3k;T$b+=N$xh7.Z2m;var Y66=N8N;Y66+=U42;Y66+=Y_M;Y66+=s7p;var a2q=K2T;a2q+=S5V;var E$u=Z8f;E$u+=K8U;E$u+=B98;var el=conf[E$u][a2q](k3U);if(el[Y66]){var k4t=w$1;k4t+=C3x;return el[w7J][k4t];}return conf[T$b] !== undefined?conf[h3N]:undefined;},set:function(conf,val){var H73="t:ch";var t2T="cked";var w6x=G46;w6x+=H73;w6x+=N$xh7.Z2m;w6x+=t2T;var q91=N$xh7.s6X;q91+=Z9F;q91+=N$xh7[562024];var m9Y=Z8f;m9Y+=K8U;m9Y+=B98;var C5a=c2d;C5a+=B98;conf[f0s][t_f](C5a)[A1F](function(){var m6V="che";var A69="_preChecked";var H8h="r_";var O8m="checke";var Y61="_pr";i3m.o$_();var p74=H2Q;p74+=H8h;p74+=n6T;this[A69]=E3Q;if(this[p74] == val){var Z71=O8m;Z71+=N$xh7[562024];this[Z71]=D$_;this[A69]=D$_;}else {var Y1m=Y61;Y1m+=k3Q;var o5$=m6V;o5$+=j0w;o5$+=Y6c;this[o5$]=E3Q;this[Y1m]=E3Q;}});_triggerChange(conf[m9Y][q91](w6x));},update:function(conf,options,append){var j7L="filte";var W3s='[value="';var F1J=t0x;F1J+=z_7;var N10=N$xh7.Z2m;N10+=q3F;var T5C=t7Q;T5C+=s7p;var p$W=j7L;p$W+=z_7;var m$S=X5U;m$S+=N$xh7.Z2m;m$S+=Y_M;var C2z=b24;C2z+=N$xh7.G7l;C2z+=K8U;C2z+=B98;var Y1b=N$xh7.s6X;Y1b+=b24;Y1b+=N$xh7.G7l;Y1b+=N$xh7[562024];var G6R=U42;G6R+=v1p;var currVal=radio[G6R](conf);radio[L09](conf,options,append);var inputs=conf[f0s][Y1b](C2z);radio[m$S](conf,inputs[p$W](W3s + currVal + K2M)[T5C]?currVal:inputs[N10](w7J)[F1J](K0T));}});var datetime=$[Q1k](D$_,{},baseFieldType,{create:function(conf){var Z_Y="datet";var H3f="keyI";var f1X="<input /";var o9H="ary i";var M1v="s requir";var H3o="splayFormat";var h1g="DateTime libr";var o6c="eFn";var H3s=s1c;H3s+=o6c;var C2Y=D7J;C2Y+=N$xh7.G7l;var W37=H3f;W37+=n0n;var v3i=Z_Y;v3i+=W1t;v3i+=N$xh7.Z2m;var q_G=A_z;q_G+=d3Q;var A6b=T2A;A6b+=H3o;var n3I=K9u;n3I+=N$xh7.Z2m;n3I+=N$xh7.G7l;n3I+=N$xh7[562024];var k18=X5U;k18+=r_Z;k18+=D$3;k18+=N$xh7[562024];var R8f=f1X;R8f+=g7w;var V02=w$1;V02+=Z9F;V02+=K8U;V02+=B98;conf[V02]=$(R8f)[M3P]($[Q1k](D$_,{id:Editor[k18](conf[Z33]),type:g$w},conf[M3P]));if(!DataTable$3[h1K]){var m8h=h1g;m8h+=o9H;m8h+=M1v;m8h+=Y6c;Editor[U0X](m8h,c74);}conf[a$p]=new DataTable$3[h1K](conf[f0s],$[n3I]({format:conf[A6b] || conf[q_G],i18n:this[L_E][v3i]},conf[r0$]));conf[p0N]=function(){var A0x="ker";var g79=w$1;g79+=H1K;g79+=M1o;g79+=A0x;conf[g79][f0B]();};if(conf[W37] === E3Q){var L3V=D7J;L3V+=N$xh7.G7l;conf[f0s][L3V](R4p,function(e){i3m.L2C();e[A6O]();});}this[C2Y](t4I,conf[H3s]);return conf[f0s][w7J];},destroy:function(conf){var d2P="dest";var h06=d2P;h06+=z_7;h06+=D7J;h06+=x6K;var W6X=Z8f;W6X+=U62;W6X+=Y_M;var T5l=D7J;T5l+=N$xh7.s6X;T5l+=N$xh7.s6X;this[T5l](t4I,conf[p0N]);conf[W6X][K$m](R4p);conf[a$p][h06]();},errorMessage:function(conf,msg){i3m.L2C();var s$P="errorMsg";conf[a$p][s$P](msg);},get:function(conf){var G$W="momentLocale";var o4P="ntS";var p66="trict";var N1o=N$xh7.s6X;N1o+=G1H;N1o+=R3r;N1o+=Y_M;var P1H=N$xh7[419025];P1H+=I6x;P1H+=o4P;P1H+=p66;var v2g=N$xh7.s6X;v2g+=A1b;var R2o=y0m;R2o+=N$xh7[419025];R2o+=a1G;R2o+=Y_M;var val=conf[f0s][n6T]();var inst=conf[a$p][M1o];var moment=window[R2o];return val && conf[E4F] && moment?moment(val,inst[v2g],inst[G$W],inst[P1H])[N1o](conf[E4F]):val;},maxDate:function(conf,max){var l_G=N$xh7[419025];l_G+=f8E;conf[a$p][l_G](max);},minDate:function(conf,min){var d2G=Y5v;d2G+=N$xh7.G7l;i3m.L2C();conf[a$p][d2G](min);},owns:function(conf,node){i3m.o$_();var A43=D7J;A43+=e36;A43+=N$xh7.G7l;A43+=X5U;var t1n=w$y;t1n+=M1o;t1n+=O0A;t1n+=C9P;return conf[t1n][A43](node);},set:function(conf,val){var I7N="forma";var J4Z='--';var I9U="mom";var k8h="entLocal";var b7n="ntStric";var k5u="reForma";var P8A="wi";var f_l=N$xh7.s6X;f_l+=A1b;var M3s=I7N;M3s+=Y_M;var C8p=N$xh7[419025];C8p+=I6x;C8p+=b7n;C8p+=Y_M;var u0B=I9U;u0B+=k8h;u0B+=N$xh7.Z2m;var S6Z=P8A;S6Z+=k5u;S6Z+=Y_M;i3m.o$_();var N14=X5U;N14+=Y_M;N14+=z_7;N14+=V_5;var f3R=y0m;f3R+=y7o;f3R+=N$xh7.G7l;f3R+=Y_M;var y6e=w$y;y6e+=M1o;y6e+=O0A;y6e+=C9P;var inst=conf[y6e][M1o];var moment=window[f3R];conf[a$p][n6T](typeof val === N14 && val && val[b6o](J4Z) !== w7J && conf[E4F] && moment?moment(val,conf[S6Z],inst[u0B],inst[C8p])[M3s](inst[f_l]):val);_triggerChange(conf[f0s]);}});var upload=$[t7A](D$_,{},baseFieldType,{canReturnSubmit:function(conf,node){i3m.o$_();return E3Q;},create:function(conf){var editor=this;var container=_commonUpload(editor,conf,function(val){i3m.o$_();var x7h=N$xh7.G7l;x7h+=N$xh7[194026];x7h+=N$xh7[419025];x7h+=N$xh7.Z2m;var e_z=X5U;e_z+=N$xh7.Z2m;e_z+=Y_M;upload[e_z][q8Y](editor,conf,val[w7J]);editor[C3B](L2z,[conf[x7h],val[w7J]]);});return container;},disable:function(conf){var z1f=M$w;z1f+=D7J;z1f+=K8U;var E6I=c2d;E6I+=H8I;E6I+=Y_M;var M0B=m04;M0B+=N$xh7[562024];var j8E=Z8f;j8E+=U62;j8E+=Y_M;conf[j8E][M0B](E6I)[z1f](H42,D$_);conf[Q9Q]=E3Q;},enable:function(conf){var p0h="_en";var j6r="disa";var r$v=p0h;r$v+=n8N;r$v+=N$xh7[562024];var l2P=j6r;l2P+=g66;l2P+=p9M;l2P+=Y6c;var n9w=N$xh7.s6X;i3m.L2C();n9w+=H3N;conf[f0s][n9w](i1p)[V6_](l2P,E3Q);conf[r$v]=D$_;},get:function(conf){i3m.o$_();var k3x=w$1;k3x+=o05;k3x+=p9M;return conf[k3x];},set:function(conf,val){var J5q="v.render";var p7k=" button";var Y$U="upload.edit";var R2m="iv.clea";var S6H="noC";var T3L="rValue";var t2c='noClear';var e_K="ddC";var u1v="clearText";var A7G='No file';var c2k="ear";var c3$=w$1;c3$+=J7D;c3$+=N$xh7[194026];c3$+=p9M;var o3z=Y$U;o3z+=G1H;var R4y=w$1;R4y+=b24;R4y+=n0n;var u$$=N$xh7[562024];u$$+=R2m;u$$+=T3L;u$$+=p7k;var h4L=w$1;h4L+=o05;h4L+=p9M;conf[h4L]=val;conf[f0s][n6T](J3K);var container=conf[f0s];if(conf[j0P]){var z5Y=T2A;z5Y+=J5q;z5Y+=N$xh7.Z2m;z5Y+=N$xh7[562024];var F8T=N$xh7.s6X;F8T+=Z9F;F8T+=N$xh7[562024];var rendered=container[F8T](z5Y);if(conf[H3t]){var n5$=w$1;n5$+=J7D;n5$+=N$xh7[194026];n5$+=p9M;var j2f=C6e;j2f+=R$0;rendered[U1f](conf[j2f](conf[n5$]));}else {rendered[J7H]()[a07](C9I + (conf[x4b] || A7G) + L18);}}var button=container[t_f](u$$);if(val && conf[u1v]){var B7z=S6H;B7z+=p9M;B7z+=c2k;var N09=s7p;N09+=Y_M;N09+=N$xh7[419025];N09+=p9M;button[N09](conf[u1v]);container[C3Q](B7z);}else {var a6Y=N$xh7[194026];a6Y+=e_K;a6Y+=z0W;a6Y+=m54;container[a6Y](t2c);}conf[R4y][t_f](i1p)[R_N](o3z,[conf[c3$]]);}});var uploadMany=$[f08](D$_,{},baseFieldType,{_showHide:function(conf){var c$C="_container";var x1T="_li";var r2a="bloc";var O14="ide";var Q88="limit";var l3G="div.limit";var w39="H";var J5o="itLeft";var f_B=x1T;f_B+=N$xh7[419025];f_B+=J5o;var R$v=r2a;R$v+=O0A;var X7w=p9M;X7w+=b24;X7w+=N$xh7[419025];X7w+=k6Q;var o$5=t7Q;o$5+=s7p;var A6Y=k5t;A6Y+=T3p;var g29=l3G;g29+=w39;g29+=O14;if(!conf[Q88]){return;}conf[c$C][t_f](g29)[Y8J](A6Y,conf[H3t][o$5] >= conf[X7w]?D6F:R$v);conf[f_B]=conf[Q88] - conf[H3t][b$C];},canReturnSubmit:function(conf,node){return E3Q;},create:function(conf){var Y3w=".remov";var x5C="_contai";var I98=x5C;I98+=C$p;var v90=r4Q;v90+=Y3w;v90+=N$xh7.Z2m;var c4R=e$V;c4R+=b24;c4R+=M1o;c4R+=O0A;var W_g=D7J;W_g+=N$xh7.G7l;var N_I=V6M;N_I+=j8Q;var editor=this;var container=_commonUpload(editor,conf,function(val){var y8s="conc";var n3Y="_va";var F10=w$1;F10+=J7D;F10+=N$xh7[194026];F10+=p9M;var t1I=N7r;t1I+=N$xh7.G7l;t1I+=Y_M;var s3G=w$1;s3G+=n6T;var I01=M1o;I01+=N$xh7[194026];I01+=p9M;I01+=p9M;var S5d=X5U;S5d+=N$xh7.Z2m;S5d+=Y_M;var b8G=y8s;b8G+=N$xh7[194026];b8G+=Y_M;var W_s=n3Y;i3m.o$_();W_s+=p9M;conf[W_s]=conf[H3t][b8G](val);uploadMany[S5d][I01](editor,conf,conf[s3G]);editor[t1I](L2z,[conf[y5V],conf[F10]]);},D$_);container[L2m](N_I)[W_g](c4R,v90,function(e){var H3J="_v";i3m.L2C();var e3G="stopPropagation";e[e3G]();if(conf[Q9Q]){var r0e=H3J;r0e+=x83;var Y16=X5U;Y16+=N$xh7.Z2m;Y16+=Y_M;var I38=Z33;I38+=t6B;var idx=$(this)[u_k](I38);conf[H3t][F0A](idx,c77);uploadMany[Y16][q8Y](editor,conf,conf[r0e]);}});conf[I98]=container;return container;},disable:function(conf){var M1E=c2d;M1E+=H8I;M1E+=Y_M;var D2w=N$xh7.s6X;D2w+=b24;D2w+=N$xh7.G7l;D2w+=N$xh7[562024];conf[f0s][D2w](M1E)[V6_](H42,D$_);conf[Q9Q]=E3Q;},enable:function(conf){var q2N=K8U;q2N+=z_7;q2N+=D7J;q2N+=K8U;var V58=b24;V58+=N$xh7.G7l;V58+=K8U;V58+=B98;var b_w=N$xh7.s6X;b_w+=H3N;conf[f0s][b_w](V58)[q2N](H42,E3Q);conf[Q9Q]=D$_;},get:function(conf){return conf[H3t];},set:function(conf,val){var L3p="rHandler";var x04='upload.editor';var Z6d="gge";var a1i="<ul></u";var f6p="d collections must have an array as a value";var M2V="tri";var o_G="</s";var N1x="Uploa";var C9d='div.rendered';var L7F="No fi";var g2q="_showHide";var F2w=M2V;F2w+=Z6d;F2w+=L3p;var A0d=N$xh7.s6X;A0d+=b24;A0d+=N$xh7.G7l;A0d+=N$xh7[562024];var h4J=N_g;h4J+=Y_M;var T1G=N$xh7[562024];T1G+=b24;T1G+=C5F;T1G+=R$0;var q6V=w$1;q6V+=b24;q6V+=r70;q6V+=B98;var x_v=u9_;x_v+=N32;if(!val){val=[];}if(!Array[x_v](val)){var u3S=N1x;u3S+=f6p;throw new Error(u3S);}conf[H3t]=val;conf[f0s][n6T](J3K);var that=this;var container=conf[q6V];if(conf[T1G]){var rendered=container[t_f](C9d)[J7H]();if(val[b$C]){var I8g=N$xh7.Z2m;I8g+=N$xh7[194026];I8g+=M1o;I8g+=s7p;var F2A=N$xh7[194026];F2A+=C96;F2A+=a1G;F2A+=u2F;var t76=a1i;t76+=p9M;t76+=g7w;var list_1=$(t76)[F2A](rendered);$[I8g](val,function(i,file){var r0D="cla";var k$7=" remove";i3m.o$_();var g_6="<l";var Q4A="i>";var X4Z='">&times;</button>';var G2p="\" data-idx=\"";var h32=' <button class="';var display=conf[j0P](file,i);if(display !== L_a){var r3u=H12;r3u+=p9M;r3u+=Q4A;var m4T=k$7;m4T+=G2p;var H0i=m0i;H0i+=D7J;H0i+=N$xh7.G7l;var A5c=N$xh7.s6X;A5c+=G1H;A5c+=N$xh7[419025];var J8I=r0D;J8I+=m54;J8I+=e9T;var W1l=g_6;W1l+=b24;W1l+=g7w;var Z$z=o9_;Z$z+=K8U;Z$z+=a1G;Z$z+=N$xh7[562024];list_1[Z$z](W1l + display + h32 + that[J8I][A5c][H0i] + m4T + i + X4Z + r3u);}});}else {var y41=o_G;y41+=K8U;y41+=V0O;y41+=g7w;var i03=L7F;i03+=p9M;i03+=N$xh7.Z2m;i03+=X5U;var s3b=t7n;s3b+=a$k;rendered[s3b](C9I + (conf[x4b] || i03) + y41);}}uploadMany[g2q](conf);conf[h4J][A0d](i1p)[F2w](x04,[conf[H3t]]);}});var datatable=$[a0I](D$_,{},baseFieldType,{_addOptions:function(conf,options,append){var j2y="cle";var x9z=U7p;x9z+=N$xh7[194026];x9z+=e36;var p7T=N$xh7[194026];p7T+=N$xh7[562024];p7T+=N$xh7[562024];var W_2=N$xh7[562024];W_2+=Y_M;if(append === void w7J){append=E3Q;}var dt=conf[W_2];if(!append){var j4p=j2y;j4p+=h$Q;dt[j4p]();}dt[y1k][p7T](options)[x9z]();},_jumpToFirst:function(conf){var M_E="pplied";var i0s='applied';var g1Y="dexOf";var f5O='number';var x73="page";var h4D=N$xh7[562024];h4D+=W48;var D7R=N$xh7[562024];D7R+=Y_M;var v4E=b24;v4E+=N$xh7.G7l;v4E+=N17;var V3p=N$xh7[194026];V3p+=M_E;var L4c=r1X;L4c+=e36;var m1o=N$xh7[562024];m1o+=Y_M;var idx=conf[m1o][L4c]({order:V3p,selected:D$_})[v4E]();var page=w7J;if(typeof idx === f5O){var d_f=N$xh7.s6X;d_f+=W3v;d_f+=D7J;d_f+=z_7;var K4G=Z9F;K4G+=g1Y;var A6i=Z9F;A6i+=N17;A6i+=e9T;var o63=r1X;o63+=x5Q;var Q5S=N$xh7[562024];Q5S+=Y_M;var S9y=K8U;S9y+=N$xh7[194026];S9y+=U42;S9y+=N$xh7.Z2m;var k0X=N$xh7[562024];k0X+=Y_M;var pageLen=conf[k0X][S9y][s4$]()[b$C];var pos=conf[Q5S][o63]({order:i0s})[A6i]()[K4G](idx);page=pageLen > w7J?Math[d_f](pos / pageLen):w7J;}conf[D7R][x73](page)[h4D](E3Q);},create:function(conf){var q2O='os';var H18='<tr>';var x8M="ip";var K09="ser-s";var t$I="init.";var u3Y="Sea";var w2p="10";var O3x="ditor";var Y07="optionsPai";var J$u='Label';var V4S="tionsPair";var T7I="dClas";var N9o="isArr";var L5Q="DataTable";var f4I='<div class="DTE_Field_Type_datatable_info">';var w5s="tableClass";var u3L="Bt";var L1n='single';var B3o="elec";var Z1C="0%";var H0D="ote";var z70='<tfoot>';var u4e="onfig";var P$J="rch";var R0m=H8I;R0m+=K09;R0m+=B3o;R0m+=Y_M;var e4G=D7J;e4G+=K8U;e4G+=N$xh7.Z2m;e4G+=N$xh7.G7l;var K6P=D7J;K6P+=N$xh7.G7l;var f$i=M1o;f$i+=u4e;i3m.o$_();var g$o=N$xh7[419025];g$o+=V5J;g$o+=x8M;g$o+=x38;var o2A=u3Y;o2A+=P$J;var w0W=N$xh7.s6X;w0W+=b24;w0W+=u3L;w0W+=K8U;var v8g=p9M;v8g+=t8t;v8g+=N$xh7.Z2m;v8g+=p9M;var v4L=d5J;v4L+=V4S;var c3Z=K9u;c3Z+=a1G;c3Z+=N$xh7[562024];var J9$=t$I;J9$+=N$xh7[562024];J9$+=Y_M;var e3E=D7J;e3E+=N$xh7.G7l;var e9a=w2p;e9a+=Z1C;var D3H=N$xh7[194026];D3H+=N$xh7[562024];D3H+=T7I;D3H+=X5U;var n$2=o2K;n$2+=D7J;n$2+=a0G;var W0E=o56;W0E+=T2A;W0E+=a1p;var Y$0=o56;Y$0+=F0W;Y$0+=x4c;Y$0+=g7w;var k1N=n6T;k1N+=M_I;var A75=S9Z;A75+=Q3b;var D3g=Y07;D3g+=z_7;var _this=this;conf[D3g]=$[Q1k]({label:A75,value:k1N},conf[P$X]);var table=$(Y$0);var container=$(W0E)[a07](table);var side=$(f4I);if(conf[n$2]){var O0a=o2K;O0a+=H0D;O0a+=z_7;var Y6_=o2K;Y6_+=K84;Y6_+=C9P;var u5b=N9o;u5b+=N$xh7[194026];u5b+=x6K;var D26=t7n;D26+=a$k;$(z70)[D26](Array[u5b](conf[Y6_])?$(H18)[a07]($[H8R](conf[O0a],function(str){var Y3e="<t";i3m.L2C();var o7K=Y3e;o7K+=s7p;o7K+=g7w;return $(o7K)[U1f](str);})):conf[P0b])[L2V](table);}var dt=table[D3H](datatable[w5s])[z$Z](e9a)[e3E](J9$,function(e,settings){var J$9='div.dataTables_info';var g8p="div.d";var l5K='div.dataTables_filter';var y1f="uttons";var U_2="t-b";var s3K=N$xh7[194026];s3K+=C4S;s3K+=S5V;var A51=g8p;A51+=U_2;A51+=y1f;var x8F=m04;x8F+=N$xh7[562024];var m71=m04;m71+=N$xh7[562024];var W5e=o9_;i3m.L2C();W5e+=k2P;W5e+=N$xh7[562024];var R5S=Y2_;R5S+=Y_M;var z7H=t0B;z7H+=H1K;var api=new DataTable$3[z7H](settings);var containerNode=$(api[O7b](undefined)[q0a]());DataTable$3[X4c][R5S](api);side[W5e](containerNode[m71](l5K))[a07](containerNode[x8F](A51))[s3K](containerNode[t_f](J$9));})[L5Q]($[c3Z]({buttons:[],columns:[{data:conf[v4L][v8g],title:J$u}],deferRender:D$_,dom:w0W,language:{paginate:{next:h7e,previous:B2J},search:J3K,searchPlaceholder:o2A},lengthChange:E3Q,select:{style:conf[g$o]?q2O:L1n}},conf[f$i]));this[K6P](e4G,function(){i3m.o$_();var Z_6="olumn";var c8_="just";var o8t=m3D;o8t+=c8_;var C71=M1o;C71+=Z_6;C71+=X5U;if(dt[a1L]()){var k3J=h$F;k3J+=s7p;dt[k3J](J3K)[H4u]();}dt[C71][o8t]();});dt[h0w](R0m,function(){i3m.o$_();var S9H=F0W;S9H+=g66;S9H+=x38;_triggerChange($(conf[n5j][S9H]()[q0a]()));});if(conf[y96]){var v$x=D7J;v$x+=N$xh7.G7l;var d4W=N$xh7.Z2m;d4W+=O3x;var N8x=Y_M;N8x+=N$xh7[194026];N8x+=x4c;conf[y96][N8x](dt);conf[d4W][v$x](O3u,function(e,json,data,action){var u0X='refresh';var g8Q="jumpTo";var n9m="dataSourc";var R3s="First";var g4A=w$1;g4A+=g8Q;g4A+=R3s;var P$S=N$xh7.Z2m;P$S+=T2A;P$S+=Y_M;var M9p=Y8T;M9p+=u3q;M9p+=Y_M;M9p+=N$xh7.Z2m;if(action === M9p){var n3b=p9M;n3b+=N$xh7.Z2m;n3b+=h1I;n3b+=N8u;var _loop_1=function(dp){var k6q="lect";var p6D=X5U;p6D+=N$xh7.Z2m;p6D+=k6q;var C7V=r1X;C7V+=e36;C7V+=X5U;dt[C7V](function(idx,d){i3m.L2C();return d === dp;})[p6D]();};for(var _i=w7J,_a=json[u_k];_i < _a[n3b];_i++){var dp=_a[_i];_loop_1(dp);}}else if(action === P$S || action === k2r){var G9y=w$1;G9y+=n9m;G9y+=N$xh7.Z2m;_this[G9y](u0X);}datatable[g4A](conf);});}conf[n5j]=dt;datatable[L09](conf,conf[n$$] || []);return {input:container,side:side};},disable:function(conf){var Q7h=N$xh7.G7l;Q7h+=D7J;Q7h+=N$xh7.G7l;Q7h+=N$xh7.Z2m;var R8O=N$xh7[194026];R8O+=K8U;R8O+=b24;var D_j=m79;D_j+=s7M;D_j+=N$xh7.Z2m;conf[n5j][X4c][D_j](R8O);conf[n5j][e2Y]()[q0a]()[Y8J](I8T,Q7h);},dt:function(conf){var i1d=N$xh7[562024];i1d+=Y_M;i3m.o$_();return conf[i1d];},enable:function(conf){var W$6=C8$;W$6+=D7J;W$6+=j0w;var d9s=N$xh7[562024];d9s+=b24;d9s+=C5F;i3m.o$_();d9s+=R$0;var w_9=M1o;w_9+=o_O;w_9+=b24;w_9+=C$p;var D4b=X4_;D4b+=Y_M;D4b+=V1S;D4b+=X5U;var U8i=N$xh7[562024];U8i+=Y_M;var I1C=M57;I1C+=N$xh7.G7l;I1C+=U42;I1C+=x38;var p09=D7J;p09+=X5U;var l8O=X5U;l8O+=Q3b;l8O+=j3D;var P_O=N$xh7[562024];P_O+=Y_M;conf[P_O][l8O][X7D](conf[T8Q]?p09:I1C);conf[U8i][D4b]()[w_9]()[Y8J](d9s,W$6);},get:function(conf){var F7v="pluck";var E4L="onsPair";var u7b="iple";var L62="opti";var K99="toA";var i4p=N$xh7.r$A;i4p+=G0U;var q$D=J$T;q$D+=u7b;var P_d=K99;P_d+=N32;var w9j=L62;w9j+=E4L;var rows=conf[n5j][y1k]({selected:D$_})[u_k]()[F7v](conf[w9j][Y5g])[P_d]();return conf[B9C] || !conf[q$D]?rows[i4p](conf[B9C] || n47):rows;},set:function(conf,val,localUpdate){var E2c="_jumpToFirst";var A1w="lec";var u8p="strin";var F5w="arator";var e4a="sep";var J90="ultiple";var p9X="deselec";var K7d="spli";var Z9d=l6q;Z9d+=A1w;Z9d+=Y_M;var P4g=N$xh7[562024];i3m.L2C();P4g+=Y_M;var i2M=p9X;i2M+=Y_M;var R3B=N$xh7[562024];R3B+=Y_M;var e3f=X$Z;e3f+=p6h;var p5G=c1w;p5G+=z_7;p5G+=N$xh7[194026];p5G+=x6K;var D2j=N$xh7[419025];D2j+=J90;if(conf[D2j] && conf[B9C] && !Array[p5G](val)){var T_J=e4a;T_J+=F5w;var H3K=K7d;H3K+=Y_M;var J__=u8p;J__+=U42;val=typeof val === J__?val[H3K](conf[T_J]):[];}else if(!Array[e3f](val)){val=[val];}var valueFn=dataGet(conf[P$X][Y5g]);conf[R3B][y1k]({selected:D$_})[i2M]();conf[P4g][y1k](function(idx,data,node){i3m.L2C();return val[b6o](valueFn(data)) !== -c77;})[Z9d]();datatable[E2c](conf);if(!localUpdate){_triggerChange($(conf[n5j][O7b]()[q0a]()));}},tableClass:J3K,update:function(conf,options,append){var v04="_las";var z49="_addO";var X2n="ptio";var w9O=M1o;w9O+=o_O;w9O+=I1J;var G0u=v04;G0u+=Y_M;G0u+=x_G;G0u+=v1p;var g4J=z49;g4J+=X2n;g4J+=d0v;datatable[g4J](conf,options,append);var lastSet=conf[G0u];if(lastSet !== undefined){var n5N=X5U;n5N+=N$xh7.Z2m;n5N+=Y_M;datatable[n5N](conf,lastSet,D$_);}_triggerChange($(conf[n5j][O7b]()[w9O]()));}});var defaults={className:J3K,compare:L_a,data:J3K,def:J3K,entityDecode:D$_,fieldInfo:J3K,getFormatter:L_a,id:J3K,label:J3K,labelInfo:J3K,message:J3K,multiEditable:D$_,name:L_a,nullDefault:E3Q,setFormatter:L_a,submit:D$_,type:B1n};var DataTable$2=$[A5P][N$xh7.Y_7];var Field=(function(){var g2I="ultiIds";var h26="_t";var I0w="multiGet";var P8T="ltiR";var k$R="otyp";var q2u="totype";var t0H="eCla";var k1K="ultiE";var p$0="ssing";var E$P="rototype";var x0V="iV";var m7J="_format";var m$y="oty";var J_k="ers";var a3I="_typeFn";var c_0="setFormatter";var N9s="submitt";var i0p="Fn";var v9S="ormatt";var a4w="prototy";var j7k="multiS";var T7m="eset";var O50="_msg";var R$p="otype";var e$U="protot";var l4u="alueCheck";var m0I="oy";var z0a="host";var l2s="_ty";var y34="proto";var X3w="ulti";var R7W="tiRestore";var g8K="sg";var X$a="multiInfoShown";var i6h="prot";var c4p="labelInfo";var P7O="_errorNode";var v38="compare";var x$1="sses";var t0Y="dita";var E9S="multiValue";var E76="eldIn";var B31="roto";var E4h="tot";var O6m="multiValues";var x9I="ototype";var v3N="show";var W6I=N$xh7.s6X;W6I+=v9S;W6I+=J_k;var P1R=v92;P1R+=E6q;P1R+=N$xh7[194026];P1R+=Y_M;var s2s=e$U;s2s+=c$X;s2s+=N$xh7.Z2m;var W3n=l2s;W3n+=k3z;W3n+=i0p;var z4j=I7o;z4j+=E4h;z4j+=x6K;z4j+=k3z;var u3z=i80;u3z+=x0V;u3z+=l4u;var K94=M$w;K94+=K84;K94+=k$R;K94+=N$xh7.Z2m;var l4r=w$1;l4r+=N$xh7[419025];l4r+=g8K;var g1$=i6h;g1$+=D7J;g1$+=c8S;g1$+=N$xh7.Z2m;var O_4=N9s;O_4+=n8N;var y5h=N$xh7[419025];y5h+=H8I;y5h+=P8T;y5h+=T7m;var t8J=y34;t8J+=Y_M;t8J+=c$X;t8J+=N$xh7.Z2m;var W2K=I7o;W2K+=q2u;var k9m=N$xh7[419025];k9m+=g2I;var A9o=K8U;A9o+=E$P;var r4b=N$xh7[419025];r4b+=k1K;r4b+=t0Y;r4b+=x4c;var A8o=N$xh7[562024];A8o+=N3E;A8o+=z_7;A8o+=m0I;var u_h=I7o;u_h+=Y_M;u_h+=m$y;u_h+=k3z;var n1W=y34;n1W+=m_e;n1W+=k3z;var k0k=K8U;k0k+=r1X;k0k+=q2u;var i7D=o05;i7D+=p9M;var B3X=a4w;B3X+=k3z;var Q$T=X5U;Q$T+=N$xh7.Z2m;Q$T+=Y_M;var q11=i6h;q11+=D7J;q11+=m_e;q11+=k3z;var O2k=w62;O2k+=N$xh7[562024];O2k+=N$xh7.Z2m;var V9t=y34;V9t+=m_e;V9t+=k3z;var V2e=y34;V2e+=c8S;V2e+=N$xh7.Z2m;var l6n=j7k;l6n+=v1p;var C2U=a4w;C2U+=k3z;var A6y=V6M;A6y+=p9M;i3m.L2C();A6y+=R7W;var j19=i6h;j19+=k$R;j19+=N$xh7.Z2m;var B9B=K8U;B9B+=B31;B9B+=c8S;B9B+=N$xh7.Z2m;var F$L=g8I;F$L+=w19;var O8I=b24;O8I+=r70;O8I+=H8I;O8I+=Y_M;var A1z=b24;A1z+=N$xh7.G7l;A1z+=u_O;A1z+=z_7;var G2A=i6h;G2A+=R$p;var t3x=M$w;t3x+=K84;t3x+=D7J;t3x+=S9b;var i00=K2T;i00+=E76;i00+=o2K;var E4s=J3u;E4s+=z_7;var P54=d7z;P54+=Y6c;var O7V=M$w;O7V+=x9I;var P_S=I7o;P_S+=Y_M;P_S+=D7J;P_S+=S9b;var a6P=a4w;a6P+=k3z;var d6R=N$xh7[562024];d6R+=N$xh7.Z2m;d6R+=N$xh7.s6X;var s4z=y34;s4z+=m_e;s4z+=k3z;function Field(options,classes,host){var b6U="g-";var O9P="d-pro";var i4L="sg-messa";var a_W="ms";var u7g="be";var T9h='<div data-dte-e="msg-error" class="';var G4U='<label data-dte-e="label" class="';var A_g="sto";var a5n="msg-mes";var s0h='input-control';var m9d="inputContro";var J22="-valu";var X5d="data-dte-e=";var p_u="tern";var m8X='msg-label';var c6O="field-proc";var X9h='<div data-dte-e="multi-value" class="';var m3Z="cessing\" class=\"";var T4T="-l";var B5U="tiReturn";var C4J="alI1";var H6t="multiRe";var c1B="multiV";var s8Z="n></div>";var U51=" f";var L$7="r=\"";var x1D="valFromD";var k5m="<div data-dte-e=\"input\" class=";var M7S="/l";var w$I="labelI";var c1z="assNam";var A9v='<div data-dte-e="input-control" class="';var v21="<div data-dte-e=";var U_S="\"msg-multi\" class=\"";var q1a='msg-info';var M3w="msg-mu";var T$e='msg-error';var U$D="\" c";var C9Q="iv ";var i2s=" adding field - unknow";var u1S="restore";var l9T="<div data-dte-e=\"f";var J4Q='<div data-dte-e="msg-info" class="';var X7y='<span data-dte-e="multi-info" class="';var n8M="\"msg-label";var n3_="n field type ";var G3y='DTE_Field_';var q6d="\"><span></spa";var z3L="namePrefix";var x9h="Prefix";var d4u='<div data-dte-e="msg-message" class="';var c9b="multiInf";var o1B="abel";var G2C="nfo";var W4p=e9S;W4p+=B5U;var V1G=x3c;V1G+=N$xh7[419025];var W0B=x3c;W0B+=N$xh7[419025];var I$S=c6O;I$S+=N$xh7.Z2m;I$S+=p$0;var h4X=M3w;h4X+=j8Q;var m90=N$xh7[419025];m90+=X3w;m90+=J22;m90+=N$xh7.Z2m;var S5P=S9Z;S5P+=Q3b;var p2L=a5n;p2L+=X5U;p2L+=N$xh7[194026];p2L+=Z0P;var J6M=a_W;J6M+=b6U;J6M+=b24;J6M+=G2C;var a2m=M57;a2m+=N$xh7[562024];a2m+=N$xh7.Z2m;var V7Q=q6d;V7Q+=s8Z;var l5X=l9T;l5X+=Y$O;l5X+=O9P;l5X+=m3Z;var A1O=Z9e;A1O+=u$z;var E8I=K2T;E8I+=J9A;E8I+=n9a;E8I+=o2K;var h2C=e69;h2C+=g7w;var t3m=o56;t3m+=v7e;t3m+=V8m;var u7M=N$xh7[419025];u7M+=i4L;u7M+=Z0P;var L8E=e69;L8E+=g7w;var y7U=H6t;y7U+=A_g;y7U+=z_7;y7U+=N$xh7.Z2m;var Y3u=j33;Y3u+=C9Q;Y3u+=X5d;Y3u+=U_S;var p27=e69;p27+=g7w;var Q56=c9b;Q56+=D7J;var O$e=V3K;O$e+=Y_M;O$e+=x38;var S__=c1B;S__+=R_8;var W43=u$1;W43+=Z9e;W43+=u$z;var r5Q=m9d;r5Q+=p9M;var w_C=e69;w_C+=g7w;var z_$=b24;z_$+=r70;z_$+=H8I;z_$+=Y_M;var I3i=k5m;I3i+=e69;var d00=o56;d00+=M7S;d00+=t8t;d00+=A4p;var V4P=w$I;V4P+=G2C;var K4B=N$xh7[419025];K4B+=g8K;K4B+=T4T;K4B+=o1B;var T7h=v21;T7h+=n8M;T7h+=U$D;T7h+=W_Y;var R$i=p9M;R$i+=N$xh7[194026];R$i+=u7g;R$i+=p9M;var c99=e69;c99+=U51;c99+=D7J;c99+=L$7;var S_I=M1o;S_I+=p9M;S_I+=c1z;S_I+=N$xh7.Z2m;var b8b=Y_M;b8b+=x6K;b8b+=k3z;b8b+=x9h;var R9j=v9U;R9j+=Y6g;var n5o=Y50;n5o+=Y_M;n5o+=N$xh7[194026];var C4a=x1D;C4a+=W9z;var S41=Y50;S41+=F0W;var Q7Q=N$xh7.G7l;Q7Q+=N$xh7[194026];Q7Q+=N$xh7[419025];Q7Q+=N$xh7.Z2m;var z8k=Y_M;z8k+=x6K;z8k+=K8U;z8k+=N$xh7.Z2m;var I6Q=N$xh7.Z2m;I6Q+=t6B;I6Q+=Y_M;I6Q+=a$k;var h$9=V6M;h$9+=p9M;h$9+=V3K;var y7v=Z9F;y7v+=p_u;y7v+=C4J;y7v+=e6M;var that=this;var multiI18n=host[y7v]()[h$9];var opts=$[I6Q](D$_,{},Field[d8L],options);if(!Editor[w94][opts[z8k]]){var D66=W51;D66+=i2s;D66+=n3_;throw new Error(D66 + opts[S9b]);}this[X5U]={classes:classes,host:host,multiIds:[],multiValue:E3Q,multiValues:{},name:opts[Q7Q],opts:opts,processing:E3Q,type:Editor[w94][opts[S9b]]};if(!opts[Z33]){opts[Z33]=G3y + opts[y5V];}if(opts[S41] === J3K){var V$C=Z6b;V$C+=N$xh7[419025];V$C+=N$xh7.Z2m;var m9j=N$xh7[562024];m9j+=N$xh7[194026];m9j+=F0W;opts[m9j]=opts[V$C];}this[C4a]=function(d){var n8I=Y6c;n8I+=b24;n8I+=Y_M;i3m.o$_();n8I+=G1H;var c3A=N$xh7[562024];c3A+=d3Q;c3A+=N$xh7[194026];return dataGet(opts[c3A])(d,n8I);};this[X7U]=dataSet(opts[n5o]);var template=$(w6y + classes[R9j] + u2y + classes[b8b] + opts[S9b] + u2y + classes[z3L] + opts[y5V] + u2y + opts[S_I] + e6e + G4U + classes[g8I] + c99 + Editor[J3R](opts[Z33]) + e6e + opts[R$i] + T7h + classes[K4B] + e6e + opts[V4P] + n51 + d00 + I3i + classes[z_$] + w_C + A9v + classes[r5Q] + W43 + X9h + classes[S__] + e6e + multiI18n[O$e] + X7y + classes[Q56] + p27 + multiI18n[s4$] + L18 + n51 + Y3u + classes[y7U] + L8E + multiI18n[u1S] + n51 + T9h + classes[T$e] + F07 + d4u + classes[u7M] + e6e + opts[N64] + t3m + J4Q + classes[q1a] + h2C + opts[E8I] + n51 + A1O + l5X + classes[l9B] + V7Q + n51);var input=this[a3I](m38,opts);var side=L_a;if(input && input[a2m]){var V9F=X5U;V9F+=b24;V9F+=v$T;side=input[V9F];input=input[G9c];}if(input !== L_a){var l$d=d_X;l$d+=K8U;l$d+=a1G;l$d+=N$xh7[562024];el(s0h,template)[l$d](input);}else {var u_N=N$xh7.G7l;u_N+=h0w;u_N+=N$xh7.Z2m;var X2K=k5q;X2K+=x6K;template[Y8J](X2K,u_N);}this[x0b]={container:template,fieldError:el(T$e,template),fieldInfo:el(J6M,template),fieldMessage:el(p2L,template),inputControl:el(s0h,template),label:el(S5P,template)[a07](side),labelInfo:el(m8X,template),multi:el(m90,template),multiInfo:el(O6O,template),multiReturn:el(h4X,template),processing:el(I$S,template)};this[W0B][A1c][h0w](S9g,function(){var l2F="multiEdit";var X$f=R1t;X$f+=D7J;X$f+=N$xh7.G7l;X$f+=P6W;var V9W=s6K;V9W+=N$xh7[562024];var V0X=a8j;V0X+=p9M;V0X+=X8B;var Y6H=l2F;Y6H+=n8N;if(that[X5U][r0$][Y6H] && !template[V0X](classes[V9W]) && opts[S9b] !== X$f){var a$7=o05;a$7+=p9M;that[a$7](J3K);that[p5c]();}});this[V1G][W4p][h0w](S9g,function(){var z6V="multiRestore";i3m.L2C();that[z6V]();});$[A1F](this[X5U][S9b],function(name,fn){if(typeof fn === N$xh7[35143] && that[name] === undefined){that[name]=function(){var d$T="un";var o20="rototyp";var G_C="ift";var d0x=d$T;d0x+=L0a;d0x+=G_C;var T8D=I1q;T8D+=p9M;var d$J=X5U;d$J+=p9M;d$J+=b24;d$J+=p39;var r62=K8U;r62+=o20;r62+=N$xh7.Z2m;var args=Array[r62][d$J][T8D](arguments);args[d0x](name);var ret=that[a3I][N9H](that,args);return ret === undefined?that:ret;};}});}Field[s4z][d6R]=function(set){var U2A="aul";i3m.o$_();var A41="ef";var f5l=N$xh7[562024];f5l+=A41;var opts=this[X5U][r0$];if(set === undefined){var f2Q=W9U;f2Q+=U2A;f2Q+=Y_M;var P6w=N$xh7[562024];P6w+=N$xh7.Z2m;P6w+=x3G;P6w+=V5J;var def=opts[P6w] !== undefined?opts[f2Q]:opts[W9U];return typeof def === N$xh7[35143]?def():def;}opts[f5l]=set;return this;};Field[a6P][s6K]=function(){var t_s='disable';var q48="ontai";var L2u=d_E;L2u+=Y6c;var y7h=M1o;y7h+=q48;y7h+=G6T;i3m.o$_();y7h+=z_7;var g50=N$xh7[562024];g50+=D7J;g50+=N$xh7[419025];this[g50][y7h][L2m](this[X5U][S6t][L2u]);this[a3I](t_s);return this;};Field[U1C][W_x]=function(){var w8h="pare";var t2Q="tai";var Q57=w62;Q57+=G6T;var m7b=e8B;m7b+=X5U;var I4t=p9M;I4t+=J_N;I4t+=s7p;var m6_=f27;m6_+=A93;var j$2=w8h;j$2+=m28;j$2+=X5U;var Z$P=A8T;Z$P+=N$xh7.G7l;Z$P+=t2Q;Z$P+=C$p;var z1W=N$xh7[562024];z1W+=J3x;var container=this[z1W][Z$P];return container[j$2](m6_)[I4t] && container[m7b](I8T) !== Q57?D$_:E3Q;};Field[P_S][a6L]=function(toggle){var J0p='enable';var P1P=e$V;P1P+=L5j;P1P+=A3E;var R4F=M7u;R4F+=t0H;R4F+=m54;var v7n=x3c;v7n+=N$xh7[419025];if(toggle === void w7J){toggle=D$_;}if(toggle === E3Q){return this[s6K]();}this[v7n][q0a][R4F](this[X5U][P1P][a0b]);this[a3I](J0p);return this;};Field[O7V][P54]=function(){var l1r=M1o;l1r+=z0W;l1r+=x$1;return this[x0b][q0a][x8h](this[X5U][l1r][a0b]) === E3Q;};Field[U1C][E4s]=function(msg,fn){var B1U='errorMessage';var p6X=j97;p6X+=i2n;i3m.L2C();p6X+=z_7;p6X+=G1H;var classes=this[X5U][S6t];if(msg){var p1e=C9P;p1e+=z_7;p1e+=D7J;p1e+=z_7;var M$F=N$xh7[562024];M$F+=D7J;M$F+=N$xh7[419025];this[M$F][q0a][L2m](classes[p1e]);}else {var B1F=C9P;B1F+=z_7;B1F+=D7J;B1F+=z_7;var D5W=M7u;D5W+=t0H;D5W+=X5U;D5W+=X5U;var d_1=N$xh7[562024];d_1+=D7J;d_1+=N$xh7[419025];this[d_1][q0a][D5W](classes[B1F]);}this[a3I](B1U,msg);return this[O50](this[x0b][p6X],msg,fn);};Field[U1C][i00]=function(msg){var R0j="fieldInfo";var G32=N$xh7[562024];G32+=D7J;G32+=N$xh7[419025];var i2Q=w$1;i2Q+=N$xh7[419025];i2Q+=X5U;i2Q+=U42;return this[i2Q](this[G32][R0j],msg);};Field[t3x][A56]=function(){var e2h="ltiVa";var i8Q="Ids";var m1i=A1c;m1i+=i8Q;var J35=V6M;J35+=e2h;J35+=I9g;J35+=N$xh7.Z2m;return this[X5U][J35] && this[X5U][m1i][b$C] !== c77;};Field[G2A][A1z]=function(){var a3K=N$xh7.Z2m;a3K+=D6H;var w0K=e$V;w0K+=N$xh7[194026];w0K+=x$1;i3m.L2C();return this[x0b][q0a][x8h](this[X5U][w0K][a3K]);};Field[U1C][O8I]=function(){var h2R="put, sel";var W4P=" textarea";var z7a="ontain";var N5l="ect,";var M2C=M1o;M2C+=z7a;M2C+=C9P;var t7l=N$xh7[562024];t7l+=D7J;t7l+=N$xh7[419025];var V04=Z9F;V04+=h2R;V04+=N5l;V04+=W4P;var F6_=b24;F6_+=N$xh7.G7l;F6_+=U62;F6_+=Y_M;var L4F=G46;L4F+=Y_M;return this[X5U][S9b][L4F]?this[a3I](F6_):$(V04,this[t7l][M2C]);};Field[U1C][p5c]=function(){var J7W=", select, textarea";var F90="ocus";var b0X="_typ";var a6b="eF";var A84=N$xh7.s6X;A84+=D7J;A84+=M1o;A84+=X7L;var F2J=Y_M;F2J+=x6K;F2J+=k3z;if(this[X5U][F2J][A84]){var x2G=b0X;x2G+=a6b;x2G+=N$xh7.G7l;this[x2G](e8n);}else {var O39=N$xh7.s6X;O39+=F90;var z73=x3c;z73+=N$xh7[419025];var y6G=G9c;y6G+=J7W;$(y6G,this[z73][q0a])[O39]();}return this;};Field[U1C][L6w]=function(){var E7u="ypeF";var d6a="etForm";var N79="sMultiVal";var f9l=U42;f9l+=d6a;f9l+=t0x;f9l+=C9P;var S$a=D7J;S$a+=K8U;S$a+=Y_M;S$a+=X5U;var k$J=Z0P;k$J+=Y_M;var q8z=h26;q8z+=E7u;q8z+=N$xh7.G7l;var t3B=b24;t3B+=N79;t3B+=H8I;t3B+=N$xh7.Z2m;if(this[t3B]()){return undefined;}return this[m7J](this[q8z](k$J),this[X5U][S$a][f9l]);};Field[U1C][f0B]=function(animate){var V14="eUp";var l5z="slideUp";var x2t=x3c;x2t+=N$xh7[419025];var el=this[x2t][q0a];if(animate === undefined){animate=D$_;}if(this[X5U][z0a][j0P]() && animate && $[S_R][l5z]){var D8H=n0f;D8H+=Z33;D8H+=V14;el[D8H]();}else {var l1D=N$xh7.G7l;l1D+=D7J;l1D+=N$xh7.G7l;l1D+=N$xh7.Z2m;el[Y8J](I8T,l1D);}return this;};Field[U1C][g8I]=function(str){var D_P="appen";var e4u="bel";var Y6i=D_P;Y6i+=N$xh7[562024];var k0g=v$T;i3m.L2C();k0g+=R3R;var f2P=p9M;f2P+=N$xh7[194026];f2P+=e4u;var label=this[x0b][f2P];var labelInfo=this[x0b][c4p][k0g]();if(str === undefined){var f7v=s7p;f7v+=z_A;f7v+=p9M;return label[f7v]();}label[U1f](str);label[Y6i](labelInfo);return this;};Field[U1C][F$L]=function(msg){return this[O50](this[x0b][c4p],msg);};Field[U1C][N64]=function(msg,fn){var y2c="fieldMes";var h_t=y2c;h_t+=X5U;h_t+=T0E;var j51=N$xh7[562024];j51+=D7J;j51+=N$xh7[419025];return this[O50](this[j51][h_t],msg,fn);};Field[B9B][I0w]=function(id){var X4n="Value";var z5W="tiIds";var g71="ultiVa";var o_B="isMulti";var f5f="lues";var a7Z=o_B;a7Z+=X4n;var u9c=N$xh7[419025];u9c+=C51;u9c+=z5W;var x47=N$xh7[419025];x47+=g71;x47+=f5f;var value;var multiValues=this[X5U][x47];var multiIds=this[X5U][u9c];var isMultiValue=this[a7Z]();if(id === undefined){var v7r=N8N;v7r+=y9w;var fieldVal=this[n6T]();value={};for(var _i=w7J,multiIds_1=multiIds;_i < multiIds_1[v7r];_i++){var multiId=multiIds_1[_i];value[multiId]=isMultiValue?multiValues[multiId]:fieldVal;}}else if(isMultiValue){value=multiValues[id];}else {value=this[n6T]();}return value;};Field[j19][A6y]=function(){var s3s="ultiV";var c3O=N$xh7[419025];c3O+=s3s;i3m.L2C();c3O+=R_8;this[X5U][c3O]=D$_;this[n_s]();};Field[C2U][l6n]=function(id,val,recalc){var e$G="iId";var R56=J$T;R56+=e$G;R56+=X5U;i3m.L2C();if(recalc === void w7J){recalc=D$_;}var that=this;var multiValues=this[X5U][O6m];var multiIds=this[X5U][R56];if(val === undefined){val=id;id=undefined;}var set=function(idSrc,valIn){var j5c="Ar";i3m.L2C();var d2Y=d5J;d2Y+=Y_M;d2Y+=X5U;var N5i=Z9F;N5i+=j5c;N5i+=V7k;if($[N5i](idSrc,multiIds) === -c77){multiIds[T7B](idSrc);}multiValues[idSrc]=that[m7J](valIn,that[X5U][d2Y][c_0]);};if($[j4S](val) && id === undefined){$[A1F](val,function(idSrc,innerVal){i3m.o$_();set(idSrc,innerVal);});}else if(id === undefined){var o5A=N$xh7.Z2m;o5A+=N$xh7[194026];o5A+=M1o;o5A+=s7p;$[o5A](multiIds,function(i,idSrc){set(idSrc,val);});}else {set(id,val);}this[X5U][E9S]=D$_;if(recalc){this[n_s]();}return this;};Field[V2e][y5V]=function(){var s9a=D7J;s9a+=K8U;s9a+=Y_M;i3m.L2C();s9a+=X5U;return this[X5U][s9a][y5V];};Field[V9t][O2k]=function(){return this[x0b][q0a][w7J];};Field[U1C][p$i]=function(){i3m.o$_();return this[X5U][r0$][p$i];};Field[q11][l9B]=function(set){var W8m="lock";var G6H="internalEvent";var o_P="g-fiel";var d8I=y1U;d8I+=N$xh7.G7l;d8I+=o_P;d8I+=N$xh7[562024];var N7b=s7p;N7b+=u_G;N7b+=Y_M;var y$h=w62;y$h+=G6T;var R2v=g66;R2v+=W8m;var t3a=M1o;t3a+=X5U;t3a+=X5U;var J9e=M$w;J9e+=s1g;J9e+=N$xh7.Z2m;J9e+=p$0;var y2U=x3c;y2U+=N$xh7[419025];if(set === undefined){return this[X5U][l9B];}this[y2U][J9e][t3a](I8T,set?R2v:y$h);this[X5U][l9B]=set;i3m.o$_();this[X5U][N7b][G6H](d8I,[set]);return this;};Field[U1C][Q$T]=function(val,multiCheck){var Y1V="format";i3m.L2C();var d_h="multiVal";var X_w="entityD";var Z$c="peFn";var y9W=X_w;y9W+=N$xh7.Z2m;y9W+=A8T;y9W+=v$T;var O2J=d_h;O2J+=M_I;if(multiCheck === void w7J){multiCheck=D$_;}var decodeFn=function(d){var Y6W='\n';var p3a="epla";var A5l='"';var G3r="ace";var L92="trin";var r43='£';var Z18='\'';var U8q=G6V;U8q+=O5f;var l9K=q2h;l9K+=K8U;l9K+=z0W;l9K+=p39;var q8w=G6V;q8w+=z0W;q8w+=M1o;q8w+=N$xh7.Z2m;var d6Y=z_7;d6Y+=p3a;d6Y+=p39;var W_f=z_7;W_f+=N$xh7.Z2m;W_f+=a87;W_f+=G3r;var O8S=X5U;O8S+=L92;O8S+=U42;return typeof d !== O8S?d:d[e$P](/&gt;/g,h7e)[W_f](/&lt;/g,B2J)[d6Y](/&amp;/g,o3I)[q8w](/&quot;/g,A5l)[e$P](/&#163;/g,r43)[l9K](/&#39;/g,Z18)[U8q](/&#10;/g,Y6W);};this[X5U][O2J]=E3Q;var decode=this[X5U][r0$][y9W];if(decode === undefined || decode === D$_){if(Array[U1F](val)){for(var i=w7J,ien=val[b$C];i < ien;i++){val[i]=decodeFn(val[i]);}}else {val=decodeFn(val);}}if(multiCheck === D$_){var x9k=X5U;x9k+=v1p;var o$7=h26;o$7+=x6K;o$7+=Z$c;var y4v=w$1;y4v+=Y1V;val=this[y4v](val,this[X5U][r0$][c_0]);this[o$7](x9k,val);this[n_s]();}else {var P_0=X5U;P_0+=N$xh7.Z2m;P_0+=Y_M;this[a3I](P_0,val);}return this;};Field[B3X][v3N]=function(animate,toggle){var V6W="conta";var G7N="eDown";var h3w="slideDown";var Y4w=T2A;Y4w+=C5F;Y4w+=R$0;var y_v=V6W;y_v+=b24;y_v+=C$p;i3m.o$_();var j0b=x3c;j0b+=N$xh7[419025];if(animate === void w7J){animate=D$_;}if(toggle === void w7J){toggle=D$_;}if(toggle === E3Q){return this[f0B](animate);}var el=this[j0b][y_v];if(this[X5U][z0a][Y4w]() && animate && $[S_R][h3w]){var f6o=n0f;f6o+=b24;f6o+=N$xh7[562024];f6o+=G7N;el[f6o]();}else {el[Y8J](I8T,J3K);;}return this;};Field[U1C][W5n]=function(options,append){var s3Z="upd";var U5q='update';var e$2=s3Z;e$2+=j0Q;var E1Q=Y_M;E1Q+=x6K;E1Q+=K8U;E1Q+=N$xh7.Z2m;if(append === void w7J){append=E3Q;}if(this[X5U][E1Q][e$2]){var F9o=w$1;F9o+=c8S;F9o+=N$xh7.Z2m;F9o+=i0p;this[F9o](U5q,options,append);}return this;};Field[U1C][i7D]=function(val){var F_0=X5U;F_0+=N$xh7.Z2m;F_0+=Y_M;var B0c=U42;B0c+=N$xh7.Z2m;B0c+=Y_M;return val === undefined?this[B0c]():this[F_0](val);};Field[k0k][v38]=function(value,original){var compare=this[X5U][r0$][v38] || deepCompare;i3m.L2C();return compare(value,original);};Field[n1W][w5r]=function(){var b8p=N$xh7[562024];b8p+=d3Q;b8p+=N$xh7[194026];return this[X5U][r0$][b8p];};Field[u_h][A8o]=function(){var k0e='destroy';var f0c=B0X;f0c+=A72;var W1v=N$xh7[562024];W1v+=D7J;W1v+=N$xh7[419025];this[W1v][q0a][f0c]();this[a3I](k0e);i3m.o$_();return this;};Field[U1C][r4b]=function(){var D5i="multiEditable";return this[X5U][r0$][D5i];};Field[A9o][k9m]=function(){var H90="iI";var q79=J$T;q79+=H90;i3m.o$_();q79+=E_o;return this[X5U][q79];};Field[W2K][X$a]=function(show){var c0B="ltiInf";var L0V=N$xh7.G7l;L0V+=h0w;L0V+=N$xh7.Z2m;var K4t=g66;K4t+=W3v;K4t+=M1o;K4t+=O0A;var c9Y=V6M;c9Y+=c0B;c9Y+=D7J;this[x0b][c9Y][Y8J]({display:show?K4t:L0V});};Field[t8J][y5h]=function(){this[X5U][a2T]=[];this[X5U][O6m]={};};Field[U1C][O_4]=function(){var f6B=X5U;f6B+=J78;f6B+=N$xh7[419025];f6B+=k6Q;return this[X5U][r0$][f6B];};Field[g1$][l4r]=function(el,msg,fn){var h_V="internalSettings";var W1x="vi";var D6B="Up";var X0i="rent";var N1U="sible";var F4Q="imate";var Q$9="ideDown";var B5G=V0O;B5G+=F4Q;var n7a=N$xh7.s6X;n7a+=N$xh7.G7l;var W0e=d2b;W0e+=W1x;W0e+=N1U;var l67=z21;l67+=X0i;if(msg === undefined){return el[U1f]();}if(typeof msg === N$xh7[35143]){var l6F=F0W;l6F+=g66;l6F+=x38;var editor=this[X5U][z0a];msg=msg(editor,new DataTable$2[J36](editor[h_V]()[l6F]));}if(el[l67]()[X$Z](W0e) && $[n7a][B5G]){el[U1f](msg);if(msg){var x6F=n0f;x6F+=Q$9;el[x6F](fn);;}else {var v_6=i_k;v_6+=N$xh7[562024];v_6+=N$xh7.Z2m;v_6+=D6B;el[v_6](fn);}}else {var m2E=N$xh7.G7l;m2E+=D7J;m2E+=N$xh7.G7l;m2E+=N$xh7.Z2m;var f3I=M1o;f3I+=X5U;f3I+=X5U;el[U1f](msg || J3K)[f3I](I8T,msg?Y26:m2E);if(fn){fn();}}return this;};Field[K94][u3z]=function(){var W8F="eturn";var L9R="tiIn";var B4N="multiNoEdit";var z7x="intern";var t$7="toggleClass";var b$5="inputControl";i3m.o$_();var W36="alMultiInfo";var q20="multiR";var n1j="Mu";var C6z="iE";var i02="putControl";var V_U="internalI18n";var s9r="Multi";var b2c=z7x;b2c+=W36;var p9K=s7p;p9K+=u_G;p9K+=Y_M;var k57=M1o;k57+=p9M;k57+=X8B;k57+=e9T;var o$$=w62;o$$+=n1j;o$$+=j8Q;var z1k=e9S;z1k+=L9R;z1k+=N$xh7.s6X;z1k+=D7J;var x$6=e9S;x$6+=V3K;var v49=w62;v49+=N$xh7.G7l;v49+=N$xh7.Z2m;var n$m=N8N;n$m+=U42;n$m+=Y_M;n$m+=s7p;var i0K=q20;i0K+=W8F;var r_t=X$Z;r_t+=s9r;r_t+=n2t;r_t+=N$xh7.Z2m;var B4k=J$T;B4k+=C6z;B4k+=T2A;B4k+=O7b;var last;var ids=this[X5U][a2T];var values=this[X5U][O6m];var isMultiValue=this[X5U][E9S];var isMultiEditable=this[X5U][r0$][B4k];var val;var different=E3Q;if(ids){var r15=x38;r15+=s8z;for(var i=w7J;i < ids[r15];i++){val=values[ids[i]];if(i > w7J && !deepCompare(val,last)){different=D$_;break;}last=val;}}if(different && isMultiValue || !isMultiEditable && this[r_t]()){var q86=N$xh7[419025];q86+=X3w;var K9O=N$xh7[562024];K9O+=D7J;K9O+=N$xh7[419025];var z9D=M1o;z9D+=X5U;z9D+=X5U;var D5M=N$xh7[562024];D5M+=D7J;D5M+=N$xh7[419025];this[D5M][b$5][z9D]({display:D6F});this[K9O][q86][Y8J]({display:Y26});}else {var I0q=V6M;I0q+=j8Q;var N8Q=N$xh7[562024];N8Q+=D7J;N8Q+=N$xh7[419025];var h5Z=e8B;h5Z+=X5U;var Q9w=Z9F;Q9w+=i02;this[x0b][Q9w][h5Z]({display:Y26});this[N8Q][I0q][Y8J]({display:D6F});if(isMultiValue && !different){var s7K=X5U;s7K+=N$xh7.Z2m;s7K+=Y_M;this[s7K](last,E3Q);}}this[x0b][i0K][Y8J]({display:ids && ids[n$m] > c77 && different && !isMultiValue?Y26:v49});var i18n=this[X5U][z0a][V_U]()[x$6];this[x0b][z1k][U1f](isMultiEditable?i18n[s4$]:i18n[o$$]);this[x0b][A1c][t$7](this[X5U][k57][B4N],!isMultiEditable);this[X5U][p9K][b2c]();return D$_;};Field[z4j][W3n]=function(name){var b$G="unshift";var E$S="ho";var K54=N8N;K54+=i_e;K54+=s7p;var args=[];for(var _i=c77;_i < arguments[K54];_i++){args[_i - c77]=arguments[_i];}args[b$G](this[X5U][r0$]);var fn=this[X5U][S9b][name];if(fn){var q5r=E$S;q5r+=m79;return fn[N9H](this[X5U][q5r],args);}};Field[s2s][P7O]=function(){i3m.o$_();var V9L="ldEr";var n9S=K2T;n9S+=N$xh7.Z2m;n9S+=V9L;n9S+=l9f;return this[x0b][n9S];};Field[U1C][P1R]=function(val,formatter){var s5L="ormatters";var Q6W="shift";if(formatter){var j9B=s7p;j9B+=D7J;j9B+=X5U;j9B+=Y_M;if(Array[U1F](formatter)){var e3R=N$xh7.s6X;e3R+=s5L;var args=formatter[N13]();var name_1=args[Q6W]();formatter=Field[e3R][name_1][N9H](this,args);}return formatter[q8Y](this[X5U][j9B],val,this);}return val;};Field[d8L]=defaults;Field[W6I]={};return Field;})();var button={action:L_a,className:L_a,tabIndex:w7J,text:L_a};var displayController={close:function(){},init:function(){},node:function(){},open:function(){}};var DataTable$1=$[D4W][x7d];var apiRegister=DataTable$1[u6C][S7$];function _getInst(api){var z2v="_ed";var j4e=z2v;j4e+=k6Q;j4e+=G1H;var Z$n=D7J;Z$n+=D$3;Z$n+=N$xh7.G7l;Z$n+=k6Q;var j80=Z6h;j80+=m6m;var ctx=api[j80][w7J];return ctx[Z$n][y96] || ctx[j4e];}function _setBasic(inst,opts,type,plural){var S5r=/%d/;var L_h="onf";var q5P="messag";var d_o="irm";var K5W="itle";var B2$="_b";var m5R=l5H;m5R+=V1S;m5R+=X5U;if(!opts){opts={};}if(opts[m5R] === undefined){var K6U=B2$;K6U+=L5j;K6U+=b24;K6U+=M1o;opts[e2Y]=K6U;}if(opts[R7J] === undefined){var W$l=Y_M;W$l+=K5W;var v9K=b24;v9K+=Z9M;v9K+=N$xh7.G7l;opts[R7J]=inst[v9K][type][W$l];}if(opts[N64] === undefined){var x$d=M7u;x$d+=N$xh7.Z2m;if(type === x$d){var U5R=M1o;U5R+=L_h;U5R+=d_o;var confirm_1=inst[L_E][type][U5R];opts[N64]=plural !== c77?confirm_1[w$1][e$P](S5r,plural):confirm_1[R_c];}else {var Q7G=q5P;Q7G+=N$xh7.Z2m;opts[Q7G]=J3K;}}return opts;}apiRegister(H1V,function(){return _getInst(this);});apiRegister(B5C,function(opts){var I86=Y8T;I86+=u3q;I86+=Y_M;i3m.L2C();I86+=N$xh7.Z2m;var M2G=e2o;M2G+=N$xh7[194026];M2G+=Y_M;M2G+=N$xh7.Z2m;var inst=_getInst(this);inst[M2G](_setBasic(inst,opts,I86));return this;});apiRegister(x4t,function(opts){var U$M=Y6c;U$M+=b24;U$M+=Y_M;var F93=C3o;F93+=Y_M;var inst=_getInst(this);inst[F93](this[w7J][w7J],_setBasic(inst,opts,U$M));return this;});apiRegister(N$o,function(opts){var a_z=Y6c;a_z+=k6Q;var f2_=Y6c;f2_+=k6Q;var inst=_getInst(this);inst[f2_](this[w7J],_setBasic(inst,opts,a_z));return this;});apiRegister(p_O,function(opts){var W9i="move";var h7i=q2h;h7i+=y0m;h7i+=q$X;var g2_=z_7;g2_+=N$xh7.Z2m;g2_+=W9i;var inst=_getInst(this);inst[g2_](this[w7J][w7J],_setBasic(inst,opts,h7i,c77));return this;});apiRegister(e0H,function(opts){var X98=x38;X98+=h1I;X98+=N8u;var Q4J=M7u;Q4J+=N$xh7.Z2m;var inst=_getInst(this);inst[Q4J](this[w7J],_setBasic(inst,opts,k2r,this[w7J][X98]));return this;});apiRegister(p4y,function(type,opts){if(!type){type=C9f;}else if($[j4S](type)){var g$P=Z9F;g$P+=p9M;g$P+=Z9F;g$P+=N$xh7.Z2m;opts=type;type=g$P;}i3m.o$_();_getInst(this)[type](this[w7J][w7J],opts);return this;});apiRegister(X2y,function(opts){i3m.o$_();_getInst(this)[f5w](this[w7J],opts);return this;});apiRegister(M0N,file);apiRegister(G2f,files);$(document)[h0w](B9a,function(e,ctx,json){var Y3I="namespace";var H3_=w6H;H3_+=e9T;i3m.L2C();var K2X=N$xh7[562024];K2X+=Y_M;if(e[Y3I] !== K2X){return;}if(json && json[H3_]){var X8F=N$xh7.Z2m;X8F+=x3E;X8F+=s7p;$[X8F](json[j$v],function(name,filesIn){var s5K=K9u;s5K+=N$xh7.Z2m;s5K+=S5V;if(!Editor[j$v][name]){var A1a=K2T;A1a+=x38;A1a+=X5U;Editor[A1a][name]={};}$[s5K](Editor[j$v][name],filesIn);});}});var _buttons=$[S_R][N$xh7.Y_7][K9u][k7R];$[r3G](_buttons,{create:{action:function(e,dt,node,config){var H2$="rocessing";var v$R="formM";var g8a="B";var q1T="preOpe";var V96="ess";var D6G=b24;D6G+=Z9M;D6G+=N$xh7.G7l;var C_i=v$R;C_i+=V96;C_i+=T0E;var z7m=A_z;z7m+=g8a;z7m+=b9j;z7m+=d0v;var a_i=q1T;a_i+=N$xh7.G7l;var b$l=K8U;b$l+=H2$;var z3w=N$xh7.Z2m;z3w+=o27;z3w+=D7J;z3w+=z_7;var that=this;var editor=config[z3w];this[b$l](D$_);editor[f8i](a_i,function(){that[l9B](E3Q);})[g36]($[Q1k]({buttons:config[z7m],message:config[C_i] || editor[D6G][g36][N64],nest:D$_,title:config[A78] || editor[L_E][g36][R7J]},config[E6Q]));},className:c0W,editor:L_a,formButtons:{action:function(e){var J4N=H9o;J4N+=Y_M;this[J4N]();},text:function(editor){var h3X=M1o;h3X+=z_7;h3X+=d32;return editor[L_E][h3X][i6q];}},formMessage:L_a,formOptions:{},formTitle:L_a,text:function(dt,node,config){var S$f='buttons.create';var O_7=g66;O_7+=A1t;i3m.o$_();O_7+=h0w;var t7J=M1o;t7J+=z_7;t7J+=u3q;t7J+=M3d;var k1t=C3o;k1t+=f6R;return dt[L_E](S$f,config[k1t][L_E][t7J][O_7]);}},createInline:{action:function(e,dt,node,config){var s_4="mOption";var T0z="nlineCreate";var g$n=o2K;g$n+=z_7;g$n+=s_4;g$n+=X5U;var W8R=b24;W8R+=T0z;var k6K=Y6c;k6K+=b24;k6K+=f6R;i3m.L2C();config[k6K][W8R](config[l3U],config[g$n]);},className:n1i,editor:L_a,formButtons:{action:function(e){var m1r=f5v;m1r+=N$xh7[419025];i3m.o$_();m1r+=b24;m1r+=Y_M;this[m1r]();},text:function(editor){return editor[L_E][g36][i6q];}},formOptions:{},position:A7m,text:function(dt,node,config){var k_5="uttons.crea";var n5L=m0i;n5L+=D7J;n5L+=N$xh7.G7l;var m0s=b24;m0s+=Z9M;m0s+=N$xh7.G7l;var D6Q=Y6c;D6Q+=z02;var H7_=g66;H7_+=k_5;H7_+=M3d;var K1Y=b24;K1Y+=Z9M;K1Y+=N$xh7.G7l;return dt[K1Y](H7_,config[D6Q][m0s][g36][n5L]);}},edit:{action:function(e,dt,node,config){var s1M="formButto";var n59="Title";var L1l="dexes";var o$z=Y6c;o$z+=b24;o$z+=Y_M;var Y3z=b24;Y3z+=N$xh7[28411];Y3z+=e6M;var D_6=a9A;D_6+=N$xh7[419025];D_6+=n59;var X$8=b24;X$8+=N$xh7[28411];X$8+=v3I;X$8+=N$xh7.G7l;var C31=s1M;C31+=d0v;var z2M=C4O;z2M+=S5V;var D7d=K8U;D7d+=L3m;D7d+=a1G;var o9d=h0w;i3m.o$_();o9d+=N$xh7.Z2m;var z2j=G4$;z2j+=e9T;z2j+=O2x;var q6O=Y7q;q6O+=N8u;var I6r=b24;I6r+=N$xh7.G7l;I6r+=L1l;var j8J=z_7;j8J+=D7J;j8J+=e36;j8J+=X5U;var P56=N$xh7.Z2m;P56+=N$xh7[562024];P56+=b24;P56+=f6R;var that=this;var editor=config[P56];var rows=dt[j8J]({selected:D$_})[c95]();var columns=dt[K6b]({selected:D$_})[I6r]();var cells=dt[S2W]({selected:D$_})[c95]();var items=columns[b$C] || cells[q6O]?{cells:cells,columns:columns,rows:rows}:rows;this[z2j](D$_);editor[o9d](D7d,function(){i3m.L2C();that[l9B](E3Q);})[m2i](items,$[z2M]({buttons:config[C31],message:config[W4Q] || editor[X$8][m2i][N64],nest:D$_,title:config[D_6] || editor[Y3z][o$z][R7J]},config[E6Q]));},className:u_o,editor:L_a,extend:D4l,formButtons:{action:function(e){i3m.o$_();this[i6q]();},text:function(editor){var f7m=X5U;f7m+=b82;var n$e=N$xh7.Z2m;n$e+=N$xh7[562024];n$e+=b24;n$e+=Y_M;var B8v=b24;B8v+=N$xh7[28411];B8v+=v3I;B8v+=N$xh7.G7l;return editor[B8v][n$e][f7m];}},formMessage:L_a,formOptions:{},formTitle:L_a,text:function(dt,node,config){var Y3n="s.edit";var i7R=l5H;i7R+=V1S;var c$W=D72;c$W+=v3I;c$W+=N$xh7.G7l;var I2R=Y6c;I2R+=b24;I2R+=X4b;I2R+=z_7;var s6j=r4Q;s6j+=Y3n;var f8B=b24;f8B+=N$xh7[28411];f8B+=e6M;return dt[f8B](s6j,config[I2R][c$W][m2i][i7R]);}},remove:{action:function(e,dt,node,config){var v8E="essi";var m4_="formButtons";var i3c='preOpen';var W8B=Y_M;W8B+=b24;W8B+=Y_M;W8B+=x38;var p8r=B0X;p8r+=A72;var Q4g=b24;Q4g+=Z9M;Q4g+=N$xh7.G7l;var w6V=l9g;w6V+=N$xh7[562024];var D3Q=M$w;D3Q+=s1g;D3Q+=v8E;D3Q+=h1I;var that=this;var editor=config[y96];this[D3Q](D$_);editor[f8i](i3c,function(){i3m.L2C();that[l9B](E3Q);})[z18](dt[y1k]({selected:D$_})[c95](),$[w6V]({buttons:config[m4_],message:config[W4Q],nest:D$_,title:config[A78] || editor[Q4g][p8r][W8B]},config[E6Q]));},className:r8Y,editor:L_a,extend:D4l,formButtons:{action:function(e){var F27=O3s;F27+=k6Q;this[F27]();},text:function(editor){return editor[L_E][z18][i6q];}},formMessage:function(editor,dt){var E4Y="confir";var B$G="rin";var K3L="confirm";var L1h=x38;L1h+=N$xh7.G7l;L1h+=U42;L1h+=N8u;var l$b=z_7;l$b+=N$xh7.Z2m;l$b+=K8U;l$b+=O5f;var J3m=Z6h;J3m+=N$xh7.s6X;J3m+=v9E;J3m+=N$xh7[419025];i3m.o$_();var t9S=x38;t9S+=N$xh7.G7l;t9S+=i_e;t9S+=s7p;var i2q=E4Y;i2q+=N$xh7[419025];var f3H=m79;f3H+=B$G;f3H+=U42;var l9k=B5J;l9k+=N$xh7.G7l;var W$r=z_7;W$r+=j3G;W$r+=X5U;var rows=dt[W$r]({selected:D$_})[c95]();var i18n=editor[l9k][z18];var question=typeof i18n[K3L] === f3H?i18n[K3L]:i18n[i2q][rows[t9S]]?i18n[K3L][rows[b$C]]:i18n[J3m][w$1];return question[l$b](/%d/g,rows[L1h]);},formOptions:{},formTitle:L_a,limitTo:[B7A],text:function(dt,node,config){var p2y='buttons.remove';var Q0O="edito";var E_u=z_7;E_u+=N$xh7.Z2m;E_u+=y0m;E_u+=q$X;var k7P=b24;i3m.L2C();k7P+=N$xh7[28411];k7P+=v3I;k7P+=N$xh7.G7l;var H$R=Q0O;H$R+=z_7;var C7d=B5J;C7d+=N$xh7.G7l;return dt[C7d](p2y,config[H$R][k7P][E_u][r4Q]);}}});_buttons[S8O]=$[Q1k]({},_buttons[m2i]);_buttons[A5n][Q1k]=l_z;_buttons[G5e]=$[p_h]({},_buttons[V3L]);_buttons[V7N][Q1k]=g$p;if(!DataTable || !DataTable[O_F] || !DataTable[V5d](V6K)){var i7m=I6g;i7m+=P0c;i7m+=J5k;throw new Error(i7m);}var Editor=(function(){var L0j='2.0.10';var X$J="rnalI18n";var k7l="asse";var m8Z="prototyp";i3m.o$_();var T$l="ieldTypes";var F13="internalS";var n97="Dat";var J9W="version";var u1Z="nalEvent";var X_8="ault";var V2A="ngs";var b9s="etti";var V7t="eTime";var u1z="ls";var s_5="ototyp";var C9X="internalMultiInfo";var F8a="inte";var Y$D=m3l;Y$D+=u1z;var N$0=W9U;N$0+=X_8;N$0+=X5U;var N7I=N$xh7.Z2m;N7I+=D6H;var W7u=n97;W7u+=V7t;var U1c=b0C;U1c+=L7T;U1c+=p9M;U1c+=N$xh7[562024];var H27=M1o;H27+=p9M;H27+=k7l;H27+=X5U;var K7T=N$xh7.s6X;K7T+=T$l;var T9a=F13;T9a+=b9s;T9a+=V2A;var V28=m8Z;V28+=N$xh7.Z2m;var r71=F8a;r71+=X$J;var f4z=K8U;f4z+=z_7;f4z+=s_5;f4z+=N$xh7.Z2m;var W$$=F8a;W$$+=z_7;W$$+=u1Z;function Editor(init){var x$a="xhr.dt.d";var q4W=".dt.dte";var D8W='Cannot find display controller ';var j5Q="settings";var m4m="clea";var k0V="indicator";var w5C="templ";var q1k="\'new\' instance";var S4a="domT";var k1I="=\"form_buttons\" class=\"";var K9d="ting";var f74="_o";var Y7j="ende";var Z86="bod";var U_x="_aja";var t9B="init";var i04="multiG";var o9k="odels";var a$e="ptionsUpdate";var D_9="DataTables Ed";var m0c="reope";var I4b="<div data-dte-e=\"proces";var m7n='body_content';var j0n="div></div>";var e9E="o\" class=\"";var F4W="<div data";var Q9C='<div data-dte-e="body" class="';var R6n='i18n.dt.dte';var j0i="_fieldNa";var U5t="undepe";var U2b="<div d";var q4d="rea";var A82="\"><";var D87="nts";var d9h='<div data-dte-e="form_content" class="';var l0T='<form data-dte-e="form" class="';var C0F="_submitSuccess";var f5x="te-e=\"";var f7z="Complet";var T9L="file";var E3c="_noProcessing";var i22="div data-dt";var F6p="cont";var c5X="clearDyna";var s1E="eve";var X$j='<div data-dte-e="body_content" class="';var M1y="inlineCreate";var V85="nit";var E23="_submitError";var E01="sing\" class=\"";var L42="rappe";var q1X="_displayReord";var J8j="nitEdi";var D3P="_multiIn";var S3I="ldFromNo";var k4o="yNode";var i9O="akInArray";var c5A="a-dte-e=\"f";var R7S="<div data-dte-e=\"form_error\" class=";var r4C="<div dat";var g3f="e-e=\"head\" class=";var u7W="_clo";var Y3k="body";var e1m='foot';var z9V="oot";var C63="><div cl";var l0l="foot\" class=\"";var R5c="models";var g9K="bleMa";var z5b="orm_inf";var p9i="itor must be initialised as a ";var r__="ine";var i0n="tName";var d0R="icInfo";var D6x="_nestedOpen";var P8v='"><span></span></div>';var m9l="nl";var c0k="bubblePosition";var O3B="nte";var r2D="ata-dte-e";var U0a="nTa";var B6W="mplate";var Q4O="troy";var i6S="-d";var X_G=b24;X_G+=J8j;X_G+=Y_M;X_G+=G1H;var g6D=b24;g6D+=V85;g6D+=f7z;g6D+=N$xh7.Z2m;var u_z=U4X;u_z+=J7D;u_z+=N$xh7.Z2m;u_z+=m28;var E2M=N$xh7[562024];E2M+=b24;E2M+=x95;var U9P=k5q;U9P+=x6K;var M8_=x$a;M8_+=M3d;var a9E=D7J;a9E+=N$xh7.G7l;var c7o=D7J;c7o+=N$xh7.G7l;var s1e=b24;s1e+=V85;s1e+=q4W;var N7H=s1E;N7H+=D87;var Z_H=u3q;Z_H+=M1o;Z_H+=s7p;var o6F=M$w;o6F+=s1g;o6F+=s$j;o6F+=U42;var K5_=A82;K5_+=v7e;K5_+=j0n;var h3k=A8T;h3k+=O3B;h3k+=m28;var p5B=e69;p5B+=C63;p5B+=X8B;p5B+=G97;var A$O=o56;A$O+=i22;A$O+=g3f;A$O+=e69;var D$x=b24;D$x+=N$xh7.G7l;D$x+=o2K;var y9s=N$xh7.s6X;y9s+=D7J;y9s+=z_7;y9s+=N$xh7[419025];var s8$=r4C;s8$+=c5A;s8$+=z5b;s8$+=e9E;var s8D=N$xh7.s6X;s8D+=D7J;s8D+=z_7;s8D+=N$xh7[419025];var y$W=R7S;y$W+=e69;var V9v=A_z;V9v+=w$1;V9v+=F6p;V9v+=r_e;var v7F=u$1;v7F+=w6K;var Q91=U2b;Q91+=r2D;Q91+=k1I;var B5H=N$xh7[562024];B5H+=D7J;B5H+=N$xh7[419025];var f0u=H12;f0u+=N$xh7.s6X;f0u+=E6q;f0u+=g7w;var T0S=e69;T0S+=g7w;var X6t=Y_M;X6t+=N$xh7[194026];X6t+=U42;var V3s=N$xh7.s6X;V3s+=G1H;V3s+=N$xh7[419025];var G1C=H12;G1C+=T2A;G1C+=a1p;var p6N=A8T;p6N+=m28;p6N+=N$xh7.Z2m;p6N+=m28;var Q5C=e69;Q5C+=g7w;var s8w=e36;s8w+=L42;s8w+=z_7;var h68=N$xh7.s6X;h68+=z9V;h68+=C9P;var Y$b=F4W;Y$b+=i6S;Y$b+=f5x;Y$b+=l0l;var Y3A=o56;Y3A+=q$m;Y3A+=a40;Y3A+=g7w;var c$$=e69;c$$+=g7w;var S$i=E1m;S$i+=N$xh7[194026];S$i+=K8U;S$i+=Y6g;var n_S=Z86;n_S+=x6K;var b8j=I4b;b8j+=E01;var i6V=X5U;i6V+=v1p;i6V+=K9d;i6V+=X5U;var u17=D72;u17+=v3I;u17+=N$xh7.G7l;var U10=j7u;U10+=N$xh7.Z2m;U10+=X5U;var T$J=v$T;T$J+=F0W;T$J+=z6R;var y7A=M3d;y7A+=B6W;var c3o=Y_M;c3o+=t8t;c3o+=x38;var d4U=S4a;d4U+=n8N;var B6$=a64;B6$+=e9g;B6$+=a$t;var O70=N$xh7[419025];O70+=o9k;var D4g=K9u;D4g+=N$xh7.Z2m;D4g+=N$xh7.G7l;D4g+=N$xh7[562024];var X6S=N$xh7.Z2m;X6S+=k2F;var o6y=w$1;o6y+=e36;o6y+=N$xh7.Z2m;o6y+=i9O;i3m.o$_();var f1n=d$M;f1n+=b82;var n_W=N3N;n_W+=m0c;n_W+=N$xh7.G7l;var v13=D3P;v13+=o2K;var A_C=K5H;A_C+=N$xh7.Z2m;var h18=f74;h18+=a$e;var c9K=m5I;c9K+=m9l;c9K+=r__;var q3v=n8O;q3v+=s_R;q3v+=D6m;var c$t=j0i;c$t+=r7I;var T6p=d4q;T6p+=N$xh7.Z2m;T6p+=S3I;T6p+=v$T;var S3u=U_Y;S3u+=a1G;S3u+=i0n;var H7y=w$1;H7y+=N$xh7.Z2m;H7y+=N$xh7[562024];H7y+=k6Q;var p3D=q1X;p3D+=N$xh7.Z2m;p3D+=z_7;var u4y=d7o;u4y+=m25;var J6k=T7u;J6k+=X9o;var g38=u7W;g38+=X5U;g38+=N$xh7.Z2m;var P_t=w$1;P_t+=c5X;P_t+=N$xh7[419025];P_t+=d0R;var W3G=g_Z;W3G+=g9K;W3G+=Z9F;var d06=U_x;d06+=t6B;var u1V=V3K;u1V+=Y_M;u1V+=p9M;u1V+=N$xh7.Z2m;var o0P=w5C;o0P+=j0Q;var U2R=X5U;U2R+=j8h;var Z$3=d5J;Z$3+=N$xh7.Z2m;Z$3+=N$xh7.G7l;var l8r=i04;l8r+=v1p;var s7I=N$xh7[419025];s7I+=D7J;s7I+=N$xh7[562024];s7I+=N$xh7.Z2m;var O$d=r7I;O$d+=P0L;O$d+=Z0P;var G2F=b24;G2F+=m9l;G2F+=Z9F;G2F+=N$xh7.Z2m;var G7O=s7p;G7O+=Z33;G7O+=N$xh7.Z2m;var z1g=w6H;z1g+=N$xh7.Z2m;z1g+=X5U;var I3s=N$xh7.s6X;I3s+=L7T;I3s+=Y4z;I3s+=X5U;var o2Z=K2T;o2Z+=N$xh7.Z2m;o2Z+=Y4z;var Q2$=N$xh7.Z2m;Q2$+=x2e;Q2$+=D7J;Q2$+=z_7;var c4u=a1G;c4u+=n8N;var b3s=T2A;b3s+=i1o;b3s+=k4o;var Y4D=N$xh7[562024];Y4D+=e9T;Y4D+=Q4O;var P0V=v$T;P0V+=K8U;P0V+=Y7j;P0V+=m28;var d4J=U5t;d4J+=S5V;d4J+=r_e;var A_H=M1o;A_H+=q4d;A_H+=Y_M;A_H+=N$xh7.Z2m;var H82=m4m;H82+=z_7;var D56=l5H;D56+=Y_M;D56+=M3S;var w88=g66;w88+=p9M;w88+=H8I;w88+=z_7;var v12=h7v;v12+=W9p;var G0N=m3D;G0N+=N$xh7[562024];var _this=this;this[G0N]=add;this[I5F]=ajax;this[v12]=background;this[w88]=blur;this[f5w]=bubble;this[c0k]=bubblePosition;this[D56]=buttons;this[H82]=clear;this[R5m]=close;this[A_H]=create;this[d4J]=undependent;this[P0V]=dependent;this[Y4D]=destroy;this[s6K]=disable;this[j0P]=display;this[W_x]=displayed;this[b3s]=displayNode;this[m2i]=edit;this[c4u]=enable;this[Q2$]=error$1;this[o2Z]=field;this[I3s]=fields;this[T9L]=file;this[z1g]=files;this[L6w]=get;this[G7O]=hide;this[F8v]=ids;this[a$K]=inError;this[G2F]=inline;this[M1y]=inlineCreate;this[O$d]=message;this[s7I]=mode;this[L6i]=modifier;this[l8r]=multiGet;this[o3P]=multiSet;this[j5k]=node;this[K$m]=off;this[h0w]=on;this[f8i]=one;this[Z$3]=open;this[c_u]=order;this[z18]=remove;this[M3V]=set;this[U2R]=show;this[i6q]=submit;this[O7b]=table;this[o0P]=template;this[u1V]=title;this[n6T]=val;this[t2C]=_actionClass;this[d06]=_ajax;this[t2X]=_animate;this[W3G]=_assembleMain;this[L5W]=_blur;this[P_t]=_clearDynamicInfo;this[g38]=_close;this[J6k]=_closeReg;this[S30]=_crudArgs;this[u4y]=_dataSource;this[p3D]=_displayReorder;this[H7y]=_edit;this[C3B]=_event;this[S3u]=_eventName;this[T6p]=_fieldFromNode;this[c$t]=_fieldNames;this[j0M]=_focus;this[q3v]=_formOptions;this[c9K]=_inline;this[h18]=_optionsUpdate;this[A_C]=_message;this[v13]=_multiInfo;this[e4F]=_nestedClose;this[D6x]=_nestedOpen;this[t5Q]=_postopen;this[n_W]=_preopen;this[J0Q]=_processing;this[E3c]=_noProcessing;this[f1n]=_submit;this[z_I]=_submitTable;this[C0F]=_submitSuccess;this[E23]=_submitError;this[N3L]=_tidy;this[o6y]=_weakInArray;if(!(this instanceof Editor)){var n_b=D_9;n_b+=p9i;n_b+=q1k;alert(n_b);}init=$[X6S](D$_,{},Editor[d8L],init);this[X5U]=$[D4g](D$_,{},Editor[O70][j5Q],{actionName:init[B6$],ajax:init[I5F],formOptions:init[E6Q],idSrc:init[Y5x],table:init[d4U] || init[c3o],template:init[K1w]?$(init[y7A])[T$J]():L_a});this[U10]=$[Q1k](D$_,{},Editor[S6t]);this[u17]=init[L_E];Editor[R5c][i6V][r8C]++;var that=this;var classes=this[S6t];var wrapper=$(w6y + classes[e$H] + e6e + b8j + classes[l9B][k0V] + P8v + Q9C + classes[n_S][S$i] + c$$ + X$j + classes[Y3k][A8L] + F07 + Y3A + Y$b + classes[h68][s8w] + Q5C + w6y + classes[P0b][p6N] + F07 + G1C + n51);var form=$(l0T + classes[V3s][X6t] + T0S + d9h + classes[A_z][A8L] + F07 + f0u);this[B5H]={body:el(Q14,wrapper)[w7J],bodyContent:el(m7n,wrapper)[w7J],buttons:$(Q91 + classes[A_z][e2Y] + v7F)[w7J],footer:el(e1m,wrapper)[w7J],form:form[w7J],formContent:el(V9v,form)[w7J],formError:$(y$W + classes[s8D][U0X] + F07)[w7J],formInfo:$(s8$ + classes[y9s][D$x] + F07)[w7J],header:$(A$O + classes[v4f][e$H] + p5B + classes[v4f][h3k] + K5_)[w7J],processing:el(o6F,wrapper)[w7J],wrapper:wrapper[w7J]};$[Z_H](init[N7H],function(evt,fn){that[h0w](evt,function(){var O4c="pply";var N74=N$xh7[194026];N74+=O4c;var y2e=p9M;y2e+=a1G;y2e+=y9w;var argsIn=[];for(var _i=w7J;_i < arguments[y2e];_i++){argsIn[_i]=arguments[_i];}fn[N74](that,argsIn);});});this[x0b];var table$1=this[X5U][O7b];if(init[G7e]){var f0Y=N$xh7[194026];f0Y+=N$xh7[562024];f0Y+=N$xh7[562024];this[f0Y](init[G7e]);}$(document)[h0w](s1e + this[X5U][r8C],function(e,settings,json){var p_d="_edi";var P$9=U0a;i3m.L2C();P$9+=x4c;if(_this[X5U][O7b] && settings[P$9] === $(table$1)[w7J]){var l8V=p_d;l8V+=f6R;settings[l8V]=_this;}})[c7o](R6n + this[X5U][r8C],function(e,settings){var e7m="angua";var v80="oL";var X82="Languag";var i6z=U0a;i6z+=x4c;var F8f=Y_M;F8f+=t8t;F8f+=p9M;F8f+=N$xh7.Z2m;i3m.L2C();if(_this[X5U][F8f] && settings[i6z] === $(table$1)[w7J]){var U_r=v80;U_r+=e7m;U_r+=Z0P;if(settings[U_r][y96]){var d6p=N$xh7.Z2m;d6p+=T2A;d6p+=f6R;var s93=D7J;s93+=X82;s93+=N$xh7.Z2m;$[Q1k](D$_,_this[L_E],settings[s93][d6p]);}}})[a9E](M8_ + this[X5U][r8C],function(e,settings,json){var q$0="_optionsUpdate";var q37="Tab";var i3y=N$xh7.G7l;i3y+=q37;i3y+=x38;var J1b=Y_M;J1b+=N$xh7[194026];J1b+=x4c;i3m.L2C();if(json && _this[X5U][J1b] && settings[i3y] === $(table$1)[w7J]){_this[q$0](json);}});if(!Editor[j0P][init[U9P]]){throw new Error(D8W + init[j0P]);}this[X5U][B8m]=Editor[E2M][init[j0P]][t9B](this);this[u_z](g6D,[]);$(document)[n7R](X_G,[this]);}Editor[U1C][W$$]=function(name,args){this[C3B](name,args);};Editor[f4z][r71]=function(){i3m.o$_();var d2c=b24;d2c+=N$xh7[28411];d2c+=v3I;d2c+=N$xh7.G7l;return this[d2c];};Editor[U1C][C9X]=function(){var q3A="_multiInfo";return this[q3A]();};Editor[V28][T9a]=function(){i3m.o$_();return this[X5U];};Editor[K7T]={checkbox:checkbox,datatable:datatable,datetime:datetime,hidden:hidden,password:password,radio:radio,readonly:readonly,select:select,text:text,textarea:textarea,upload:upload,uploadMany:uploadMany};Editor[j$v]={};Editor[J9W]=L0j;Editor[H27]=classNames;Editor[U1c]=Field;Editor[W7u]=L_a;Editor[N7I]=error;Editor[W6H]=pairs;Editor[D8y]=upload$1;Editor[N$0]=defaults$1;Editor[Y$D]={button:button,displayController:displayController,fieldType:fieldType,formOptions:formOptions,settings:settings};Editor[x4e]={dataTable:dataSource$1,html:dataSource};Editor[j0P]={envelope:envelope,lightbox:self};Editor[J3R]=function(id){return safeDomId(id,J3K);};return Editor;})();DataTable[o$H]=Editor;$[S_R][P76][l_C]=Editor;if(DataTable[h1K]){var Z0c=B7G;Z0c+=p62;Z0c+=b24;Z0c+=y7o;var W$e=j$E;W$e+=W1t;W$e+=N$xh7.Z2m;Editor[W$e]=DataTable[Z0c];}if(DataTable[h8S][r$b]){var o_r=N$xh7.Z2m;o_r+=t6B;o_r+=Y_M;var T3M=C4O;T3M+=N$xh7.G7l;T3M+=N$xh7[562024];$[T3M](Editor[w94],DataTable[o_r][r$b]);}DataTable[M2o][r$b]=Editor[H_o];return Editor;});})();


/*! DataTables styling integration for DataTables' Editor
 * ©SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-dt', 'datatables.net-editor'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				// CommonJS environments without a window global must pass a
				// root. This will give an error otherwise
				root = window;
			}

			if ( ! $ ) {
				$ = typeof window !== 'undefined' ? // jQuery's factory checks for a global window
					require('jquery') :
					require('jquery')( root );
			}

			if ( ! $.fn.dataTable ) {
				require('datatables.net-dt')(root, $);
			}

			if ( ! $.fn.dataTable ) {
				require('datatables.net-editor')(root, $);
			}


			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


var Editor = DataTable.Editor;


return Editor;
}));


/*! Buttons for DataTables 2.2.3
 * ©2016-2022 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


// Used for namespacing events added to the document by each instance, so they
// can be removed on destroy
var _instCounter = 0;

// Button namespacing counter for namespacing events on individual buttons
var _buttonCounter = 0;

var _dtButtons = DataTable.ext.buttons;

// Allow for jQuery slim
function _fadeIn(el, duration, fn) {
	if ($.fn.animate) {
		el
			.stop()
			.fadeIn( duration, fn );

	}
	else {
		el.css('display', 'block');

		if (fn) {
			fn.call(el);
		}
	}
}

function _fadeOut(el, duration, fn) {
	if ($.fn.animate) {
		el
			.stop()
			.fadeOut( duration, fn );
	}
	else {
		el.css('display', 'none');
		
		if (fn) {
			fn.call(el);
		}
	}
}

/**
 * [Buttons description]
 * @param {[type]}
 * @param {[type]}
 */
var Buttons = function( dt, config )
{
	// If not created with a `new` keyword then we return a wrapper function that
	// will take the settings object for a DT. This allows easy use of new instances
	// with the `layout` option - e.g. `topLeft: $.fn.dataTable.Buttons( ... )`.
	if ( !(this instanceof Buttons) ) {
		return function (settings) {
			return new Buttons( settings, dt ).container();
		};
	}

	// If there is no config set it to an empty object
	if ( typeof( config ) === 'undefined' ) {
		config = {};	
	}
	
	// Allow a boolean true for defaults
	if ( config === true ) {
		config = {};
	}

	// For easy configuration of buttons an array can be given
	if ( Array.isArray( config ) ) {
		config = { buttons: config };
	}

	this.c = $.extend( true, {}, Buttons.defaults, config );

	// Don't want a deep copy for the buttons
	if ( config.buttons ) {
		this.c.buttons = config.buttons;
	}

	this.s = {
		dt: new DataTable.Api( dt ),
		buttons: [],
		listenKeys: '',
		namespace: 'dtb'+(_instCounter++)
	};

	this.dom = {
		container: $('<'+this.c.dom.container.tag+'/>')
			.addClass( this.c.dom.container.className )
	};

	this._constructor();
};


$.extend( Buttons.prototype, {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Public methods
	 */

	/**
	 * Get the action of a button
	 * @param  {int|string} Button index
	 * @return {function}
	 *//**
	 * Set the action of a button
	 * @param  {node} node Button element
	 * @param  {function} action Function to set
	 * @return {Buttons} Self for chaining
	 */
	action: function ( node, action )
	{
		var button = this._nodeToButton( node );

		if ( action === undefined ) {
			return button.conf.action;
		}

		button.conf.action = action;

		return this;
	},

	/**
	 * Add an active class to the button to make to look active or get current
	 * active state.
	 * @param  {node} node Button element
	 * @param  {boolean} [flag] Enable / disable flag
	 * @return {Buttons} Self for chaining or boolean for getter
	 */
	active: function ( node, flag ) {
		var button = this._nodeToButton( node );
		var klass = this.c.dom.button.active;
		var jqNode = $(button.node);

		if ( flag === undefined ) {
			return jqNode.hasClass( klass );
		}

		jqNode.toggleClass( klass, flag === undefined ? true : flag );

		return this;
	},

	/**
	 * Add a new button
	 * @param {object} config Button configuration object, base string name or function
	 * @param {int|string} [idx] Button index for where to insert the button
	 * @param {boolean} [draw=true] Trigger a draw. Set a false when adding
	 *   lots of buttons, until the last button.
	 * @return {Buttons} Self for chaining
	 */
	add: function ( config, idx, draw )
	{
		var buttons = this.s.buttons;

		if ( typeof idx === 'string' ) {
			var split = idx.split('-');
			var base = this.s;

			for ( var i=0, ien=split.length-1 ; i<ien ; i++ ) {
				base = base.buttons[ split[i]*1 ];
			}

			buttons = base.buttons;
			idx = split[ split.length-1 ]*1;
		}

		this._expandButton(
			buttons,
			config,
			config !== undefined ? config.split : undefined,
			(config === undefined || config.split === undefined || config.split.length === 0) && base !== undefined,
			false,
			idx
		);

		if (draw === undefined || draw === true) {
			this._draw();
		}
	
		return this;
	},

	/**
	 * Clear buttons from a collection and then insert new buttons
	 */
	collectionRebuild: function ( node, newButtons )
	{
		var button = this._nodeToButton( node );
		
		if(newButtons !== undefined) {
			var i;
			// Need to reverse the array
			for (i=button.buttons.length-1; i>=0; i--) {
				this.remove(button.buttons[i].node);
			}
	
			for (i=0; i<newButtons.length; i++) {
				var newBtn = newButtons[i];

				this._expandButton(
					button.buttons,
					newBtn,
					newBtn !== undefined && newBtn.config !== undefined && newBtn.config.split !== undefined,
					true,
					newBtn.parentConf !== undefined && newBtn.parentConf.split !== undefined,
					i,
					newBtn.parentConf
				);
			}
		}

		this._draw(button.collection, button.buttons);
	},

	/**
	 * Get the container node for the buttons
	 * @return {jQuery} Buttons node
	 */
	container: function ()
	{
		return this.dom.container;
	},

	/**
	 * Disable a button
	 * @param  {node} node Button node
	 * @return {Buttons} Self for chaining
	 */
	disable: function ( node ) {
		var button = this._nodeToButton( node );

		$(button.node)
			.addClass( this.c.dom.button.disabled )
			.attr('disabled', true);

		return this;
	},

	/**
	 * Destroy the instance, cleaning up event handlers and removing DOM
	 * elements
	 * @return {Buttons} Self for chaining
	 */
	destroy: function ()
	{
		// Key event listener
		$('body').off( 'keyup.'+this.s.namespace );

		// Individual button destroy (so they can remove their own events if
		// needed). Take a copy as the array is modified by `remove`
		var buttons = this.s.buttons.slice();
		var i, ien;
		
		for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
			this.remove( buttons[i].node );
		}

		// Container
		this.dom.container.remove();

		// Remove from the settings object collection
		var buttonInsts = this.s.dt.settings()[0];

		for ( i=0, ien=buttonInsts.length ; i<ien ; i++ ) {
			if ( buttonInsts.inst === this ) {
				buttonInsts.splice( i, 1 );
				break;
			}
		}

		return this;
	},

	/**
	 * Enable / disable a button
	 * @param  {node} node Button node
	 * @param  {boolean} [flag=true] Enable / disable flag
	 * @return {Buttons} Self for chaining
	 */
	enable: function ( node, flag )
	{
		if ( flag === false ) {
			return this.disable( node );
		}

		var button = this._nodeToButton( node );
		$(button.node)
			.removeClass( this.c.dom.button.disabled )
			.removeAttr('disabled');

		return this;
	},

	/**
	 * Get a button's index
	 * 
	 * This is internally recursive
	 * @param {element} node Button to get the index of
	 * @return {string} Button index
	 */
	index: function ( node, nested, buttons )
	{
		if ( ! nested ) {
			nested = '';
			buttons = this.s.buttons;
		}

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			var inner = buttons[i].buttons;

			if (buttons[i].node === node) {
				return nested + i;
			}

			if ( inner && inner.length ) {
				var match = this.index(node, i + '-', inner);

				if (match !== null) {
					return match;
				}
			}
		}

		return null;
	},


	/**
	 * Get the instance name for the button set selector
	 * @return {string} Instance name
	 */
	name: function ()
	{
		return this.c.name;
	},

	/**
	 * Get a button's node of the buttons container if no button is given
	 * @param  {node} [node] Button node
	 * @return {jQuery} Button element, or container
	 */
	node: function ( node )
	{
		if ( ! node ) {
			return this.dom.container;
		}

		var button = this._nodeToButton( node );
		return $(button.node);
	},

	/**
	 * Set / get a processing class on the selected button
	 * @param {element} node Triggering button node
	 * @param  {boolean} flag true to add, false to remove, undefined to get
	 * @return {boolean|Buttons} Getter value or this if a setter.
	 */
	processing: function ( node, flag )
	{
		var dt = this.s.dt;
		var button = this._nodeToButton( node );

		if ( flag === undefined ) {
			return $(button.node).hasClass( 'processing' );
		}

		$(button.node).toggleClass( 'processing', flag );

		$(dt.table().node()).triggerHandler( 'buttons-processing.dt', [
			flag, dt.button( node ), dt, $(node), button.conf
		] );

		return this;
	},

	/**
	 * Remove a button.
	 * @param  {node} node Button node
	 * @return {Buttons} Self for chaining
	 */
	remove: function ( node )
	{
		var button = this._nodeToButton( node );
		var host = this._nodeToHost( node );
		var dt = this.s.dt;

		// Remove any child buttons first
		if ( button.buttons.length ) {
			for ( var i=button.buttons.length-1 ; i>=0 ; i-- ) {
				this.remove( button.buttons[i].node );
			}
		}

		button.conf.destroying = true;

		// Allow the button to remove event handlers, etc
		if ( button.conf.destroy ) {
			button.conf.destroy.call( dt.button(node), dt, $(node), button.conf );
		}

		this._removeKey( button.conf );

		$(button.node).remove();

		var idx = $.inArray( button, host );
		host.splice( idx, 1 );

		return this;
	},

	/**
	 * Get the text for a button
	 * @param  {int|string} node Button index
	 * @return {string} Button text
	 *//**
	 * Set the text for a button
	 * @param  {int|string|function} node Button index
	 * @param  {string} label Text
	 * @return {Buttons} Self for chaining
	 */
	text: function ( node, label )
	{
		var button = this._nodeToButton( node );
		var buttonLiner = this.c.dom.collection.buttonLiner;
		var linerTag = button.inCollection && buttonLiner && buttonLiner.tag ?
			buttonLiner.tag :
			this.c.dom.buttonLiner.tag;
		var dt = this.s.dt;
		var jqNode = $(button.node);
		var text = function ( opt ) {
			return typeof opt === 'function' ?
				opt( dt, jqNode, button.conf ) :
				opt;
		};

		if ( label === undefined ) {
			return text( button.conf.text );
		}

		button.conf.text = label;

		if ( linerTag ) {
			jqNode
				.children( linerTag )
				.eq(0)
				.filter(':not(.dt-down-arrow)')
				.html( text(label) );
		}
		else {
			jqNode.html( text(label) );
		}

		return this;
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Constructor
	 */

	/**
	 * Buttons constructor
	 * @private
	 */
	_constructor: function ()
	{
		var that = this;
		var dt = this.s.dt;
		var dtSettings = dt.settings()[0];
		var buttons =  this.c.buttons;

		if ( ! dtSettings._buttons ) {
			dtSettings._buttons = [];
		}

		dtSettings._buttons.push( {
			inst: this,
			name: this.c.name
		} );

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			this.add( buttons[i] );
		}

		dt.on( 'destroy', function ( e, settings ) {
			if ( settings === dtSettings ) {
				that.destroy();
			}
		} );

		// Global key event binding to listen for button keys
		$('body').on( 'keyup.'+this.s.namespace, function ( e ) {
			if ( ! document.activeElement || document.activeElement === document.body ) {
				// SUse a string of characters for fast lookup of if we need to
				// handle this
				var character = String.fromCharCode(e.keyCode).toLowerCase();

				if ( that.s.listenKeys.toLowerCase().indexOf( character ) !== -1 ) {
					that._keypress( character, e );
				}
			}
		} );
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Private methods
	 */

	/**
	 * Add a new button to the key press listener
	 * @param {object} conf Resolved button configuration object
	 * @private
	 */
	_addKey: function ( conf )
	{
		if ( conf.key ) {
			this.s.listenKeys += $.isPlainObject( conf.key ) ?
				conf.key.key :
				conf.key;
		}
	},

	/**
	 * Insert the buttons into the container. Call without parameters!
	 * @param  {node} [container] Recursive only - Insert point
	 * @param  {array} [buttons] Recursive only - Buttons array
	 * @private
	 */
	_draw: function ( container, buttons )
	{
		if ( ! container ) {
			container = this.dom.container;
			buttons = this.s.buttons;
		}

		container.children().detach();

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			container.append( buttons[i].inserter );
			container.append( ' ' );

			if ( buttons[i].buttons && buttons[i].buttons.length ) {
				this._draw( buttons[i].collection, buttons[i].buttons );
			}
		}
	},

	/**
	 * Create buttons from an array of buttons
	 * @param  {array} attachTo Buttons array to attach to
	 * @param  {object} button Button definition
	 * @param  {boolean} inCollection true if the button is in a collection
	 * @private
	 */
	_expandButton: function ( attachTo, button, split, inCollection, inSplit, attachPoint, parentConf )
	{
		var dt = this.s.dt;
		var buttonCounter = 0;
		var isSplit = false;
		var buttons = ! Array.isArray( button ) ?
			[ button ] :
			button;
		
		if(button === undefined ) {
			buttons = !Array.isArray(split) ?
				[ split ] :
				split;
		}

		if (button !== undefined && button.split !== undefined) {
			isSplit = true;
		}
			
		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			var conf = this._resolveExtends( buttons[i] );

			if ( ! conf ) {
				continue;
			}

			if( conf.config !== undefined && conf.config.split) {
				isSplit = true;
			}
			else {
				isSplit = false;
			}
			
			// If the configuration is an array, then expand the buttons at this
			// point
			if ( Array.isArray( conf ) ) {
				this._expandButton( attachTo, conf, built !== undefined && built.conf !== undefined ? built.conf.split : undefined, inCollection, parentConf !== undefined && parentConf.split !== undefined, attachPoint, parentConf );
				continue;
			}

			var built = this._buildButton( conf, inCollection, conf.split !== undefined || (conf.config !== undefined && conf.config.split !== undefined), inSplit );
			if ( ! built ) {
				continue;
			}

			if ( attachPoint !== undefined && attachPoint !== null ) {
				attachTo.splice( attachPoint, 0, built );
				attachPoint++;
			}
			else {
				attachTo.push( built );
			}

			
			if ( built.conf.buttons || built.conf.split ) {
				built.collection = $('<'+(isSplit ? this.c.dom.splitCollection.tag : this.c.dom.collection.tag)+'/>');

				built.conf._collection = built.collection;

				if(built.conf.split) {
					for(var j = 0; j < built.conf.split.length; j++) {
						if(typeof built.conf.split[j] === "object") {
							built.conf.split[j].parent = parentConf;
							if(built.conf.split[j].collectionLayout === undefined) {
								built.conf.split[j].collectionLayout = built.conf.collectionLayout;
							}
							if(built.conf.split[j].dropup === undefined) {
								built.conf.split[j].dropup = built.conf.dropup;
							}
							if(built.conf.split[j].fade === undefined) {
								built.conf.split[j].fade = built.conf.fade;
							}
						}
					}
				}
				else {
					$(built.node).append($('<span class="dt-down-arrow">'+this.c.dom.splitDropdown.text+'</span>'))
				}

				this._expandButton( built.buttons, built.conf.buttons, built.conf.split, !isSplit, isSplit, attachPoint, built.conf );
			}
			built.conf.parent = parentConf;

			// init call is made here, rather than buildButton as it needs to
			// be selectable, and for that it needs to be in the buttons array
			if ( conf.init ) {
				conf.init.call( dt.button( built.node ), dt, $(built.node), conf );
			}

			buttonCounter++;
		}
	},

	/**
	 * Create an individual button
	 * @param  {object} config            Resolved button configuration
	 * @param  {boolean} inCollection `true` if a collection button
	 * @return {jQuery} Created button node (jQuery)
	 * @private
	 */
	_buildButton: function ( config, inCollection, isSplit, inSplit )
	{
		var buttonDom = this.c.dom.button;
		var linerDom = this.c.dom.buttonLiner;
		var collectionDom = this.c.dom.collection;
		var splitDom = this.c.dom.split;
		var splitCollectionDom = this.c.dom.splitCollection;
		var splitDropdownButton = this.c.dom.splitDropdownButton;
		var dt = this.s.dt;
		var text = function ( opt ) {
			return typeof opt === 'function' ?
				opt( dt, button, config ) :
				opt;
		};

		// Spacers don't do much other than insert an element into the DOM
		if (config.spacer) {
			var spacer = $('<span></span>')
				.addClass('dt-button-spacer ' + config.style + ' ' + buttonDom.spacerClass)
				.html(text(config.text));

			return {
				conf:         config,
				node:         spacer,
				inserter:     spacer,
				buttons:      [],
				inCollection: inCollection,
				isSplit:	  isSplit,
				inSplit:	  inSplit,
				collection:   null
			};
		}

		if ( !isSplit && inSplit && splitCollectionDom ) {
			buttonDom = splitDropdownButton;
		}
		else if ( !isSplit && inCollection && collectionDom.button ) {
			buttonDom = collectionDom.button;
		} 

		if ( !isSplit && inSplit && splitCollectionDom.buttonLiner ) {
			linerDom = splitCollectionDom.buttonLiner
		}
		else if ( !isSplit && inCollection && collectionDom.buttonLiner ) {
			linerDom = collectionDom.buttonLiner;
		}

		// Make sure that the button is available based on whatever requirements
		// it has. For example, PDF button require pdfmake
		if ( config.available && ! config.available( dt, config ) && !config.hasOwnProperty('html') ) {
			return false;
		}

		var button;
		if(!config.hasOwnProperty('html')) {
			var action = function ( e, dt, button, config ) {
				config.action.call( dt.button( button ), e, dt, button, config );
	
				$(dt.table().node()).triggerHandler( 'buttons-action.dt', [
					dt.button( button ), dt, button, config 
				] );
			};

			var tag = config.tag || buttonDom.tag;
			var clickBlurs = config.clickBlurs === undefined
				? true :
				config.clickBlurs;

			button = $('<'+tag+'/>')
				.addClass( buttonDom.className )
				.addClass( inSplit ? this.c.dom.splitDropdownButton.className : '')
				.attr( 'tabindex', this.s.dt.settings()[0].iTabIndex )
				.attr( 'aria-controls', this.s.dt.table().node().id )
				.on( 'click.dtb', function (e) {
					e.preventDefault();
	
					if ( ! button.hasClass( buttonDom.disabled ) && config.action ) {
						action( e, dt, button, config );
					}
					if( clickBlurs ) {
						button.trigger('blur');
					}
				} )
				.on( 'keypress.dtb', function (e) {
					if ( e.keyCode === 13 ) {
						e.preventDefault();

						if ( ! button.hasClass( buttonDom.disabled ) && config.action ) {
							action( e, dt, button, config );
						}
					}
				} );
	
			// Make `a` tags act like a link
			if ( tag.toLowerCase() === 'a' ) {
				button.attr( 'href', '#' );
			}
	
			// Button tags should have `type=button` so they don't have any default behaviour
			if ( tag.toLowerCase() === 'button' ) {
				button.attr( 'type', 'button' );
			}
	
			if ( linerDom.tag ) {
				var liner = $('<'+linerDom.tag+'/>')
					.html( text( config.text ) )
					.addClass( linerDom.className );
	
				if ( linerDom.tag.toLowerCase() === 'a' ) {
					liner.attr( 'href', '#' );
				}
	
				button.append( liner );
			}
			else {
				button.html( text( config.text ) );
			}
	
			if ( config.enabled === false ) {
				button.addClass( buttonDom.disabled );
			}
	
			if ( config.className ) {
				button.addClass( config.className );
			}
	
			if ( config.titleAttr ) {
				button.attr( 'title', text( config.titleAttr ) );
			}
	
			if ( config.attr ) {
				button.attr( config.attr );
			}
	
			if ( ! config.namespace ) {
				config.namespace = '.dt-button-'+(_buttonCounter++);
			}

			if  ( config.config !== undefined && config.config.split ) {
				config.split = config.config.split;
			}
		}
		else {
			button = $(config.html)
		}
	
		var buttonContainer = this.c.dom.buttonContainer;
		var inserter;
		if ( buttonContainer && buttonContainer.tag ) {
			inserter = $('<'+buttonContainer.tag+'/>')
				.addClass( buttonContainer.className )
				.append( button );
		}
		else {
			inserter = button;
		}

		this._addKey( config );

		// Style integration callback for DOM manipulation
		// Note that this is _not_ documented. It is currently
		// for style integration only
		if( this.c.buttonCreated ) {
			inserter = this.c.buttonCreated( config, inserter );
		}

		var splitDiv;
		if(isSplit) {
			splitDiv = $('<div/>').addClass(this.c.dom.splitWrapper.className)
			splitDiv.append(button);
			var dropButtonConfig = $.extend(config, {
				text: this.c.dom.splitDropdown.text,
				className: this.c.dom.splitDropdown.className,
				closeButton: false,
				attr: {
					'aria-haspopup': 'dialog',
					'aria-expanded': false
				},
				align: this.c.dom.splitDropdown.align,
				splitAlignClass: this.c.dom.splitDropdown.splitAlignClass
				
			})

			this._addKey(dropButtonConfig);

			var splitAction = function ( e, dt, button, config ) {
				_dtButtons.split.action.call( dt.button($('div.dt-btn-split-wrapper')[0] ), e, dt, button, config );
	
				$(dt.table().node()).triggerHandler( 'buttons-action.dt', [
					dt.button( button ), dt, button, config 
				] );
				button.attr('aria-expanded', true)
			};
			
			var dropButton = $('<button class="' + this.c.dom.splitDropdown.className + ' dt-button"><span class="dt-btn-split-drop-arrow">'+this.c.dom.splitDropdown.text+'</span></button>')
				.on( 'click.dtb', function (e) {
					e.preventDefault();
					e.stopPropagation();

					if ( ! dropButton.hasClass( buttonDom.disabled )) {
						splitAction( e, dt, dropButton, dropButtonConfig );
					}
					if ( clickBlurs ) {
						dropButton.trigger('blur');
					}
				} )
				.on( 'keypress.dtb', function (e) {
					if ( e.keyCode === 13 ) {
						e.preventDefault();

						if ( ! dropButton.hasClass( buttonDom.disabled ) ) {
							splitAction( e, dt, dropButton, dropButtonConfig );
						}
					}
				} );

			if(config.split.length === 0) {
				dropButton.addClass('dtb-hide-drop');
			}

			splitDiv.append(dropButton).attr(dropButtonConfig.attr);
		}

		return {
			conf:         config,
			node:         isSplit ? splitDiv.get(0) : button.get(0),
			inserter:     isSplit ? splitDiv : inserter,
			buttons:      [],
			inCollection: inCollection,
			isSplit:	  isSplit,
			inSplit:	  inSplit,
			collection:   null
		};
	},

	/**
	 * Get the button object from a node (recursive)
	 * @param  {node} node Button node
	 * @param  {array} [buttons] Button array, uses base if not defined
	 * @return {object} Button object
	 * @private
	 */
	_nodeToButton: function ( node, buttons )
	{
		if ( ! buttons ) {
			buttons = this.s.buttons;
		}

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			if ( buttons[i].node === node ) {
				return buttons[i];
			}

			if ( buttons[i].buttons.length ) {
				var ret = this._nodeToButton( node, buttons[i].buttons );

				if ( ret ) {
					return ret;
				}
			}
		}
	},

	/**
	 * Get container array for a button from a button node (recursive)
	 * @param  {node} node Button node
	 * @param  {array} [buttons] Button array, uses base if not defined
	 * @return {array} Button's host array
	 * @private
	 */
	_nodeToHost: function ( node, buttons )
	{
		if ( ! buttons ) {
			buttons = this.s.buttons;
		}

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			if ( buttons[i].node === node ) {
				return buttons;
			}

			if ( buttons[i].buttons.length ) {
				var ret = this._nodeToHost( node, buttons[i].buttons );

				if ( ret ) {
					return ret;
				}
			}
		}
	},

	/**
	 * Handle a key press - determine if any button's key configured matches
	 * what was typed and trigger the action if so.
	 * @param  {string} character The character pressed
	 * @param  {object} e Key event that triggered this call
	 * @private
	 */
	_keypress: function ( character, e )
	{
		// Check if this button press already activated on another instance of Buttons
		if ( e._buttonsHandled ) {
			return;
		}

		var run = function ( conf, node ) {
			if ( ! conf.key ) {
				return;
			}

			if ( conf.key === character ) {
				e._buttonsHandled = true;
				$(node).click();
			}
			else if ( $.isPlainObject( conf.key ) ) {
				if ( conf.key.key !== character ) {
					return;
				}

				if ( conf.key.shiftKey && ! e.shiftKey ) {
					return;
				}

				if ( conf.key.altKey && ! e.altKey ) {
					return;
				}

				if ( conf.key.ctrlKey && ! e.ctrlKey ) {
					return;
				}

				if ( conf.key.metaKey && ! e.metaKey ) {
					return;
				}

				// Made it this far - it is good
				e._buttonsHandled = true;
				$(node).click();
			}
		};

		var recurse = function ( a ) {
			for ( var i=0, ien=a.length ; i<ien ; i++ ) {
				run( a[i].conf, a[i].node );

				if ( a[i].buttons.length ) {
					recurse( a[i].buttons );
				}
			}
		};

		recurse( this.s.buttons );
	},

	/**
	 * Remove a key from the key listener for this instance (to be used when a
	 * button is removed)
	 * @param  {object} conf Button configuration
	 * @private
	 */
	_removeKey: function ( conf )
	{
		if ( conf.key ) {
			var character = $.isPlainObject( conf.key ) ?
				conf.key.key :
				conf.key;

			// Remove only one character, as multiple buttons could have the
			// same listening key
			var a = this.s.listenKeys.split('');
			var idx = $.inArray( character, a );
			a.splice( idx, 1 );
			this.s.listenKeys = a.join('');
		}
	},

	/**
	 * Resolve a button configuration
	 * @param  {string|function|object} conf Button config to resolve
	 * @return {object} Button configuration
	 * @private
	 */
	_resolveExtends: function ( conf )
	{
		var that = this;
		var dt = this.s.dt;
		var i, ien;
		var toConfObject = function ( base ) {
			var loop = 0;

			// Loop until we have resolved to a button configuration, or an
			// array of button configurations (which will be iterated
			// separately)
			while ( ! $.isPlainObject(base) && ! Array.isArray(base) ) {
				if ( base === undefined ) {
					return;
				}

				if ( typeof base === 'function' ) {
					base = base.call( that, dt, conf );

					if ( ! base ) {
						return false;
					}
				}
				else if ( typeof base === 'string' ) {
					if ( ! _dtButtons[ base ] ) {
						return {html: base}
					}

					base = _dtButtons[ base ];
				}

				loop++;
				if ( loop > 30 ) {
					// Protect against misconfiguration killing the browser
					throw 'Buttons: Too many iterations';
				}
			}

			return Array.isArray( base ) ?
				base :
				$.extend( {}, base );
		};

		conf = toConfObject( conf );

		while ( conf && conf.extend ) {
			// Use `toConfObject` in case the button definition being extended
			// is itself a string or a function
			if ( ! _dtButtons[ conf.extend ] ) {
				throw 'Cannot extend unknown button type: '+conf.extend;
			}

			var objArray = toConfObject( _dtButtons[ conf.extend ] );
			if ( Array.isArray( objArray ) ) {
				return objArray;
			}
			else if ( ! objArray ) {
				// This is a little brutal as it might be possible to have a
				// valid button without the extend, but if there is no extend
				// then the host button would be acting in an undefined state
				return false;
			}

			// Stash the current class name
			var originalClassName = objArray.className;

			if (conf.config !== undefined && objArray.config !== undefined) {
				conf.config = $.extend({}, objArray.config, conf.config)
			}

			conf = $.extend( {}, objArray, conf );

			// The extend will have overwritten the original class name if the
			// `conf` object also assigned a class, but we want to concatenate
			// them so they are list that is combined from all extended buttons
			if ( originalClassName && conf.className !== originalClassName ) {
				conf.className = originalClassName+' '+conf.className;
			}

			// Buttons to be added to a collection  -gives the ability to define
			// if buttons should be added to the start or end of a collection
			var postfixButtons = conf.postfixButtons;
			if ( postfixButtons ) {
				if ( ! conf.buttons ) {
					conf.buttons = [];
				}

				for ( i=0, ien=postfixButtons.length ; i<ien ; i++ ) {
					conf.buttons.push( postfixButtons[i] );
				}

				conf.postfixButtons = null;
			}

			var prefixButtons = conf.prefixButtons;
			if ( prefixButtons ) {
				if ( ! conf.buttons ) {
					conf.buttons = [];
				}

				for ( i=0, ien=prefixButtons.length ; i<ien ; i++ ) {
					conf.buttons.splice( i, 0, prefixButtons[i] );
				}

				conf.prefixButtons = null;
			}

			// Although we want the `conf` object to overwrite almost all of
			// the properties of the object being extended, the `extend`
			// property should come from the object being extended
			conf.extend = objArray.extend;
		}

		return conf;
	},

	/**
	 * Display (and replace if there is an existing one) a popover attached to a button
	 * @param {string|node} content Content to show
	 * @param {DataTable.Api} hostButton DT API instance of the button
	 * @param {object} inOpts Options (see object below for all options)
	 */
	_popover: function ( content, hostButton, inOpts, e ) {
		var dt = hostButton;
		var buttonsSettings = this.c;
		var closed = false;
		var options = $.extend( {
			align: 'button-left', // button-right, dt-container, split-left, split-right
			autoClose: false,
			background: true,
			backgroundClassName: 'dt-button-background',
			closeButton: true,
			contentClassName: buttonsSettings.dom.collection.className,
			collectionLayout: '',
			collectionTitle: '',
			dropup: false,
			fade: 400,
			popoverTitle: '',
			rightAlignClassName: 'dt-button-right',
			tag: buttonsSettings.dom.collection.tag
		}, inOpts );

		var hostNode = hostButton.node();

		var close = function () {
			closed = true;

			_fadeOut(
				$('.dt-button-collection'),
				options.fade,
				function () {
					$(this).detach();
				}
			);

			$(dt.buttons( '[aria-haspopup="dialog"][aria-expanded="true"]' ).nodes())
				.attr('aria-expanded', 'false');

			$('div.dt-button-background').off( 'click.dtb-collection' );
			Buttons.background( false, options.backgroundClassName, options.fade, hostNode );

			$(window).off('resize.resize.dtb-collection');
			$('body').off( '.dtb-collection' );
			dt.off( 'buttons-action.b-internal' );
			dt.off( 'destroy' );
		};

		if (content === false) {
			close();
			return;
		}

		var existingExpanded = $(dt.buttons( '[aria-haspopup="dialog"][aria-expanded="true"]' ).nodes());
		if ( existingExpanded.length ) {
			// Reuse the current position if the button that was triggered is inside an existing collection
			if (hostNode.closest('div.dt-button-collection').length) {
				hostNode = existingExpanded.eq(0);
			}

			close();
		}

		// Try to be smart about the layout
		var cnt = $('.dt-button', content).length;
		var mod = '';

		if (cnt === 3) {
			mod = 'dtb-b3';
		}
		else if (cnt === 2) {
			mod = 'dtb-b2';
		}
		else if (cnt === 1) {
			mod = 'dtb-b1';
		}

		var display = $('<div/>')
			.addClass('dt-button-collection')
			.addClass(options.collectionLayout)
			.addClass(options.splitAlignClass)
			.addClass(mod)
			.css('display', 'none')
			.attr({
				'aria-modal': true,
				role: 'dialog'
			});

		content = $(content)
			.addClass(options.contentClassName)
			.attr('role', 'menu')
			.appendTo(display);

		hostNode.attr( 'aria-expanded', 'true' );

		if ( hostNode.parents('body')[0] !== document.body ) {
			hostNode = document.body.lastChild;
		}

		if ( options.popoverTitle ) {
			display.prepend('<div class="dt-button-collection-title">'+options.popoverTitle+'</div>');
		}
		else if ( options.collectionTitle ) {
			display.prepend('<div class="dt-button-collection-title">'+options.collectionTitle+'</div>');
		}

		if (options.closeButton) {
			display.prepend('<div class="dtb-popover-close">x</div>').addClass('dtb-collection-closeable')
		}

		_fadeIn( display.insertAfter( hostNode ), options.fade );

		var tableContainer = $( hostButton.table().container() );
		var position = display.css( 'position' );

		if ( options.span === 'container' || options.align === 'dt-container' ) {
			hostNode = hostNode.parent();
			display.css('width', tableContainer.width());
		}

		// Align the popover relative to the DataTables container
		// Useful for wide popovers such as SearchPanes
		if (position === 'absolute') {
			// Align relative to the host button
			var offsetParent = $(hostNode[0].offsetParent);
			var buttonPosition = hostNode.position();
			var buttonOffset = hostNode.offset();
			var tableSizes = offsetParent.offset();
			var containerPosition = offsetParent.position();
			var computed = window.getComputedStyle(offsetParent[0]);

			tableSizes.height = offsetParent.outerHeight();
			tableSizes.width = offsetParent.width() + parseFloat(computed.paddingLeft);
			tableSizes.right = tableSizes.left + tableSizes.width;
			tableSizes.bottom = tableSizes.top + tableSizes.height;

			// Set the initial position so we can read height / width
			var top = buttonPosition.top + hostNode.outerHeight();
			var left = buttonPosition.left;

			display.css( {
				top: top,
				left: left
			} );

			// Get the popover position
			computed = window.getComputedStyle(display[0]);
			var popoverSizes = display.offset();

			popoverSizes.height = display.outerHeight();
			popoverSizes.width = display.outerWidth();
			popoverSizes.right = popoverSizes.left + popoverSizes.width;
			popoverSizes.bottom = popoverSizes.top + popoverSizes.height;
			popoverSizes.marginTop = parseFloat(computed.marginTop);
			popoverSizes.marginBottom = parseFloat(computed.marginBottom);

			// First position per the class requirements - pop up and right align
			if (options.dropup) {
				top = buttonPosition.top - popoverSizes.height - popoverSizes.marginTop - popoverSizes.marginBottom;
			}

			if (options.align === 'button-right' || display.hasClass( options.rightAlignClassName )) {
				left = buttonPosition.left - popoverSizes.width + hostNode.outerWidth(); 
			}

			// Container alignment - make sure it doesn't overflow the table container
			if (options.align === 'dt-container' || options.align === 'container') {
				if (left < buttonPosition.left) {
					left = -buttonPosition.left;
				}

				if (left + popoverSizes.width > tableSizes.width) {
					left = tableSizes.width - popoverSizes.width;
				}
			}

			// Window adjustment
			if (containerPosition.left + left + popoverSizes.width > $(window).width()) {
				// Overflowing the document to the right
				left = $(window).width() - popoverSizes.width - containerPosition.left;
			}

			if (buttonOffset.left + left < 0) {
				// Off to the left of the document
				left = -buttonOffset.left;
			}

			if (containerPosition.top + top + popoverSizes.height > $(window).height() + $(window).scrollTop()) {
				// Pop up if otherwise we'd need the user to scroll down
				top = buttonPosition.top - popoverSizes.height - popoverSizes.marginTop - popoverSizes.marginBottom;
			}

			if (containerPosition.top + top < $(window).scrollTop()) {
				// Correction for when the top is beyond the top of the page
				top = buttonPosition.top + hostNode.outerHeight();
			}

			// Calculations all done - now set it
			display.css( {
				top: top,
				left: left
			} );
		}
		else {
			// Fix position - centre on screen
			var position = function () {
				var half = $(window).height() / 2;

				var top = display.height() / 2;
				if ( top > half ) {
					top = half;
				}

				display.css( 'marginTop', top*-1 );
			};

			position();

			$(window).on('resize.dtb-collection', function () {
				position();
			});
		}

		if ( options.background ) {
			Buttons.background(
				true,
				options.backgroundClassName,
				options.fade,
				options.backgroundHost || hostNode
			);
		}

		// This is bonkers, but if we don't have a click listener on the
		// background element, iOS Safari will ignore the body click
		// listener below. An empty function here is all that is
		// required to make it work...
		$('div.dt-button-background').on( 'click.dtb-collection', function () {} );

		if ( options.autoClose ) {
			setTimeout( function () {
				dt.on( 'buttons-action.b-internal', function (e, btn, dt, node) {
					if ( node[0] === hostNode[0] ) {
						return;
					}
					close();
				} );
			}, 0);
		}
		
		$(display).trigger('buttons-popover.dt');


		dt.on('destroy', close);

		setTimeout(function() {
			closed = false;
			$('body')
				.on( 'click.dtb-collection', function (e) {
					if (closed) {
						return;
					}

					// andSelf is deprecated in jQ1.8, but we want 1.7 compat
					var back = $.fn.addBack ? 'addBack' : 'andSelf';
					var parent = $(e.target).parent()[0];
	
					if (( ! $(e.target).parents()[back]().filter( content ).length  && !$(parent).hasClass('dt-buttons')) || $(e.target).hasClass('dt-button-background')) {
						close();
					}
				} )
				.on( 'keyup.dtb-collection', function (e) {
					if ( e.keyCode === 27 ) {
						close();
					}
				} )
				.on( 'keydown.dtb-collection', function (e) {
					// Focus trap for tab key
					var elements = $('a, button', content);
					var active = document.activeElement;

					if (e.keyCode !== 9) { // tab
						return;
					}

					if (elements.index(active) === -1) {
						// If current focus is not inside the popover
						elements.first().focus();
						e.preventDefault();
					}
					else if (e.shiftKey) {
						// Reverse tabbing order when shift key is pressed
						if (active === elements[0]) {
							elements.last().focus();
							e.preventDefault();
						}
					}
					else {
						if (active === elements.last()[0]) {
							elements.first().focus();
							e.preventDefault();
						}
					}
				} );
		}, 0);
	}
} );



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Statics
 */

/**
 * Show / hide a background layer behind a collection
 * @param  {boolean} Flag to indicate if the background should be shown or
 *   hidden 
 * @param  {string} Class to assign to the background
 * @static
 */
Buttons.background = function ( show, className, fade, insertPoint ) {
	if ( fade === undefined ) {
		fade = 400;
	}
	if ( ! insertPoint ) {
		insertPoint = document.body;
	}

	if ( show ) {
		_fadeIn(
			$('<div/>')
				.addClass( className )
				.css( 'display', 'none' )
				.insertAfter( insertPoint ),
			fade
		);
	}
	else {
		_fadeOut(
			$('div.'+className),
			fade,
			function () {
				$(this)
					.removeClass( className )
					.remove();
			}
		);
	}
};

/**
 * Instance selector - select Buttons instances based on an instance selector
 * value from the buttons assigned to a DataTable. This is only useful if
 * multiple instances are attached to a DataTable.
 * @param  {string|int|array} Instance selector - see `instance-selector`
 *   documentation on the DataTables site
 * @param  {array} Button instance array that was attached to the DataTables
 *   settings object
 * @return {array} Buttons instances
 * @static
 */
Buttons.instanceSelector = function ( group, buttons )
{
	if ( group === undefined || group === null ) {
		return $.map( buttons, function ( v ) {
			return v.inst;
		} );
	}

	var ret = [];
	var names = $.map( buttons, function ( v ) {
		return v.name;
	} );

	// Flatten the group selector into an array of single options
	var process = function ( input ) {
		if ( Array.isArray( input ) ) {
			for ( var i=0, ien=input.length ; i<ien ; i++ ) {
				process( input[i] );
			}
			return;
		}

		if ( typeof input === 'string' ) {
			if ( input.indexOf( ',' ) !== -1 ) {
				// String selector, list of names
				process( input.split(',') );
			}
			else {
				// String selector individual name
				var idx = $.inArray( input.trim(), names );

				if ( idx !== -1 ) {
					ret.push( buttons[ idx ].inst );
				}
			}
		}
		else if ( typeof input === 'number' ) {
			// Index selector
			ret.push( buttons[ input ].inst );
		}
		else if ( typeof input === 'object' ) {
			// Actual instance selector
			ret.push( input );
		}
	};
	
	process( group );

	return ret;
};

/**
 * Button selector - select one or more buttons from a selector input so some
 * operation can be performed on them.
 * @param  {array} Button instances array that the selector should operate on
 * @param  {string|int|node|jQuery|array} Button selector - see
 *   `button-selector` documentation on the DataTables site
 * @return {array} Array of objects containing `inst` and `idx` properties of
 *   the selected buttons so you know which instance each button belongs to.
 * @static
 */
Buttons.buttonSelector = function ( insts, selector )
{
	var ret = [];
	var nodeBuilder = function ( a, buttons, baseIdx ) {
		var button;
		var idx;

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			button = buttons[i];

			if ( button ) {
				idx = baseIdx !== undefined ?
					baseIdx+i :
					i+'';

				a.push( {
					node: button.node,
					name: button.conf.name,
					idx:  idx
				} );

				if ( button.buttons ) {
					nodeBuilder( a, button.buttons, idx+'-' );
				}
			}
		}
	};

	var run = function ( selector, inst ) {
		var i, ien;
		var buttons = [];
		nodeBuilder( buttons, inst.s.buttons );

		var nodes = $.map( buttons, function (v) {
			return v.node;
		} );

		if ( Array.isArray( selector ) || selector instanceof $ ) {
			for ( i=0, ien=selector.length ; i<ien ; i++ ) {
				run( selector[i], inst );
			}
			return;
		}

		if ( selector === null || selector === undefined || selector === '*' ) {
			// Select all
			for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
				ret.push( {
					inst: inst,
					node: buttons[i].node
				} );
			}
		}
		else if ( typeof selector === 'number' ) {
			// Main button index selector
			if (inst.s.buttons[ selector ]) {
				ret.push( {
					inst: inst,
					node: inst.s.buttons[ selector ].node
				} );
			}
		}
		else if ( typeof selector === 'string' ) {
			if ( selector.indexOf( ',' ) !== -1 ) {
				// Split
				var a = selector.split(',');

				for ( i=0, ien=a.length ; i<ien ; i++ ) {
					run( a[i].trim(), inst );
				}
			}
			else if ( selector.match( /^\d+(\-\d+)*$/ ) ) {
				// Sub-button index selector
				var indexes = $.map( buttons, function (v) {
					return v.idx;
				} );

				ret.push( {
					inst: inst,
					node: buttons[ $.inArray( selector, indexes ) ].node
				} );
			}
			else if ( selector.indexOf( ':name' ) !== -1 ) {
				// Button name selector
				var name = selector.replace( ':name', '' );

				for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
					if ( buttons[i].name === name ) {
						ret.push( {
							inst: inst,
							node: buttons[i].node
						} );
					}
				}
			}
			else {
				// jQuery selector on the nodes
				$( nodes ).filter( selector ).each( function () {
					ret.push( {
						inst: inst,
						node: this
					} );
				} );
			}
		}
		else if ( typeof selector === 'object' && selector.nodeName ) {
			// Node selector
			var idx = $.inArray( selector, nodes );

			if ( idx !== -1 ) {
				ret.push( {
					inst: inst,
					node: nodes[ idx ]
				} );
			}
		}
	};


	for ( var i=0, ien=insts.length ; i<ien ; i++ ) {
		var inst = insts[i];

		run( selector, inst );
	}

	return ret;
};

/**
 * Default function used for formatting output data.
 * @param {*} str Data to strip
 */
Buttons.stripData = function ( str, config ) {
	if ( typeof str !== 'string' ) {
		return str;
	}

	// Always remove script tags
	str = str.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '' );

	// Always remove comments
	str = str.replace( /<!\-\-.*?\-\->/g, '' );

	if ( ! config || config.stripHtml ) {
		str = str.replace( /<[^>]*>/g, '' );
	}

	if ( ! config || config.trim ) {
		str = str.replace( /^\s+|\s+$/g, '' );
	}

	if ( ! config || config.stripNewlines ) {
		str = str.replace( /\n/g, ' ' );
	}

	if ( ! config || config.decodeEntities ) {
		_exportTextarea.innerHTML = str;
		str = _exportTextarea.value;
	}

	return str;
};


/**
 * Buttons defaults. For full documentation, please refer to the docs/option
 * directory or the DataTables site.
 * @type {Object}
 * @static
 */
Buttons.defaults = {
	buttons: [ 'copy', 'excel', 'csv', 'pdf', 'print' ],
	name: 'main',
	tabIndex: 0,
	dom: {
		container: {
			tag: 'div',
			className: 'dt-buttons'
		},
		collection: {
			tag: 'div',
			className: ''
		},
		button: {
			tag: 'button',
			className: 'dt-button',
			active: 'active',
			disabled: 'disabled',
			spacerClass: ''
		},
		buttonLiner: {
			tag: 'span',
			className: ''
		},
		split: {
			tag: 'div',
			className: 'dt-button-split',
		},
		splitWrapper: {
			tag: 'div',
			className: 'dt-btn-split-wrapper',
		},
		splitDropdown: {
			tag: 'button',
			text: '&#x25BC;',
			className: 'dt-btn-split-drop',
			align: 'split-right',
			splitAlignClass: 'dt-button-split-left'
		},
		splitDropdownButton: {
			tag: 'button',
			className: 'dt-btn-split-drop-button dt-button',
		},
		splitCollection: {
			tag: 'div',
			className: 'dt-button-split-collection',
		}
	}
};

/**
 * Version information
 * @type {string}
 * @static
 */
Buttons.version = '2.2.3';


$.extend( _dtButtons, {
	collection: {
		text: function ( dt ) {
			return dt.i18n( 'buttons.collection', 'Collection' );
		},
		className: 'buttons-collection',
		closeButton: false,
		init: function ( dt, button, config ) {
			button.attr( 'aria-expanded', false );
		},
		action: function ( e, dt, button, config ) {
			if ( config._collection.parents('body').length ) {
				this.popover(false, config);
			}
			else {
				this.popover(config._collection, config);
			}

			// When activated using a key - auto focus on the
			// first item in the popover
			if (e.type === 'keypress') {
				$('a, button', config._collection).eq(0).focus();
			}
		},
		attr: {
			'aria-haspopup': 'dialog'
		}
		// Also the popover options, defined in Buttons.popover
	},
	split: {
		text: function ( dt ) {
			return dt.i18n( 'buttons.split', 'Split' );
		},
		className: 'buttons-split',
		closeButton: false,
		init: function ( dt, button, config ) {
			return button.attr( 'aria-expanded', false );
		},
		action: function ( e, dt, button, config ) {
			this.popover(config._collection, config);
		},
		attr: {
			'aria-haspopup': 'dialog'
		}
		// Also the popover options, defined in Buttons.popover
	},
	copy: function ( dt, conf ) {
		if ( _dtButtons.copyHtml5 ) {
			return 'copyHtml5';
		}
	},
	csv: function ( dt, conf ) {
		if ( _dtButtons.csvHtml5 && _dtButtons.csvHtml5.available( dt, conf ) ) {
			return 'csvHtml5';
		}
	},
	excel: function ( dt, conf ) {
		if ( _dtButtons.excelHtml5 && _dtButtons.excelHtml5.available( dt, conf ) ) {
			return 'excelHtml5';
		}
	},
	pdf: function ( dt, conf ) {
		if ( _dtButtons.pdfHtml5 && _dtButtons.pdfHtml5.available( dt, conf ) ) {
			return 'pdfHtml5';
		}
	},
	pageLength: function ( dt ) {
		var lengthMenu = dt.settings()[0].aLengthMenu;
		var vals = [];
		var lang = [];
		var text = function ( dt ) {
			return dt.i18n( 'buttons.pageLength', {
				"-1": 'Show all rows',
				_:    'Show %d rows'
			}, dt.page.len() );
		};

		// Support for DataTables 1.x 2D array
		if (Array.isArray( lengthMenu[0] )) {
			vals = lengthMenu[0];
			lang = lengthMenu[1];
		}
		else {
			for (var i=0 ; i<lengthMenu.length ; i++) {
				var option = lengthMenu[i];

				// Support for DataTables 2 object in the array
				if ($.isPlainObject(option)) {
					vals.push(option.value);
					lang.push(option.label);
				}
				else {
					vals.push(option);
					lang.push(option);
				}
			}
		}

		return {
			extend: 'collection',
			text: text,
			className: 'buttons-page-length',
			autoClose: true,
			buttons: $.map( vals, function ( val, i ) {
				return {
					text: lang[i],
					className: 'button-page-length',
					action: function ( e, dt ) {
						dt.page.len( val ).draw();
					},
					init: function ( dt, node, conf ) {
						var that = this;
						var fn = function () {
							that.active( dt.page.len() === val );
						};

						dt.on( 'length.dt'+conf.namespace, fn );
						fn();
					},
					destroy: function ( dt, node, conf ) {
						dt.off( 'length.dt'+conf.namespace );
					}
				};
			} ),
			init: function ( dt, node, conf ) {
				var that = this;
				dt.on( 'length.dt'+conf.namespace, function () {
					that.text( conf.text );
				} );
			},
			destroy: function ( dt, node, conf ) {
				dt.off( 'length.dt'+conf.namespace );
			}
		};
	},
	spacer: {
		style: 'empty',
		spacer: true,
		text: function ( dt ) {
			return dt.i18n( 'buttons.spacer', '' );
		}
	}
} );


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API
 *
 * For complete documentation, please refer to the docs/api directory or the
 * DataTables site
 */

// Buttons group and individual button selector
DataTable.Api.register( 'buttons()', function ( group, selector ) {
	// Argument shifting
	if ( selector === undefined ) {
		selector = group;
		group = undefined;
	}

	this.selector.buttonGroup = group;

	var res = this.iterator( true, 'table', function ( ctx ) {
		if ( ctx._buttons ) {
			return Buttons.buttonSelector(
				Buttons.instanceSelector( group, ctx._buttons ),
				selector
			);
		}
	}, true );

	res._groupSelector = group;
	return res;
} );

// Individual button selector
DataTable.Api.register( 'button()', function ( group, selector ) {
	// just run buttons() and truncate
	var buttons = this.buttons( group, selector );

	if ( buttons.length > 1 ) {
		buttons.splice( 1, buttons.length );
	}

	return buttons;
} );

// Active buttons
DataTable.Api.registerPlural( 'buttons().active()', 'button().active()', function ( flag ) {
	if ( flag === undefined ) {
		return this.map( function ( set ) {
			return set.inst.active( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.active( set.node, flag );
	} );
} );

// Get / set button action
DataTable.Api.registerPlural( 'buttons().action()', 'button().action()', function ( action ) {
	if ( action === undefined ) {
		return this.map( function ( set ) {
			return set.inst.action( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.action( set.node, action );
	} );
} );

// Collection control
DataTable.Api.registerPlural( 'buttons().collectionRebuild()', 'button().collectionRebuild()', function ( buttons ) {
	return this.each( function ( set ) {
		for(var i = 0; i < buttons.length; i++) {
			if(typeof buttons[i] === 'object') {
				buttons[i].parentConf = set;
			}
		}
		set.inst.collectionRebuild( set.node, buttons );
	} );
} );

// Enable / disable buttons
DataTable.Api.register( ['buttons().enable()', 'button().enable()'], function ( flag ) {
	return this.each( function ( set ) {
		set.inst.enable( set.node, flag );
	} );
} );

// Disable buttons
DataTable.Api.register( ['buttons().disable()', 'button().disable()'], function () {
	return this.each( function ( set ) {
		set.inst.disable( set.node );
	} );
} );

// Button index
DataTable.Api.register( 'button().index()', function () {
	var idx = null;

	this.each( function ( set ) {
		var res = set.inst.index( set.node );

		if (res !== null) {
			idx = res;
		}
	} );

	return idx;
} );

// Get button nodes
DataTable.Api.registerPlural( 'buttons().nodes()', 'button().node()', function () {
	var jq = $();

	// jQuery will automatically reduce duplicates to a single entry
	$( this.each( function ( set ) {
		jq = jq.add( set.inst.node( set.node ) );
	} ) );

	return jq;
} );

// Get / set button processing state
DataTable.Api.registerPlural( 'buttons().processing()', 'button().processing()', function ( flag ) {
	if ( flag === undefined ) {
		return this.map( function ( set ) {
			return set.inst.processing( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.processing( set.node, flag );
	} );
} );

// Get / set button text (i.e. the button labels)
DataTable.Api.registerPlural( 'buttons().text()', 'button().text()', function ( label ) {
	if ( label === undefined ) {
		return this.map( function ( set ) {
			return set.inst.text( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.text( set.node, label );
	} );
} );

// Trigger a button's action
DataTable.Api.registerPlural( 'buttons().trigger()', 'button().trigger()', function () {
	return this.each( function ( set ) {
		set.inst.node( set.node ).trigger( 'click' );
	} );
} );

// Button resolver to the popover
DataTable.Api.register( 'button().popover()', function (content, options) {
	return this.map( function ( set ) {
		return set.inst._popover( content, this.button(this[0].node), options );
	} );
} );

// Get the container elements
DataTable.Api.register( 'buttons().containers()', function () {
	var jq = $();
	var groupSelector = this._groupSelector;

	// We need to use the group selector directly, since if there are no buttons
	// the result set will be empty
	this.iterator( true, 'table', function ( ctx ) {
		if ( ctx._buttons ) {
			var insts = Buttons.instanceSelector( groupSelector, ctx._buttons );

			for ( var i=0, ien=insts.length ; i<ien ; i++ ) {
				jq = jq.add( insts[i].container() );
			}
		}
	} );

	return jq;
} );

DataTable.Api.register( 'buttons().container()', function () {
	// API level of nesting is `buttons()` so we can zip into the containers method
	return this.containers().eq(0);
} );

// Add a new button
DataTable.Api.register( 'button().add()', function ( idx, conf, draw ) {
	var ctx = this.context;

	// Don't use `this` as it could be empty - select the instances directly
	if ( ctx.length ) {
		var inst = Buttons.instanceSelector( this._groupSelector, ctx[0]._buttons );

		if ( inst.length ) {
			inst[0].add( conf, idx , draw);
		}
	}

	return this.button( this._groupSelector, idx );
} );

// Destroy the button sets selected
DataTable.Api.register( 'buttons().destroy()', function () {
	this.pluck( 'inst' ).unique().each( function ( inst ) {
		inst.destroy();
	} );

	return this;
} );

// Remove a button
DataTable.Api.registerPlural( 'buttons().remove()', 'buttons().remove()', function () {
	this.each( function ( set ) {
		set.inst.remove( set.node );
	} );

	return this;
} );

// Information box that can be used by buttons
var _infoTimer;
DataTable.Api.register( 'buttons.info()', function ( title, message, time ) {
	var that = this;

	if ( title === false ) {
		this.off('destroy.btn-info');
		_fadeOut(
			$('#datatables_buttons_info'),
			400,
			function () {
				$(this).remove();
			}
		);
		clearTimeout( _infoTimer );
		_infoTimer = null;

		return this;
	}

	if ( _infoTimer ) {
		clearTimeout( _infoTimer );
	}

	if ( $('#datatables_buttons_info').length ) {
		$('#datatables_buttons_info').remove();
	}

	title = title ? '<h2>'+title+'</h2>' : '';

	_fadeIn(
		$('<div id="datatables_buttons_info" class="dt-button-info"/>')
			.html( title )
			.append( $('<div/>')[ typeof message === 'string' ? 'html' : 'append' ]( message ) )
			.css( 'display', 'none' )
			.appendTo( 'body' )
	);

	if ( time !== undefined && time !== 0 ) {
		_infoTimer = setTimeout( function () {
			that.buttons.info( false );
		}, time );
	}

	this.on('destroy.btn-info', function () {
		that.buttons.info(false);
	});

	return this;
} );

// Get data from the table for export - this is common to a number of plug-in
// buttons so it is included in the Buttons core library
DataTable.Api.register( 'buttons.exportData()', function ( options ) {
	if ( this.context.length ) {
		return _exportData( new DataTable.Api( this.context[0] ), options );
	}
} );

// Get information about the export that is common to many of the export data
// types (DRY)
DataTable.Api.register( 'buttons.exportInfo()', function ( conf ) {
	if ( ! conf ) {
		conf = {};
	}

	return {
		filename: _filename( conf ),
		title: _title( conf ),
		messageTop: _message(this, conf.message || conf.messageTop, 'top'),
		messageBottom: _message(this, conf.messageBottom, 'bottom')
	};
} );



/**
 * Get the file name for an exported file.
 *
 * @param {object}	config Button configuration
 * @param {boolean} incExtension Include the file name extension
 */
var _filename = function ( config )
{
	// Backwards compatibility
	var filename = config.filename === '*' && config.title !== '*' && config.title !== undefined && config.title !== null && config.title !== '' ?
		config.title :
		config.filename;

	if ( typeof filename === 'function' ) {
		filename = filename();
	}

	if ( filename === undefined || filename === null ) {
		return null;
	}

	if ( filename.indexOf( '*' ) !== -1 ) {
		filename = filename.replace( '*', $('head > title').text() ).trim();
	}

	// Strip characters which the OS will object to
	filename = filename.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, "");

	var extension = _stringOrFunction( config.extension );
	if ( ! extension ) {
		extension = '';
	}

	return filename + extension;
};

/**
 * Simply utility method to allow parameters to be given as a function
 *
 * @param {undefined|string|function} option Option
 * @return {null|string} Resolved value
 */
var _stringOrFunction = function ( option )
{
	if ( option === null || option === undefined ) {
		return null;
	}
	else if ( typeof option === 'function' ) {
		return option();
	}
	return option;
};

/**
 * Get the title for an exported file.
 *
 * @param {object} config	Button configuration
 */
var _title = function ( config )
{
	var title = _stringOrFunction( config.title );

	return title === null ?
		null : title.indexOf( '*' ) !== -1 ?
			title.replace( '*', $('head > title').text() || 'Exported data' ) :
			title;
};

var _message = function ( dt, option, position )
{
	var message = _stringOrFunction( option );
	if ( message === null ) {
		return null;
	}

	var caption = $('caption', dt.table().container()).eq(0);
	if ( message === '*' ) {
		var side = caption.css( 'caption-side' );
		if ( side !== position ) {
			return null;
		}

		return caption.length ?
			caption.text() :
			'';
	}

	return message;
};




var _exportTextarea = $('<textarea/>')[0];
var _exportData = function ( dt, inOpts )
{
	var config = $.extend( true, {}, {
		rows:           null,
		columns:        '',
		modifier:       {
			search: 'applied',
			order:  'applied'
		},
		orthogonal:     'display',
		stripHtml:      true,
		stripNewlines:  true,
		decodeEntities: true,
		trim:           true,
		format:         {
			header: function ( d ) {
				return Buttons.stripData( d, config );
			},
			footer: function ( d ) {
				return Buttons.stripData( d, config );
			},
			body: function ( d ) {
				return Buttons.stripData( d, config );
			}
		},
		customizeData: null
	}, inOpts );

	var header = dt.columns( config.columns ).indexes().map( function (idx) {
		var el = dt.column( idx ).header();
		return config.format.header( el.innerHTML, idx, el );
	} ).toArray();

	var footer = dt.table().footer() ?
		dt.columns( config.columns ).indexes().map( function (idx) {
			var el = dt.column( idx ).footer();
			return config.format.footer( el ? el.innerHTML : '', idx, el );
		} ).toArray() :
		null;
	
	// If Select is available on this table, and any rows are selected, limit the export
	// to the selected rows. If no rows are selected, all rows will be exported. Specify
	// a `selected` modifier to control directly.
	var modifier = $.extend( {}, config.modifier );
	if ( dt.select && typeof dt.select.info === 'function' && modifier.selected === undefined ) {
		if ( dt.rows( config.rows, $.extend( { selected: true }, modifier ) ).any() ) {
			$.extend( modifier, { selected: true } )
		}
	}

	var rowIndexes = dt.rows( config.rows, modifier ).indexes().toArray();
	var selectedCells = dt.cells( rowIndexes, config.columns );
	var cells = selectedCells
		.render( config.orthogonal )
		.toArray();
	var cellNodes = selectedCells
		.nodes()
		.toArray();

	var columns = header.length;
	var rows = columns > 0 ? cells.length / columns : 0;
	var body = [];
	var cellCounter = 0;

	for ( var i=0, ien=rows ; i<ien ; i++ ) {
		var row = [ columns ];

		for ( var j=0 ; j<columns ; j++ ) {
			row[j] = config.format.body( cells[ cellCounter ], i, j, cellNodes[ cellCounter ] );
			cellCounter++;
		}

		body[i] = row;
	}

	var data = {
		header: header,
		footer: footer,
		body:   body
	};

	if ( config.customizeData ) {
		config.customizeData( data );
	}

	return data;
};


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables interface
 */

// Attach to DataTables objects for global access
$.fn.dataTable.Buttons = Buttons;
$.fn.DataTable.Buttons = Buttons;



// DataTables creation - check if the buttons have been defined for this table,
// they will have been if the `B` option was used in `dom`, otherwise we should
// create the buttons instance here so they can be inserted into the document
// using the API. Listen for `init` for compatibility with pre 1.10.10, but to
// be removed in future.
$(document).on( 'init.dt plugin-init.dt', function (e, settings) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	var opts = settings.oInit.buttons || DataTable.defaults.buttons;

	if ( opts && ! settings._buttons ) {
		new Buttons( settings, opts ).container();
	}
} );

function _init ( settings, options ) {
	var api = new DataTable.Api( settings );
	var opts = options
		? options
		: api.init().buttons || DataTable.defaults.buttons;

	return new Buttons( api, opts ).container();
}

// DataTables `dom` feature option
DataTable.ext.feature.push( {
	fnInit: _init,
	cFeature: "B"
} );

// DataTables 2 layout feature
if ( DataTable.ext.features ) {
	DataTable.ext.features.register( 'buttons', _init );
}


return Buttons;
}));


/*! DataTables styling wrapper for Buttons
 * ©2018 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-dt', 'datatables.net-buttons'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net-dt')(root, $).$;
			}

			if ( ! $.fn.dataTable.Buttons ) {
				require('datatables.net-buttons')(root, $);
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {

return $.fn.dataTable;

}));

/*! Select for DataTables 1.4.0
 * 2015-2021 SpryMedia Ltd - datatables.net/license/mit
 */

/**
 * @summary     Select for DataTables
 * @description A collection of API methods, events and buttons for DataTables
 *   that provides selection options of the items in a DataTable
 * @version     1.4.0
 * @file        dataTables.select.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     datatables.net/forums
 * @copyright   Copyright 2015-2021 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net/extensions/select
 */
(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


// Version information for debugger
DataTable.select = {};

DataTable.select.version = '1.4.0';

DataTable.select.init = function ( dt ) {
	var ctx = dt.settings()[0];

	if (ctx._select) {
		return;
	}

	var savedSelected = dt.state.loaded();

	var selectAndSave = function(e, settings, data) {
		if(data === null || data.select === undefined) {
			return;
		}

		// Clear any currently selected rows, before restoring state
		// None will be selected on first initialisation
		if (dt.rows({selected: true}).any()) {
			dt.rows().deselect();
		}
		if (data.select.rows !== undefined) {
			dt.rows(data.select.rows).select();
		}

		if (dt.columns({selected: true}).any()) {
			dt.columns().deselect();
		}
		if (data.select.columns !== undefined) {
			dt.columns(data.select.columns).select();
		}

		if (dt.cells({selected: true}).any()) {
			dt.cells().deselect();
		}
		if (data.select.cells !== undefined) {
			for(var i = 0; i < data.select.cells.length; i++) {
				dt.cell(data.select.cells[i].row, data.select.cells[i].column).select();
			}
		}
		dt.state.save();
	}
	
	dt.one('init', function() {
		dt.on('stateSaveParams', function(e, settings, data) {
			data.select = {};
			data.select.rows = dt.rows({selected:true}).ids(true).toArray();
			data.select.columns = dt.columns({selected:true})[0];
			data.select.cells = dt.cells({selected:true})[0].map(function(coords) {
				return {row: dt.row(coords.row).id(true), column: coords.column}
			});
		})
		
		selectAndSave(undefined, undefined, savedSelected)
		dt.on('stateLoaded stateLoadParams', selectAndSave)
	})

	var init = ctx.oInit.select;
	var defaults = DataTable.defaults.select;
	var opts = init === undefined ?
		defaults :
		init;

	// Set defaults
	var items = 'row';
	var style = 'api';
	var blurable = false;
	var toggleable = true;
	var info = true;
	var selector = 'td, th';
	var className = 'selected';
	var setStyle = false;

	ctx._select = {};

	// Initialisation customisations
	if ( opts === true ) {
		style = 'os';
		setStyle = true;
	}
	else if ( typeof opts === 'string' ) {
		style = opts;
		setStyle = true;
	}
	else if ( $.isPlainObject( opts ) ) {
		if ( opts.blurable !== undefined ) {
			blurable = opts.blurable;
		}
		
		if ( opts.toggleable !== undefined ) {
			toggleable = opts.toggleable;
		}

		if ( opts.info !== undefined ) {
			info = opts.info;
		}

		if ( opts.items !== undefined ) {
			items = opts.items;
		}

		if ( opts.style !== undefined ) {
			style = opts.style;
			setStyle = true;
		}
		else {
			style = 'os';
			setStyle = true;
		}

		if ( opts.selector !== undefined ) {
			selector = opts.selector;
		}

		if ( opts.className !== undefined ) {
			className = opts.className;
		}
	}

	dt.select.selector( selector );
	dt.select.items( items );
	dt.select.style( style );
	dt.select.blurable( blurable );
	dt.select.toggleable( toggleable );
	dt.select.info( info );
	ctx._select.className = className;


	// Sort table based on selected rows. Requires Select Datatables extension
	$.fn.dataTable.ext.order['select-checkbox'] = function ( settings, col ) {
		return this.api().column( col, {order: 'index'} ).nodes().map( function ( td ) {
			if ( settings._select.items === 'row' ) {
				return $( td ).parent().hasClass( settings._select.className );
			} else if ( settings._select.items === 'cell' ) {
				return $( td ).hasClass( settings._select.className );
			}
			return false;
		});
	};

	// If the init options haven't enabled select, but there is a selectable
	// class name, then enable
	if ( ! setStyle && $( dt.table().node() ).hasClass( 'selectable' ) ) {
		dt.select.style( 'os' );
	}
};

/*

Select is a collection of API methods, event handlers, event emitters and
buttons (for the `Buttons` extension) for DataTables. It provides the following
features, with an overview of how they are implemented:

## Selection of rows, columns and cells. Whether an item is selected or not is
   stored in:

* rows: a `_select_selected` property which contains a boolean value of the
  DataTables' `aoData` object for each row
* columns: a `_select_selected` property which contains a boolean value of the
  DataTables' `aoColumns` object for each column
* cells: a `_selected_cells` property which contains an array of boolean values
  of the `aoData` object for each row. The array is the same length as the
  columns array, with each element of it representing a cell.

This method of using boolean flags allows Select to operate when nodes have not
been created for rows / cells (DataTables' defer rendering feature).

## API methods

A range of API methods are available for triggering selection and de-selection
of rows. Methods are also available to configure the selection events that can
be triggered by an end user (such as which items are to be selected). To a large
extent, these of API methods *is* Select. It is basically a collection of helper
functions that can be used to select items in a DataTable.

Configuration of select is held in the object `_select` which is attached to the
DataTables settings object on initialisation. Select being available on a table
is not optional when Select is loaded, but its default is for selection only to
be available via the API - so the end user wouldn't be able to select rows
without additional configuration.

The `_select` object contains the following properties:

```
{
	items:string       - Can be `rows`, `columns` or `cells`. Defines what item 
	                     will be selected if the user is allowed to activate row
	                     selection using the mouse.
	style:string       - Can be `none`, `single`, `multi` or `os`. Defines the
	                     interaction style when selecting items
	blurable:boolean   - If row selection can be cleared by clicking outside of
	                     the table
	toggleable:boolean - If row selection can be cancelled by repeated clicking
	                     on the row
	info:boolean       - If the selection summary should be shown in the table
	                     information elements
}
```

In addition to the API methods, Select also extends the DataTables selector
options for rows, columns and cells adding a `selected` option to the selector
options object, allowing the developer to select only selected items or
unselected items.

## Mouse selection of items

Clicking on items can be used to select items. This is done by a simple event
handler that will select the items using the API methods.

 */


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Local functions
 */

/**
 * Add one or more cells to the selection when shift clicking in OS selection
 * style cell selection.
 *
 * Cell range is more complicated than row and column as we want to select
 * in the visible grid rather than by index in sequence. For example, if you
 * click first in cell 1-1 and then shift click in 2-2 - cells 1-2 and 2-1
 * should also be selected (and not 1-3, 1-4. etc)
 * 
 * @param  {DataTable.Api} dt   DataTable
 * @param  {object}        idx  Cell index to select to
 * @param  {object}        last Cell index to select from
 * @private
 */
function cellRange( dt, idx, last )
{
	var indexes;
	var columnIndexes;
	var rowIndexes;
	var selectColumns = function ( start, end ) {
		if ( start > end ) {
			var tmp = end;
			end = start;
			start = tmp;
		}
		
		var record = false;
		return dt.columns( ':visible' ).indexes().filter( function (i) {
			if ( i === start ) {
				record = true;
			}
			
			if ( i === end ) { // not else if, as start might === end
				record = false;
				return true;
			}

			return record;
		} );
	};

	var selectRows = function ( start, end ) {
		var indexes = dt.rows( { search: 'applied' } ).indexes();

		// Which comes first - might need to swap
		if ( indexes.indexOf( start ) > indexes.indexOf( end ) ) {
			var tmp = end;
			end = start;
			start = tmp;
		}

		var record = false;
		return indexes.filter( function (i) {
			if ( i === start ) {
				record = true;
			}
			
			if ( i === end ) {
				record = false;
				return true;
			}

			return record;
		} );
	};

	if ( ! dt.cells( { selected: true } ).any() && ! last ) {
		// select from the top left cell to this one
		columnIndexes = selectColumns( 0, idx.column );
		rowIndexes = selectRows( 0 , idx.row );
	}
	else {
		// Get column indexes between old and new
		columnIndexes = selectColumns( last.column, idx.column );
		rowIndexes = selectRows( last.row , idx.row );
	}

	indexes = dt.cells( rowIndexes, columnIndexes ).flatten();

	if ( ! dt.cells( idx, { selected: true } ).any() ) {
		// Select range
		dt.cells( indexes ).select();
	}
	else {
		// Deselect range
		dt.cells( indexes ).deselect();
	}
}

/**
 * Disable mouse selection by removing the selectors
 *
 * @param {DataTable.Api} dt DataTable to remove events from
 * @private
 */
function disableMouseSelection( dt )
{
	var ctx = dt.settings()[0];
	var selector = ctx._select.selector;

	$( dt.table().container() )
		.off( 'mousedown.dtSelect', selector )
		.off( 'mouseup.dtSelect', selector )
		.off( 'click.dtSelect', selector );

	$('body').off( 'click.dtSelect' + _safeId(dt.table().node()) );
}

/**
 * Attach mouse listeners to the table to allow mouse selection of items
 *
 * @param {DataTable.Api} dt DataTable to remove events from
 * @private
 */
function enableMouseSelection ( dt )
{
	var container = $( dt.table().container() );
	var ctx = dt.settings()[0];
	var selector = ctx._select.selector;
	var matchSelection;

	container
		.on( 'mousedown.dtSelect', selector, function(e) {
			// Disallow text selection for shift clicking on the table so multi
			// element selection doesn't look terrible!
			if ( e.shiftKey || e.metaKey || e.ctrlKey ) {
				container
					.css( '-moz-user-select', 'none' )
					.one('selectstart.dtSelect', selector, function () {
						return false;
					} );
			}

			if ( window.getSelection ) {
				matchSelection = window.getSelection();
			}
		} )
		.on( 'mouseup.dtSelect', selector, function() {
			// Allow text selection to occur again, Mozilla style (tested in FF
			// 35.0.1 - still required)
			container.css( '-moz-user-select', '' );
		} )
		.on( 'click.dtSelect', selector, function ( e ) {
			var items = dt.select.items();
			var idx;

			// If text was selected (click and drag), then we shouldn't change
			// the row's selected state
			if ( matchSelection ) {
				var selection = window.getSelection();

				// If the element that contains the selection is not in the table, we can ignore it
				// This can happen if the developer selects text from the click event
				if ( ! selection.anchorNode || $(selection.anchorNode).closest('table')[0] === dt.table().node() ) {
					if ( selection !== matchSelection ) {
						return;
					}
				}
			}

			var ctx = dt.settings()[0];
			var wrapperClass = dt.settings()[0].oClasses.sWrapper.trim().replace(/ +/g, '.');

			// Ignore clicks inside a sub-table
			if ( $(e.target).closest('div.'+wrapperClass)[0] != dt.table().container() ) {
				return;
			}

			var cell = dt.cell( $(e.target).closest('td, th') );

			// Check the cell actually belongs to the host DataTable (so child
			// rows, etc, are ignored)
			if ( ! cell.any() ) {
				return;
			}

			var event = $.Event('user-select.dt');
			eventTrigger( dt, event, [ items, cell, e ] );

			if ( event.isDefaultPrevented() ) {
				return;
			}

			var cellIndex = cell.index();
			if ( items === 'row' ) {
				idx = cellIndex.row;
				typeSelect( e, dt, ctx, 'row', idx );
			}
			else if ( items === 'column' ) {
				idx = cell.index().column;
				typeSelect( e, dt, ctx, 'column', idx );
			}
			else if ( items === 'cell' ) {
				idx = cell.index();
				typeSelect( e, dt, ctx, 'cell', idx );
			}

			ctx._select_lastCell = cellIndex;
		} );

	// Blurable
	$('body').on( 'click.dtSelect' + _safeId(dt.table().node()), function ( e ) {
		if ( ctx._select.blurable ) {
			// If the click was inside the DataTables container, don't blur
			if ( $(e.target).parents().filter( dt.table().container() ).length ) {
				return;
			}

			// Ignore elements which have been removed from the DOM (i.e. paging
			// buttons)
			if ( $(e.target).parents('html').length === 0 ) {
			 	return;
			}

			// Don't blur in Editor form
			if ( $(e.target).parents('div.DTE').length ) {
				return;
			}

			var event = $.Event('select-blur.dt');
			eventTrigger( dt, event, [ e.target, e ] );

			if ( event.isDefaultPrevented() ) {
				return;
			}

			clear( ctx, true );
		}
	} );
}

/**
 * Trigger an event on a DataTable
 *
 * @param {DataTable.Api} api      DataTable to trigger events on
 * @param  {boolean}      selected true if selected, false if deselected
 * @param  {string}       type     Item type acting on
 * @param  {boolean}      any      Require that there are values before
 *     triggering
 * @private
 */
function eventTrigger ( api, type, args, any )
{
	if ( any && ! api.flatten().length ) {
		return;
	}

	if ( typeof type === 'string' ) {
		type = type +'.dt';
	}

	args.unshift( api );

	$(api.table().node()).trigger( type, args );
}

/**
 * Update the information element of the DataTable showing information about the
 * items selected. This is done by adding tags to the existing text
 * 
 * @param {DataTable.Api} api DataTable to update
 * @private
 */
function info ( api )
{
	var ctx = api.settings()[0];

	if ( ! ctx._select.info || ! ctx.aanFeatures.i ) {
		return;
	}

	if ( api.select.style() === 'api' ) {
		return;
	}

	var rows    = api.rows( { selected: true } ).flatten().length;
	var columns = api.columns( { selected: true } ).flatten().length;
	var cells   = api.cells( { selected: true } ).flatten().length;

	var add = function ( el, name, num ) {
		el.append( $('<span class="select-item"/>').append( api.i18n(
			'select.'+name+'s',
			{ _: '%d '+name+'s selected', 0: '', 1: '1 '+name+' selected' },
			num
		) ) );
	};

	// Internal knowledge of DataTables to loop over all information elements
	$.each( ctx.aanFeatures.i, function ( i, el ) {
		el = $(el);

		var output  = $('<span class="select-info"/>');
		add( output, 'row', rows );
		add( output, 'column', columns );
		add( output, 'cell', cells  );

		var exisiting = el.children('span.select-info');
		if ( exisiting.length ) {
			exisiting.remove();
		}

		if ( output.text() !== '' ) {
			el.append( output );
		}
	} );
}

/**
 * Initialisation of a new table. Attach event handlers and callbacks to allow
 * Select to operate correctly.
 *
 * This will occur _after_ the initial DataTables initialisation, although
 * before Ajax data is rendered, if there is ajax data
 *
 * @param  {DataTable.settings} ctx Settings object to operate on
 * @private
 */
function init ( ctx ) {
	var api = new DataTable.Api( ctx );
	ctx._select_init = true;

	// Row callback so that classes can be added to rows and cells if the item
	// was selected before the element was created. This will happen with the
	// `deferRender` option enabled.
	// 
	// This method of attaching to `aoRowCreatedCallback` is a hack until
	// DataTables has proper events for row manipulation If you are reviewing
	// this code to create your own plug-ins, please do not do this!
	ctx.aoRowCreatedCallback.push( {
		fn: function ( row, data, index ) {
			var i, ien;
			var d = ctx.aoData[ index ];

			// Row
			if ( d._select_selected ) {
				$( row ).addClass( ctx._select.className );
			}

			// Cells and columns - if separated out, we would need to do two
			// loops, so it makes sense to combine them into a single one
			for ( i=0, ien=ctx.aoColumns.length ; i<ien ; i++ ) {
				if ( ctx.aoColumns[i]._select_selected || (d._selected_cells && d._selected_cells[i]) ) {
					$(d.anCells[i]).addClass( ctx._select.className );
				}
			}
		},
		sName: 'select-deferRender'
	} );

	// On Ajax reload we want to reselect all rows which are currently selected,
	// if there is an rowId (i.e. a unique value to identify each row with)
	api.on( 'preXhr.dt.dtSelect', function (e, settings) {
		if (settings !== api.settings()[0]) {
			// Not triggered by our DataTable!
			return;
		}

		// note that column selection doesn't need to be cached and then
		// reselected, as they are already selected
		var rows = api.rows( { selected: true } ).ids( true ).filter( function ( d ) {
			return d !== undefined;
		} );

		var cells = api.cells( { selected: true } ).eq(0).map( function ( cellIdx ) {
			var id = api.row( cellIdx.row ).id( true );
			return id ?
				{ row: id, column: cellIdx.column } :
				undefined;
		} ).filter( function ( d ) {
			return d !== undefined;
		} );

		// On the next draw, reselect the currently selected items
		api.one( 'draw.dt.dtSelect', function () {
			api.rows( rows ).select();

			// `cells` is not a cell index selector, so it needs a loop
			if ( cells.any() ) {
				cells.each( function ( id ) {
					api.cells( id.row, id.column ).select();
				} );
			}
		} );
	} );

	// Update the table information element with selected item summary
	api.on( 'draw.dtSelect.dt select.dtSelect.dt deselect.dtSelect.dt info.dt', function () {
		info( api );
		api.state.save();
	} );

	// Clean up and release
	api.on( 'destroy.dtSelect', function () {
		api.rows({selected: true}).deselect();

		disableMouseSelection( api );
		api.off( '.dtSelect' );
		$('body').off('.dtSelect' + _safeId(api.table().node()));
	} );
}

/**
 * Add one or more items (rows or columns) to the selection when shift clicking
 * in OS selection style
 *
 * @param  {DataTable.Api} dt   DataTable
 * @param  {string}        type Row or column range selector
 * @param  {object}        idx  Item index to select to
 * @param  {object}        last Item index to select from
 * @private
 */
function rowColumnRange( dt, type, idx, last )
{
	// Add a range of rows from the last selected row to this one
	var indexes = dt[type+'s']( { search: 'applied' } ).indexes();
	var idx1 = $.inArray( last, indexes );
	var idx2 = $.inArray( idx, indexes );

	if ( ! dt[type+'s']( { selected: true } ).any() && idx1 === -1 ) {
		// select from top to here - slightly odd, but both Windows and Mac OS
		// do this
		indexes.splice( $.inArray( idx, indexes )+1, indexes.length );
	}
	else {
		// reverse so we can shift click 'up' as well as down
		if ( idx1 > idx2 ) {
			var tmp = idx2;
			idx2 = idx1;
			idx1 = tmp;
		}

		indexes.splice( idx2+1, indexes.length );
		indexes.splice( 0, idx1 );
	}

	if ( ! dt[type]( idx, { selected: true } ).any() ) {
		// Select range
		dt[type+'s']( indexes ).select();
	}
	else {
		// Deselect range - need to keep the clicked on row selected
		indexes.splice( $.inArray( idx, indexes ), 1 );
		dt[type+'s']( indexes ).deselect();
	}
}

/**
 * Clear all selected items
 *
 * @param  {DataTable.settings} ctx Settings object of the host DataTable
 * @param  {boolean} [force=false] Force the de-selection to happen, regardless
 *     of selection style
 * @private
 */
function clear( ctx, force )
{
	if ( force || ctx._select.style === 'single' ) {
		var api = new DataTable.Api( ctx );
		
		api.rows( { selected: true } ).deselect();
		api.columns( { selected: true } ).deselect();
		api.cells( { selected: true } ).deselect();
	}
}

/**
 * Select items based on the current configuration for style and items.
 *
 * @param  {object}             e    Mouse event object
 * @param  {DataTables.Api}     dt   DataTable
 * @param  {DataTable.settings} ctx  Settings object of the host DataTable
 * @param  {string}             type Items to select
 * @param  {int|object}         idx  Index of the item to select
 * @private
 */
function typeSelect ( e, dt, ctx, type, idx )
{
	var style = dt.select.style();
	var toggleable = dt.select.toggleable();
	var isSelected = dt[type]( idx, { selected: true } ).any();
	
	if ( isSelected && ! toggleable ) {
		return;
	}

	if ( style === 'os' ) {
		if ( e.ctrlKey || e.metaKey ) {
			// Add or remove from the selection
			dt[type]( idx ).select( ! isSelected );
		}
		else if ( e.shiftKey ) {
			if ( type === 'cell' ) {
				cellRange( dt, idx, ctx._select_lastCell || null );
			}
			else {
				rowColumnRange( dt, type, idx, ctx._select_lastCell ?
					ctx._select_lastCell[type] :
					null
				);
			}
		}
		else {
			// No cmd or shift click - deselect if selected, or select
			// this row only
			var selected = dt[type+'s']( { selected: true } );

			if ( isSelected && selected.flatten().length === 1 ) {
				dt[type]( idx ).deselect();
			}
			else {
				selected.deselect();
				dt[type]( idx ).select();
			}
		}
	} else if ( style == 'multi+shift' ) {
		if ( e.shiftKey ) {
			if ( type === 'cell' ) {
				cellRange( dt, idx, ctx._select_lastCell || null );
			}
			else {
				rowColumnRange( dt, type, idx, ctx._select_lastCell ?
					ctx._select_lastCell[type] :
					null
				);
			}
		}
		else {
			dt[ type ]( idx ).select( ! isSelected );
		}
	}
	else {
		dt[ type ]( idx ).select( ! isSelected );
	}
}

function _safeId( node ) {
	return node.id.replace(/[^a-zA-Z0-9\-\_]/g, '-');
}



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables selectors
 */

// row and column are basically identical just assigned to different properties
// and checking a different array, so we can dynamically create the functions to
// reduce the code size
$.each( [
	{ type: 'row', prop: 'aoData' },
	{ type: 'column', prop: 'aoColumns' }
], function ( i, o ) {
	DataTable.ext.selector[ o.type ].push( function ( settings, opts, indexes ) {
		var selected = opts.selected;
		var data;
		var out = [];

		if ( selected !== true && selected !== false ) {
			return indexes;
		}

		for ( var i=0, ien=indexes.length ; i<ien ; i++ ) {
			data = settings[ o.prop ][ indexes[i] ];

			if ( (selected === true && data._select_selected === true) ||
			     (selected === false && ! data._select_selected )
			) {
				out.push( indexes[i] );
			}
		}

		return out;
	} );
} );

DataTable.ext.selector.cell.push( function ( settings, opts, cells ) {
	var selected = opts.selected;
	var rowData;
	var out = [];

	if ( selected === undefined ) {
		return cells;
	}

	for ( var i=0, ien=cells.length ; i<ien ; i++ ) {
		rowData = settings.aoData[ cells[i].row ];

		if ( (selected === true && rowData._selected_cells && rowData._selected_cells[ cells[i].column ] === true) ||
		     (selected === false && ( ! rowData._selected_cells || ! rowData._selected_cells[ cells[i].column ] ) )
		) {
			out.push( cells[i] );
		}
	}

	return out;
} );



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API
 *
 * For complete documentation, please refer to the docs/api directory or the
 * DataTables site
 */

// Local variables to improve compression
var apiRegister = DataTable.Api.register;
var apiRegisterPlural = DataTable.Api.registerPlural;

apiRegister( 'select()', function () {
	return this.iterator( 'table', function ( ctx ) {
		DataTable.select.init( new DataTable.Api( ctx ) );
	} );
} );

apiRegister( 'select.blurable()', function ( flag ) {
	if ( flag === undefined ) {
		return this.context[0]._select.blurable;
	}

	return this.iterator( 'table', function ( ctx ) {
		ctx._select.blurable = flag;
	} );
} );

apiRegister( 'select.toggleable()', function ( flag ) {
	if ( flag === undefined ) {
		return this.context[0]._select.toggleable;
	}

	return this.iterator( 'table', function ( ctx ) {
		ctx._select.toggleable = flag;
	} );
} );

apiRegister( 'select.info()', function ( flag ) {
	if ( flag === undefined ) {
		return this.context[0]._select.info;
	}

	return this.iterator( 'table', function ( ctx ) {
		ctx._select.info = flag;
	} );
} );

apiRegister( 'select.items()', function ( items ) {
	if ( items === undefined ) {
		return this.context[0]._select.items;
	}

	return this.iterator( 'table', function ( ctx ) {
		ctx._select.items = items;

		eventTrigger( new DataTable.Api( ctx ), 'selectItems', [ items ] );
	} );
} );

// Takes effect from the _next_ selection. None disables future selection, but
// does not clear the current selection. Use the `deselect` methods for that
apiRegister( 'select.style()', function ( style ) {
	if ( style === undefined ) {
		return this.context[0]._select.style;
	}

	return this.iterator( 'table', function ( ctx ) {
		if ( ! ctx._select ) {
			DataTable.select.init( new DataTable.Api(ctx) );
		}

		if ( ! ctx._select_init ) {
			init(ctx);
		}

		ctx._select.style = style;

		// Add / remove mouse event handlers. They aren't required when only
		// API selection is available
		var dt = new DataTable.Api( ctx );
		disableMouseSelection( dt );
		
		if ( style !== 'api' ) {
			enableMouseSelection( dt );
		}

		eventTrigger( new DataTable.Api( ctx ), 'selectStyle', [ style ] );
	} );
} );

apiRegister( 'select.selector()', function ( selector ) {
	if ( selector === undefined ) {
		return this.context[0]._select.selector;
	}

	return this.iterator( 'table', function ( ctx ) {
		disableMouseSelection( new DataTable.Api( ctx ) );

		ctx._select.selector = selector;

		if ( ctx._select.style !== 'api' ) {
			enableMouseSelection( new DataTable.Api( ctx ) );
		}
	} );
} );



apiRegisterPlural( 'rows().select()', 'row().select()', function ( select ) {
	var api = this;

	if ( select === false ) {
		return this.deselect();
	}

	this.iterator( 'row', function ( ctx, idx ) {
		clear( ctx );

		ctx.aoData[ idx ]._select_selected = true;
		$( ctx.aoData[ idx ].nTr ).addClass( ctx._select.className );
	} );

	this.iterator( 'table', function ( ctx, i ) {
		eventTrigger( api, 'select', [ 'row', api[i] ], true );
	} );

	return this;
} );

apiRegister( 'row().selected()', function () {
	var ctx = this.context[0];

	if (
		ctx &&
		this.length &&
		ctx.aoData[this[0]] &&
		ctx.aoData[this[0]]._select_selected
	) {
		return true;
	}

	return false;
} );

apiRegisterPlural( 'columns().select()', 'column().select()', function ( select ) {
	var api = this;

	if ( select === false ) {
		return this.deselect();
	}

	this.iterator( 'column', function ( ctx, idx ) {
		clear( ctx );

		ctx.aoColumns[ idx ]._select_selected = true;

		var column = new DataTable.Api( ctx ).column( idx );

		$( column.header() ).addClass( ctx._select.className );
		$( column.footer() ).addClass( ctx._select.className );

		column.nodes().to$().addClass( ctx._select.className );
	} );

	this.iterator( 'table', function ( ctx, i ) {
		eventTrigger( api, 'select', [ 'column', api[i] ], true );
	} );

	return this;
} );

apiRegister( 'column().selected()', function () {
	var ctx = this.context[0];

	if (
		ctx &&
		this.length &&
		ctx.aoColumns[this[0]] &&
		ctx.aoColumns[this[0]]._select_selected
	) {
		return true;
	}

	return false;
} );

apiRegisterPlural( 'cells().select()', 'cell().select()', function ( select ) {
	var api = this;

	if ( select === false ) {
		return this.deselect();
	}

	this.iterator( 'cell', function ( ctx, rowIdx, colIdx ) {
		clear( ctx );

		var data = ctx.aoData[ rowIdx ];

		if ( data._selected_cells === undefined ) {
			data._selected_cells = [];
		}

		data._selected_cells[ colIdx ] = true;

		if ( data.anCells ) {
			$( data.anCells[ colIdx ] ).addClass( ctx._select.className );
		}
	} );

	this.iterator( 'table', function ( ctx, i ) {
		eventTrigger( api, 'select', [ 'cell', api.cells(api[i]).indexes().toArray() ], true );
	} );

	return this;
} );

apiRegister( 'cell().selected()', function () {
	var ctx = this.context[0];

	if (ctx && this.length) {
		var row = ctx.aoData[this[0][0].row];

		if (row && row._selected_cells && row._selected_cells[this[0][0].column]) {
			return true;
		}
	}

	return false;
} );


apiRegisterPlural( 'rows().deselect()', 'row().deselect()', function () {
	var api = this;

	this.iterator( 'row', function ( ctx, idx ) {
		ctx.aoData[ idx ]._select_selected = false;
		ctx._select_lastCell = null;
		$( ctx.aoData[ idx ].nTr ).removeClass( ctx._select.className );
	} );

	this.iterator( 'table', function ( ctx, i ) {
		eventTrigger( api, 'deselect', [ 'row', api[i] ], true );
	} );

	return this;
} );

apiRegisterPlural( 'columns().deselect()', 'column().deselect()', function () {
	var api = this;

	this.iterator( 'column', function ( ctx, idx ) {
		ctx.aoColumns[ idx ]._select_selected = false;

		var api = new DataTable.Api( ctx );
		var column = api.column( idx );

		$( column.header() ).removeClass( ctx._select.className );
		$( column.footer() ).removeClass( ctx._select.className );

		// Need to loop over each cell, rather than just using
		// `column().nodes()` as cells which are individually selected should
		// not have the `selected` class removed from them
		api.cells( null, idx ).indexes().each( function (cellIdx) {
			var data = ctx.aoData[ cellIdx.row ];
			var cellSelected = data._selected_cells;

			if ( data.anCells && (! cellSelected || ! cellSelected[ cellIdx.column ]) ) {
				$( data.anCells[ cellIdx.column  ] ).removeClass( ctx._select.className );
			}
		} );
	} );

	this.iterator( 'table', function ( ctx, i ) {
		eventTrigger( api, 'deselect', [ 'column', api[i] ], true );
	} );

	return this;
} );

apiRegisterPlural( 'cells().deselect()', 'cell().deselect()', function () {
	var api = this;

	this.iterator( 'cell', function ( ctx, rowIdx, colIdx ) {
		var data = ctx.aoData[ rowIdx ];

		if(data._selected_cells !== undefined) {
			data._selected_cells[ colIdx ] = false;
		}

		// Remove class only if the cells exist, and the cell is not column
		// selected, in which case the class should remain (since it is selected
		// in the column)
		if ( data.anCells && ! ctx.aoColumns[ colIdx ]._select_selected ) {
			$( data.anCells[ colIdx ] ).removeClass( ctx._select.className );
		}
	} );

	this.iterator( 'table', function ( ctx, i ) {
		eventTrigger( api, 'deselect', [ 'cell', api[i] ], true );
	} );

	return this;
} );



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Buttons
 */
function i18n( label, def ) {
	return function (dt) {
		return dt.i18n( 'buttons.'+label, def );
	};
}

// Common events with suitable namespaces
function namespacedEvents ( config ) {
	var unique = config._eventNamespace;

	return 'draw.dt.DT'+unique+' select.dt.DT'+unique+' deselect.dt.DT'+unique;
}

function enabled ( dt, config ) {
	if ( $.inArray( 'rows', config.limitTo ) !== -1 && dt.rows( { selected: true } ).any() ) {
		return true;
	}

	if ( $.inArray( 'columns', config.limitTo ) !== -1 && dt.columns( { selected: true } ).any() ) {
		return true;
	}

	if ( $.inArray( 'cells', config.limitTo ) !== -1 && dt.cells( { selected: true } ).any() ) {
		return true;
	}

	return false;
}

var _buttonNamespace = 0;

$.extend( DataTable.ext.buttons, {
	selected: {
		text: i18n( 'selected', 'Selected' ),
		className: 'buttons-selected',
		limitTo: [ 'rows', 'columns', 'cells' ],
		init: function ( dt, node, config ) {
			var that = this;
			config._eventNamespace = '.select'+(_buttonNamespace++);

			// .DT namespace listeners are removed by DataTables automatically
			// on table destroy
			dt.on( namespacedEvents(config), function () {
				that.enable( enabled(dt, config) );
			} );

			this.disable();
		},
		destroy: function ( dt, node, config ) {
			dt.off( config._eventNamespace );
		}
	},
	selectedSingle: {
		text: i18n( 'selectedSingle', 'Selected single' ),
		className: 'buttons-selected-single',
		init: function ( dt, node, config ) {
			var that = this;
			config._eventNamespace = '.select'+(_buttonNamespace++);

			dt.on( namespacedEvents(config), function () {
				var count = dt.rows( { selected: true } ).flatten().length +
				            dt.columns( { selected: true } ).flatten().length +
				            dt.cells( { selected: true } ).flatten().length;

				that.enable( count === 1 );
			} );

			this.disable();
		},
		destroy: function ( dt, node, config ) {
			dt.off( config._eventNamespace );
		}
	},
	selectAll: {
		text: i18n( 'selectAll', 'Select all' ),
		className: 'buttons-select-all',
		action: function () {
			var items = this.select.items();
			this[ items+'s' ]().select();
		}
	},
	selectNone: {
		text: i18n( 'selectNone', 'Deselect all' ),
		className: 'buttons-select-none',
		action: function () {
			clear( this.settings()[0], true );
		},
		init: function ( dt, node, config ) {
			var that = this;
			config._eventNamespace = '.select'+(_buttonNamespace++);

			dt.on( namespacedEvents(config), function () {
				var count = dt.rows( { selected: true } ).flatten().length +
				            dt.columns( { selected: true } ).flatten().length +
				            dt.cells( { selected: true } ).flatten().length;

				that.enable( count > 0 );
			} );

			this.disable();
		},
		destroy: function ( dt, node, config ) {
			dt.off( config._eventNamespace );
		}
	}
} );

$.each( [ 'Row', 'Column', 'Cell' ], function ( i, item ) {
	var lc = item.toLowerCase();

	DataTable.ext.buttons[ 'select'+item+'s' ] = {
		text: i18n( 'select'+item+'s', 'Select '+lc+'s' ),
		className: 'buttons-select-'+lc+'s',
		action: function () {
			this.select.items( lc );
		},
		init: function ( dt ) {
			var that = this;

			dt.on( 'selectItems.dt.DT', function ( e, ctx, items ) {
				that.active( items === lc );
			} );
		}
	};
} );



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Initialisation
 */

// DataTables creation - check if select has been defined in the options. Note
// this required that the table be in the document! If it isn't then something
// needs to trigger this method unfortunately. The next major release of
// DataTables will rework the events and address this.
$(document).on( 'preInit.dt.dtSelect', function (e, ctx) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	DataTable.select.init( new DataTable.Api( ctx ) );
} );


return DataTable.select;
}));


