<?php if ($count > 0 || $params->get('showHere', 1)) : ?>

<div class="data-control-id-860 bd-breadcrumbs-1 bd-page-width  <?php echo $moduleclass_sfx; ?>">
    <div class="bd-container-inner">
        <ol class="breadcrumb">
        <?php 
        if ($params->get('showHere', 1))
        {
            $text = JText::_('MOD_BREADCRUMBS_HERE');
        ?>
            <li class="show-here">
                <span class="data-control-id-848 bd-breadcrumbstext-1">
    <span><?php echo $text; ?></span>
</span>
            </li>
        <?php
        }
        ?>
        <?php
        for ($i = 0; $i < $count; $i ++) {

            // If not the last item in the breadcrumbs add the separator
            if ($i < $count -1) {
                if (!empty($list[$i]->link)) {
                ?>
                    <li>
                    <div class="data-control-id-849 bd-breadcrumbslink-1">
    <a  href="<?php echo $list[$i]->link; ?>"><?php echo $list[$i]->name; ?></a>
</div>
                    </li>
                <?php
                } else {
                    $text = $list[$i]->name;
                ?>
                    <li class="active">
                        <span class="data-control-id-848 bd-breadcrumbstext-1">
    <span><?php echo $text; ?></span>
</span>
                    </li>
                <?php
                }
            }  elseif ($params->get('showLast', 1)) { // when $i == $count -1 and 'showLast' is true
                $text = $list[$i]->name;
            ?>
                <li class="active">
                    <span class="data-control-id-848 bd-breadcrumbstext-1">
    <span><?php echo $text; ?></span>
</span>
                </li>
            <?php
            }
        }

        ?>
        </ol>
    </div>
</div>

<?php endif; ?>