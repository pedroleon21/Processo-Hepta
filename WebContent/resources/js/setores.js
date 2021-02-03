
var setores = new Vue({
	el: "#setores",
	data: {
		setorEdicao: {
			id: null,
			nome: ''
		},
		listaSetores: [],
		listaSetoresHeader: [
			{ sortable: false, key: "nome", label: "Nome" }
		],
		editar: false
	},
	created: function () {
		let vm = this;
		vm.buscaSetores();
	},
	methods: {
		insertUpdate: function () {	
			debugger;
			if(this.setorEdicao.id){
				axios.put("../rs/setor/"+this.setorEdicao.id,this.setorEdicao)
				.then(resp => {
					this.setorEdicao = {};
					this.cancelar();
					alert('Setor Atualizado!');
					this.buscaSetores();
				});
			}else{
				axios.post("../rs/setor",this.setorEdicao)
				.then( resp => {
					alert("Novo setor inserido!");
					this.cancelar();
					this.buscaSetores();
					this.setorEdicao = {};
				});
			}
		},
		removeSetor: function (setor) {
			axios.delete('../rs/setor/' + setor.id)
				.then(resp => this.buscaSetores())
				.catch(err => console.error(err));
		},
		visualizarEdicao: function (setor) {
			this.editar = true;
			this.buscaSetores();
			this.setorEdicao = setor;
		},
		buscaSetores: function () {
			axios.get("../rs/setor")
				.then(response => this.listaSetores = response.data)
				.catch(function (error) {
					console.error("Erro interno. Não foi listar Setores");
				});
			console.log(this.listaSetores);
		},
		cancelar: function () {
			this.editar = false;
		}
	}
});
