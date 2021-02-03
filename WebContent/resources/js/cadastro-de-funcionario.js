
var inicio = new Vue({
	el: "#inicio",
	data: {
		listaSetores: [],
		nome: '',
		email: '',
		salario: '',
		setor: '',
		mensagem: ''
	},
	created: function () {
		let vm = this;
		vm.buscaSetores();
	},
	methods: {
		buscaSetores: function () {
			axios.get("../rs/setor")
				.then(response => this.listaSetores = response.data)
				.catch(function (error) {
					console.error("Erro interno. Não foi listar Setores");
				});
			console.log(this.listaSetores);
		}
	}
});
