// $(function() {
// 
//   $.get("inc/menu.html", function(data) {
//     var $m = $(data);
//     $("body").prepend($m);
//     // class="active"
//     var pageName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
//     var $a = $m.find('a[href="' + pageName + '"]');
//     $a.parent().addClass('active');
//   });
//   $.get("inc/footer.html", function(data) {
//     $("body").append(data);
//   });
//   $('.right').addClass('animated fadeInRight');
// });
// 
// 



function getItem(name, q, item) {
  return {
    id: item.id,
    name: name,
    q: q,
    current: item.q_have,
    item: item
  };
}

var gilucApp = angular.module('gilucApp', ['ngResource']);


gilucApp.config(["$httpProvider",
  function(provider) {
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
  }
])

gilucApp.controller('GilucCtrl', ['$scope', '$http', '$resource',
  function($scope, $http, $resource) {


    defaults = $http.defaults.headers
    defaults.patch = defaults.patch || {}
    defaults.patch['Content-Type'] = 'application/json';

    $scope.items = {};
    // $scope.links = ['dormir', 'soin', 'manger', 'promenade', 'maison', 'consommables'];

    $scope.links = ['cadeaux'];

    $http.get('/gifts.json').success(function(d) {
      // console.log(d);
      // 
      var list = d.map(function(i) {
        return getItem(i.title, i.q_expected, i);
      });
      // console.log(list);
      $scope.items['cadeaux'] = list;

    });



    // $scope.items['dormir'] = [item('Lit', 1), item('Sommier', 1), item('Matelas', 1),
    //   item('Drap housse', 3),
    //   item('Gigoteuse grande taille', 2),
    //   item('Alèse', 3),
    //   item('Tour de lit', 2),
    //   item('Armoire', 1),
    //   item('Commode', 1),
    //   item('Babyphone', 1),
    //   item('Tétines premier âge', 2)
    // ];

    // $scope.items['soin'] = [item('Baignoire', 1),
    //   item('Siège de bain', 1),
    //   item('Table à langer', 1),
    //   item('Matelas à langer et housses', 1),
    //   item('Thermomètre de bain', 1),
    //   item('Drap de bain', 2),
    //   item('Thermomètre', 1),
    //   item('Mouche bébé', 1),
    //   item('Ciseaux à ongles', 1),
    //   item('Brosse à cheveux', 1),
    //   item('Poubelle à couches Sangenic Tommee Tippee', 1),
    //   item('Recharge pour poubelle ci-dessus', 4)
    // ];

    // $scope.items['manger'] = [item('Chaise haute', 1),
    //   item('Biberon et tétine', 3),
    //   item('Stérilisateur', 1),
    //   item('Chauffe biberons', 1),
    //   item('Tire lait', 1),
    //   item('Egouttoir à biberons', 1),
    //   item('Goupillons', 2),
    //   item('Coques recueil lait', 4)
    // ];

    // $scope.items['promenade'] = [item('Siège auto', 1),
    //   item('Poussette', 1),
    //   item('Sac à langer', 1),
    //   item('Porte bébé', 1),
    //   item('Echarpe de portage Je porte mon bébé Echarpe "L\'Originale" JPMBB - EMERAUDE, Bleu Gris', 1),
    //   item('Lit pliable ?', 1),
    //   item('Ombrelle', 1),
    //   item('Kit pluie poussette', 1),
    //   item('Pare soleil pour la voiture', 2)
    // ];

    // $scope.items['maison'] = [item('Parc ', 1),
    //   item('Tapis d’éveil', 1),
    //   item('Transat', 1)
    // ];

    // $scope.items['consommables'] = [item('Bodies 1mois', 6),
    //   item('Pyjamas 1mois', 6),
    //   item('Brassières 1mois', 3),
    //   item('Chaussettes 1mois', 6),
    //   item('Bonnets', 3),
    //   item('Chaussons naissance', 3),
    //   item('Bavoirs', 10),
    //   item('Bodies 3mois', 6),
    //   item('Pyjamas 3mois', 6),
    //   item('Brassières 3mois', 3),
    //   item('Chaussettes 3mois', 6)
    // ];

    // localStorage.clear();


    for (var key in $scope.items) {
      for (var i = 0; i < $scope.items[key].length; i++) {
        var currentItem = $scope.items[key][i];
        currentItem.family = key;
        currentItem.id = currentItem.family + ' ' + currentItem.name;
        // if (!localStorage[currentItem.family]) {
        //   localStorage[currentItem.family] = {};
        // }
        // localStorage.setItem(currentItem.id,currentItem.current);

        // if (!localStorage[currentItem.family][currentItem.name]) {
        //   localStorage[currentItem.family][currentItem.name] = currentItem.current;
        // }
        // if (localStorage[currentItem.family] && localStorage[currentItem.family][currentItem.name]) {
        //   currentItem.current = localStorage[currentItem.family][currentItem.name].current;
        // }
      };
    }


    $scope.plusOne = function(item) {

      // console.log(item);

      $.validator.messages.required = 'merci de saisir cette information pour pouvoir faire votre promesse de don';

      if (!$("#form-name").valid()) {
        // console.log('not valid');
        return;
      }

      // $resource('/gifts/:id', {
      //   id: item.id
      //   // title:'cool'
      // }, {
      //   update: {
      //     method: 'PATCH',
      //     params : {title : 'ok2'}
      //   }
      // })
      // $http({
      //   url: '/gifts',
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   data: {
      //     'title': 'ok3'
      //   }
      // });

      // $http.post('/gifts.json', {
      //   'title': 'ok'
      // }).success(function(response) {
      //   console.log(response);
      // });

      item.current += 1;
      if (item.item.who.length > 0) {
        item.item.who += ", ";
      }
      item.item.who += $('#iname').val();


      $http.put('/gifts/' + item.id + '.json', {
        'id': item.id,
        'gift': {
          // 'title' : item.id + '_' + item.current,
          'q_have': item.current,
          'who': item.item.who,
          'whoemail' : 'ahhh'
          // 'q_expected' : 5
        }
      }).success(function(response) {
        // console.log(response);
      });


      // item.current += 1;
      // localStorage.setItem(item.id, item.current);
      // console.log(item);
    };

    $(function() {
      // console.log('ok');
      $('body').scrollspy({
        target: '#navbar-default'
      });
    });
  }
]);

// console.log('ok2');