;( function( $, window, document, undefined ) {
	"use strict";

	function _gntRootWrap( rootClass ) {
		return $( "<ul class=\"" + rootClass + "\"></ul>" );
	}

	function _gntChildWrap( childClass, index ) {
		return $( "<ul class=\"" + childClass + " " + childClass + "-" + index + "\"></ul>" );
	}

	function _gntLink( element ) {
		return $( "<a href=\"#" + element.attr( "id" ) + "\">" + element.text() + "</a>" );
	}

	function _gntLinkWrap() {
		return $( "<li></li>" );
	}

	function _gntId( element, index ) {
		return "docout-" + index;
	}

	var pluginName = "docout",
	defaults = {

		// Where the document outline will be prepended
		target: "body",

		// Whether the document oultine should be calculated
		// immediatelly or explicitly via public command.
		immediate: true,

		// The css class to be appended to the root Wrap
		rootClass: "docout-root-wrap",

		// The css class to be appended to each child Wrap
		childClass: "docout-child-wrap",

		// The elements to be outlined - order matters.
		elements: [ "h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8" ],

		// Whether the outline should replace target's content
		// or be prepended to it
		replace: true,

		// Function to be used to generate the link
		gntLink: _gntLink,

		// Function to be used to generate the link wrapper
		gntLinkWrap: _gntLinkWrap,

		// Function to be used to generate the outer wrapper of the document outline
		gntRootWrap: _gntRootWrap,

		// Function to be used to generate each child outline
		gntChildWrap: _gntChildWrap,

		// Function to be used to resolve the id of each outline link href
		gntId: _gntId
	};

	function Plugin ( element, options ) {
		this.element = element;
		this.$element = $( element );
    this.$content = $(this.$element.data('content'));

		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.$target = $( this.$element.data('target') );

		this.init();
	}

	$.extend( Plugin.prototype, {
		init: function() {
			var self = this;

			if ( self.settings.immediate ) {
				self.generate();
			}
		},

		generate: function() {
			var self = this,
			settings = self.settings,
			elements = self.$content.find( settings.elements.join( "," ) ),
			$result = settings.gntRootWrap( settings.rootClass ),
			previousIndex = -1, currentIndex, $element, $previousElement,
      foo = {},
			$parent = $result;

			var result = $.each( elements, function( index, element ) {
				$element = $( element );

				currentIndex = settings.elements.findIndex( function( el ) {
					return $element.is( el );
				} );

				if ( previousIndex === -1 || currentIndex === previousIndex ) {

					// sibling: nothing to do here
				} else if ( currentIndex > previousIndex ) {
          // child: append ul and set to parent
					var ul = settings.gntChildWrap( settings.childClass, currentIndex );
					$previousElement.append( ul );
					$parent = ul;
				} else {

					// anchestor: find the proper parent
					if ( $parent.parents( "ul" ).length > 0 ) {

						var parentIndex = $parent.parents( "ul" ).length - currentIndex;
						$parent = $parent.parents("ul").eq( parentIndex );
					}
				}

				$previousElement = self._gntEntryFor( $element, index );
				$parent.append( $previousElement );
				previousIndex = currentIndex;
			} );

			if ( self.settings.replace ) {
				self.$target.html( $result );
			} else {
				self.$target.prepend( $result );
			}

			return result;
		},

		_gntEntryFor: function( element, index ) {
			var s = this.settings;

			if ( element.attr( "id" ) === undefined ) {
				element.attr( "id", this.settings.gntId( element, index ) );
			}

			return s.gntLinkWrap( element ).append( s.gntLink( element ) );
		}
	} );

	$.fn[ pluginName ] = function( options ) {
		var args = arguments;

		if ( options === undefined || typeof options === "object" ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
				}
			} );

		} else if ( typeof options === "string" && options[ 0 ] !== "_" && options !== "init" ) {
			var returns;

			this.each( function() {
				var instance = $.data( this, "plugin_" + pluginName );
				if ( instance instanceof Plugin && typeof instance[ options ] === "function" ) {
					returns = instance[ options ]
					.apply( instance, Array.prototype.slice.call( args, 1 ) );
				}
				if ( options === "destroy" ) {
					$.data( this, "plugin_" + pluginName, null );
				}
			} );
			return returns !== undefined ? returns : this;
		}
	};
} )( jQuery, window, document );
