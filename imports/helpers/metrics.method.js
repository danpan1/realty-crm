'use strict';
import {Meteor} from 'meteor/meteor';
Meteor.methods({
  metrics
});

export function metrics () {
    
    function tryCatchFn(fn) {
        return function () {
            var siteRelease = $rootScope.isProdution;
            if (siteRelease) {
                try {
                    fn.apply(this, arguments);
                } catch (e) {
                }
            }
        };
    }

    // Global yaCounter32869982 /
    return {
        authorization: {
            successRegistration: tryCatchFn(function () {
                yaCounter37702825.reachGoal('успешная_регистрация');
                console.log('successRegistration');
            }),
            login: tryCatchFn(function () {
                yaCounter37702825.reachGoal('авторизация');
                console.log('login');
            })
        }
    }
    
}

/* To index.html
<script type="text/javascript"> 
    (function (d, w, c) { (w[c] = w[c] || []).push(function() { 
        try { 
            w.yaCounter37702825 = new Ya.Metrika({ 
                id:37702825, 
                clickmap:true, 
                trackLinks:true, 
                accurateTrackBounce:true, 
                webvisor:true, 
                trackHash:true }); 
            } catch(e) { } 
        }); 
        var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; 
        s.type = "text/javascript"; 
        s.async = true; 
        s.src = "https://mc.yandex.ru/metrika/watch.js"; 
        if (w.opera == "[object Opera]") { 
            d.addEventListener("DOMContentLoaded", f, false); 
        } else { 
            f(); 
        } 
    })
    (document, window, "yandex_metrika_callbacks"); 
    </script>
    */