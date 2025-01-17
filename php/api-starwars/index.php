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

$client = new Client(["verify" => false]);

$starships = json_decode($client->get("https://swapi.dev/api/starships")->getBody())->results;

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Star Wars API</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <h1>Star Wars API - Starships</h1>
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
                        <td>Cost in credits</td>
                        <td><?=$starship->cost_in_credits?></td>
                    </tr>
                    <tr>
                        <td>Length</td>
                        <td><?=$starship->length?></td>
                    </tr>
                    <tr>
                        <td>Max atm. speed</td>
                        <td><?=$starship->max_atmosphering_speed?></td>
                    </tr>
                    <tr>
                        <td>Crew</td>
                        <td><?=$starship->crew?></td>
                    </tr>
                    <tr>
                        <td>Passengers</td>
                        <td><?=$starship->passengers?></td>
                    </tr>
                    <tr>
                        <td>Cargo capacity</td>
                        <td><?=$starship->cargo_capacity?></td>
                    </tr>
                    <tr>
                        <td>Consumables</td>
                        <td><?=$starship->consumables?></td>
                    </tr>
                    <tr>
                        <td>Hyperdrive rating</td>
                        <td><?=$starship->hyperdrive_rating?></td>
                    </tr>
                    <tr>
                        <td>MGLT</td>
                        <td><?=$starship->MGLT?></td>
                    </tr>
                    <tr>
                        <td>Class</td>
                        <td><?=$starship->starship_class?></td>
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