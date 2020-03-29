/**
 * This file is part of OXID eSales Wave theme.
 *
 * OXID eSales Wave theme is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * OXID eSales Wave theme is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with OXID eSales Wave theme.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @link      http://www.oxid-esales.com
 * @copyright (C) OXID eSales AG 2003-2016
 */


Wave = {};

// Short-Handle for document.ready
$(function () {
      var $window = $(window);

      $('.nav').on('mouseenter', '.nav-item.dropdown', function (e) {
                if ($window.width() >= 760) {
                    $(e).addClass('show');
                    $(this).children('.dropdown-menu').addClass('show');
                    var $elRight = ($(this).children('.dropdown-menu').offset().left + $(this).children('.dropdown-menu').width());
                    var $winWidth = $(window).outerWidth();
                    if ($elRight > $winWidth) {
                        $(this).children('.dropdown-menu').css({
                            'left': $winWidth - $elRight - 15,
                        });
                    }
                }
            }
        ).on('mouseleave', '.nav-item.dropdown', function (e) {
                if ($window.width() >= 760) {
                    $(e).removeClass('show');
                    $(this).children('.dropdown-menu').removeClass('show');
                }
            }
        ).on('click', 'li.dropdown', function (e) {
                if ($window.width() >= 760) {
                    e.stopPropagation();
                }
            }
        );



        function reRenderMainNav() {
             var $oMainNav = $('#mainnav').find('.navbar-collapse'),
                 $oNavList = $('#navigation'),
                 $oMoreLinks = $oNavList.find('.moreLinks');

             // Abbrechen, wenn Fensterbreite <= 767
             if ($window.width() <= 1119) {
                 $oMoreLinks.before($oMoreLinks.find('> ul > li'));
                 $oMoreLinks.remove();
                 return;
             }

             if ($oMoreLinks.length) {
                 $oMoreLinks.before($oMoreLinks.find('> ul > li'));
             }
             else {
                 var oMoreLinkElem = document.createElement('li'),
                     oMoreLinkAElem = document.createElement('a'),
                     oMoreLinkUlElem = document.createElement('ul');

                 oMoreLinkElem.className = 'dropdown moreLinks nav-item';

                 oMoreLinkAElem.className = 'dropdown-toggle nav-link';
                 oMoreLinkAElem.innerHTML = oWave.i18n.NAV_MORE + ' <i class="fa fa-angle-down"></i>';
                 oMoreLinkAElem.setAttribute('data-toggle', 'dropdown');

                 oMoreLinkUlElem.className = 'dropdown-menu';
                 oMoreLinkUlElem.setAttribute('role', 'menu');

                 oMoreLinkElem.appendChild(oMoreLinkAElem);
                 oMoreLinkElem.appendChild(oMoreLinkUlElem);

                 $oNavList.append(oMoreLinkElem);
                 $oMoreLinks = $(oMoreLinkElem);
             }

             var iMainNavWidth = $oMainNav.width() - $('#navbarSupportedContent > .fixed-header-actions').width(),
                 $oNavItems = $oNavList.find('> li').not('.moreLinks'),
                 iNavItemsWidth = 0,
                 aMoreLinkElems = [];

             iMainNavWidth -= $oMoreLinks.width();

             $oNavItems.each(function () {
                     var $this = $(this);
                     iNavItemsWidth += $this.outerWidth();

                     if (iNavItemsWidth > iMainNavWidth) {
                         $this.attr('class', 'dropdown-item');
                         $this.find('.nav-link').attr('class', 'dropdown-link');
                         aMoreLinkElems.push($this);
                     }
                 }
             );

             if (aMoreLinkElems.length) {
                 $oMoreLinks.find('> ul').append(aMoreLinkElems);
             }
             else {
                 $oMoreLinks.remove();
             }
         }

        reRenderMainNav();
         $window.resize(function () {
             reRenderMainNav();
         });



    }
);


