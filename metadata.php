<?php
$sMetadataVersion = "2.1";

$aModule = [
    'id'                      => 'oxid6togglemenu',
    'title'                   => '.BEES | Off-Canvas Menü fuer OXID 6',
    'description'             => '[TR - Off-Canvas Menue für OXID 6]',
    'thumbnail'               => 'out/pictures/picture.png',
    'version'                 => '1.1.0',
    'author'                  => 'Steffen Winde',
    'email'                   => 'inserv@winde-ganzig.de',
    'blocks'                  => [
        [
            'template' => 'layout/base.tpl',
            'block' => 'theme_svg_icons',
            'file' => 'views/blocks/oxid6togglemenu_base.tpl',
        ],
        [
            'template' => 'layout/base.tpl',
            'block' => 'base_js',
            'file' => 'views/blocks/oxid6togglemenu_base_js.tpl',
        ],
        [
            'template' => 'layout/base.tpl',
            'block' => 'base_style',
            'file' => 'views/blocks/oxid6togglemenu_base_style.tpl',
        ],
        [
            'template' => 'widget/header/categorylist.tpl',
            'block' => 'dd_widget_header_categorylist',
            'file' => 'views/blocks/oxid6togglemenu_categorylist.tpl',
        ],
        [
            'theme' => 'flow_theme',
            'template' => 'widget/header/categorylist.tpl',
            'block' => 'dd_widget_header_categorylist',
            'file' => 'views/blocks/oxid6togglemenu_categorylist_forFlow.tpl',
        ]
    ],
	'settings'=>[],
];