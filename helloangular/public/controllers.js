angular.module("anguhello").controller("eventocontroller", function(eventoservice){

  this.novo = {};

  this.listar = () => eventoservice.buscaeventos().then( (ret) => {
    this.eventos = ret.data;
  });

  // carregar a lista imediatamente após carregar o controlador
  this.listar();

  this.salvaevento = () => {
    eventoservice.salvaevento(this.novo).then( (ret) => {
      alert("evento salvo com id "+ret.data.idevento);
      this.listar();
      this.novo = {};
    });
  };
});

angular.module("anguhello").controller("participantecontroller",function(participanteservice){
    this.novo = {};

    this.listar_participantes = () => participanteservice.buscaparticipantes().then((ret) => {
        this.participantes = ret.data;
    });

    this.listar_participantes();

    this.salvaparticipante = () => {
        this.novo.nomeparticipante = this.novo.nomeparticipante.toUpperCase();
        participanteservice.salvaparticipante(this.novo).then((ret) => {
            alert("participante salvo com o id "+ret.data.idparticipante);
            this.listar_participantes();
            this.novo= {};
        });
    }
});

angular.module("anguhello").config(($routeProvider) => {

  $routeProvider.when("/eventos", {
    controller:"eventocontroller",
    templateUrl:"eventos.html",
    controllerAs:"ctl"
  });

  $routeProvider.when("/participantes", {
    controller:"participantecontroller",
    templateUrl:"participantes.html",
    controllerAs:"controller_participantes"
  });

  $routeProvider.otherwise("/eventos");

});