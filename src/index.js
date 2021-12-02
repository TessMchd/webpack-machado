import '../public/scss/style.scss';
import giyu from '../dist/images/giyu.png';
import inosuke from '../dist/images/inosuke.jpg';
import nezuko from '../dist/images/nezuko.jpg';
import renguko from '../dist/images/rengoku.jpg';
import shinobu from '../dist/images/shinobu.png';
import tanjiro from '../dist/images/tanjiro.jpg';
import uzui from '../dist/images/uzui.jpg';
import zenitsu from '../dist/images/zenitsu.jpg';

require('jquery')
$(function () {

    let carte1;
    let carte2;
    let compteur = 0 ;

    $('.flip-card').click(function () {
        if (!carte1 || !carte2) {
            $(this).find('.flip-card-inner').css('transform', 'rotateY(180deg)')
            if (carte1) {
                carte2 = $(this).find('img')
            } else {
                carte1 = $(this).find('img')
            }

                if (carte1 && carte2) {
                    if (carte1.attr('src') === carte2.attr('src')) {
                        compteur += 1;
                        carte1 = null
                        carte2 = null
                    } else {
                        setTimeout(function () {
                            carte1.closest('.flip-card-inner').css('transform', 'none')
                            carte2.closest('.flip-card-inner').css('transform', 'none')
                            carte1 = null
                            carte2 = null
                        }, 1000);
                    }
                    if (compteur === 8) {
                        setTimeout(function(){alert('GAGNE')},1000)
                    }
                }
        }
    })

    let images = [giyu, inosuke, nezuko, renguko, shinobu, tanjiro, uzui, zenitsu]
    for (let i = 0; i < 8; i++) {
        let image = Math.floor(Math.random() * images.length )
        let imageNom = images[image]
        images.splice(image, 1)
        let emplacement1 = verifEmplacement(Math.floor(Math.random() * 16)+ 1)
        if (emplacement1) {
            $('.carte'+emplacement1 + ' .flip-card-back').html('<img src="'+ imageNom +'" alt="">')
            let emplacement2 = verifEmplacement(Math.floor(Math.random() * 16)+ 1)
            $('.carte'+emplacement2 + ' .flip-card-back').html('<img src="'+ imageNom +'" alt="">')
        }
    }
})

function verifEmplacement(emplacement) {
    let carte = $('.carte'+emplacement)
    if (carte.find('img').length > 0) {
        return verifEmplacement(Math.floor(Math.random() * 16)+ 1)
    } else {
        return emplacement
    }
}


