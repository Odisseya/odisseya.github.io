<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php echo bloginfo('charset'); ?>">
    <title><?php wp_title(); ?></title>
    <meta name="viewport" content="width=device-width">
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/images/favicon.png"/>
    <?php
    $my_descr = get_post_meta($post->ID, "_yoast_wpseo_focuskw", true);
    if ($my_descr)
        echo '<meta name="keywords" content="' . $my_descr . '">';
    ?>
    <?php wp_head(); ?>
    <?php
    if (is_page(239)) {
        echo '<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>';

        if (!empty($_GET['type']) && $_GET['type'] == 'auto')
            echo '<script src="' . get_template_directory_uri() . '/assets/js/yandex-maps-auto.js" type="text/javascript"></script>';
        else
            echo '<script src="' . get_template_directory_uri() . '/assets/js/yandex-maps-public.js" type="text/javascript"></script>';
    }
    ?>
</head>
<body<?php echo (wp_is_mobile()) ? ' class="mobile"' : ''; ?>>
<header>
    <div class="container">
        <div class="top">
            <?php if (wp_is_mobile()) : ?>
                <p>
                    <a class="open-mobile-nav" href="#"><i class="icon -menu"></i></a>
                    <span><?php esc_html_e('Меню', 'grimple'); ?></span>
                </p>
            <?php endif; ?>

            <a class="logo" href="<?php echo get_site_url(); ?>">
                <img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="">
            </a>

            <?php if (wp_is_mobile()) : ?>
                <p>
                    <a href="#"><i class="icon -search"></i></a>
                    <span><?php esc_html_e('Услуги', 'grimple'); ?></span>
                </p>
            <?php endif; ?>

            <?php if (!wp_is_mobile()) : ?>
                <p><?php echo bloginfo('description'); ?> <span>*</span></p>
                <div class="tel">
                    <a href="tel:<?php echo str_replace(' ', '', g_op('grimple_phone')); ?>">
                        <i class="icon -phone"></i>
                        <?php echo g_op('grimple_phone'); ?></a>
                </div>
                <div class="schedule">
                    <i class="icon -time"></i>
                    <?php if (g_op('grimple_work_time_b')) : ?><p><?php esc_html_e('Пн-Сб:', 'grimple'); ?>
                        <span><?php echo g_op('grimple_work_time_b'); ?></span></p><?php endif; ?>
                    <?php if (g_op('grimple_work_time_v')) : ?><p><?php esc_html_e('Вс:', 'grimple'); ?>
                        <span><?php echo g_op('grimple_work_time_v'); ?></span></p><?php endif; ?>
                </div>
                <a href="javascript:void(0);" class="btn"><?php esc_html_e('Записаться на прием', 'grimple'); ?></a>
            <?php endif; ?>
        </div>
        <?php
        if (!wp_is_mobile()) :
            ?>
            <nav>
                <ul>
                    <li <?php if (is_front_page()) echo 'class="active"'; ?>><a href="<?php echo get_site_url(); ?>">
                            <i class="icon -home"></i>
                        </a></li>
                    <?php
                    $attr = [
                        'theme_location' => 'main-menu',
                        'container' => '',
                        'items_wrap' => '%3$s',
                    ];

                    wp_nav_menu($attr);
                    ?>
                    <li><a class="toggle-search" href="javascript:void(0);">
                            <i class="icon -search"></i>
                        </a></li>
                </ul>
            </nav>
        <?php
        else :
            ?>
            <nav>
                <ul>
                    <?php
                    $attr = [
                        'theme_location' => 'main-menu-mobile',
                        'container' => '',
                        'items_wrap' => '%3$s',
                    ];

                    wp_nav_menu($attr);
                    ?>
                </ul>
            </nav>
        <?php
        endif;
        ?>
    </div>

    <div class="search-box">
        <form action="/" method="get" class="container">
            <input type="text" name="s">
            <button class="btn"><i class="icon -search"></i><?php esc_html_e('Искать', 'grimple'); ?></button>
            <a href="javascript:void(0);" class="close toggle-search"></a>
        </form>
    </div>
</header>

<?php
if (wp_is_mobile()) :
    echo '<nav class="mobile-nav-left">';
    $attrnav = [
        'theme_location' => 'mobile-nav-left'
    ];

    wp_nav_menu($attrnav);

    $attrnavbottom = [
        'theme_location' => 'mobile-nav-left-bottom',
        'container' => 'div',
        'container_class' => 'mobile-nav-left-bottom',
    ];

    wp_nav_menu($attrnavbottom);
    echo '</nav>';
    echo '<span class="mobile-nav-close left"></span>';
    echo '<span class="mobile-nav-close right"></span>';
    ?>


<?php
endif;
?>
<div class="wave-menu services-mobile-nav">
    <div class="search-mobile-box">
        <form action="/" method="get">
            <input type="text" name="s">
            <button class="btn"><?php esc_html_e('Искать', 'grimple'); ?></button>
        </form>
    </div>

    <div class="services">
        <div class="tabs">
            <input type="radio" id="tab1"
                   name="tab" <?php if (activeTabMenuTitle('services') === true && activeTabMenuTitle('articles') === true) echo 'checked'; else echo 'checked'; ?>
                   hidden>
            <label for="tab1"><span><?php esc_html_e('Услуги', 'grimple'); ?></span></label>
            <input type="radio" id="tab2"
                   name="tab" <?php if (activeTabMenuTitle('articles') === true) echo 'checked'; ?> hidden>
            <label for="tab2"><span><?php esc_html_e('Информация', 'grimple'); ?></span></label>
            <div class="tab-content">
                <div class="tab1">
                    <?php
                    $attr = [
                        'theme_location' => 'services-menu',
                        'container' => 'nav',
                        'container_class' => 'services-nav'
                    ];
                    wp_nav_menu($attr)
                    ?>
                </div>

                <div class="tab2">
                    <?php
                    $attr = [
                        'theme_location' => 'articles-menu',
                        'container' => 'nav',
                        'container_class' => 'services-nav'
                    ];
                    wp_nav_menu($attr)
                    ?>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="content" style="min-height:100vh">
