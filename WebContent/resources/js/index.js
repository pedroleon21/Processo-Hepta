
var inicio = new Vue({
	el: "#inicio",
	data: {
		listaFuncionarios: [],
		listaFuncionariosHeader: [
			{ sortable: false, key: "nome", label: "Nome" },
			{ sortable: false, key: "fabricante.nome", label: "Setor" },
			{ sortable: false, key: "volume", label: "Salário" },
			{ sortable: false, key: "unidade", label: "Email" },
			{ sortable: false, key: "estoque", label: "Idade" },
		]
	},
	created: function() {
		let vm = this;
		vm.buscaFuncionarios();
	},
	methods: {
		buscaFuncionarios: function () {
			const vm = this;
			axios.get("./rs/funcionarios")
				.then(response => this.listaFuncionarios = response.data)
				.catch(function (error) {
					console.error("Erro interno. Não foi listar funcionarios");
				});
		},
		removeFuncionario: function (funcionario) {
			axios.delete('../funcionarios/rs/funcionarios/' + funcionario.id)
				.then(resp => this.listaFuncionarios.pop(funcionario))
				.catch(err => console.error(err));
		}
	}
});
