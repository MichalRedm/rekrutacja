<?php
// @author: Marcin Lawniczak <marcin@lawniczak.me>
// @date: 24.10.2017
// @update: 26.09.2019
// This is a simple task, which does not require Composer
// The script will be outputting to a web browser, so use HTML for formatting
// Write out numbers from 100 to 0, each in a separate line
// If the number is a multiple of 4, write Fire instead of the number
// If the number is a multiple of 7, write Boom instead of the number
// If the number is a multiple of 10, repeat it 10 times in the same line in red
?>

<?php for ($i = 100; $i >= 0; $i--): ?>
    <?php if ($i % 4 == 0): ?>
        <p>Fire</p>
    <?php elseif ($i % 7 == 0): ?>
        <p>Boom</p>
    <?php elseif ($i % 10 == 0): ?>
        <p style="color: red"><?=implode(" ", array_fill(0, 10, $i))?></p>
    <?php else: ?>
        <p><?=$i?></p>
    <?php endif; ?>
<?php endfor; ?>
