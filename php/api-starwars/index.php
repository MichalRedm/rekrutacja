<?php

// @author: Michal Dolata <https://github.com/MichalDolata>
// @author: Marcin Lawniczak <marcin@lawniczak.me>
// @date: 26.09.2017
// @update: 26.09.2019
// This task does require Composer. You can add more libraries if you want to.
// We suggest using Guzzle for requests (http://docs.guzzlephp.org/en/stable/)
// Remember to composer install
// The script will be outputting to a web browser, so use HTML for formatting

// When making different kinds of applications, data is often needed that we don't yet have.
// Many 3rd party providers offer APIs (wikipedia.org/wiki/Application_programming_interface)
// that can be consumed to find data we need.

// Your task is to use the The Star Wars API (https://swapi.co/) and it's docs (https://swapi.co/documentation)
// Display all starships provided through the API, with their properties
// Each ship should have the names of pilots and names of films displayed (if none, indicate)
// Each pilot should have its species also displayed

require "vendor/autoload.php";

use GuzzleHttp\Client;

$client = new Client([/*"base_uri" => "https://swapi.dev/api/", */"verify" => false]);

// $people = json_decode($client->get("people")->getBody())->results;
// $films = json_decode($client->get("films")->getBody())->results;
$starships = json_decode($client->get("https://swapi.dev/api/starships")->getBody())->results;

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Star Wars</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <div id="starshipsContainer">
        <?php foreach ($starships as $starship): ?>
            <article class="starship">
                <h1><?=$starship->name?></h1>
                <table>
                    <tr>
                        <td>Model</td>
                        <td><?=$starship->model?></td>
                    </tr>
                    <tr>
                        <td>Manufacturer</td>
                        <td><?=$starship->manufacturer?></td>
                    </tr>
                    <tr>
                        <td>Pilots</td>
                        <td>
                            <?php if ($starship->pilots): ?>
                                <ul>
                                    <?php foreach ($starship->pilots as $pilot): ?>
                                        <?php $pilot_data = json_decode($client->get($pilot)->getBody()); ?>
                                        <li><?=$pilot_data->name?> - <?=$pilot_data->species ? json_decode($client->get($pilot_data->species[0])->getBody())->name : "Human"?></li>
                                    <?php endforeach; ?>
                                </ul>
                            <?php else: ?>
                                <span class="none">None</span>
                            <?php endif; ?>
                        </td>
                    </tr>
                    <tr>
                        <td>Films</td>
                        <td>
                            <?php if ($starship->films): ?>
                                <ul>
                                    <?php foreach ($starship->films as $film): ?>
                                        <li><?=json_decode($client->get($film)->getBody())->title?></li>
                                    <?php endforeach; ?>
                                </ul>
                            <?php else: ?>
                                <span class="none">None</span>
                            <?php endif; ?>
                        </td>
                    </tr>
                </table>
            </article>
        <?php endforeach; ?>
    </div>
</body>
</html>