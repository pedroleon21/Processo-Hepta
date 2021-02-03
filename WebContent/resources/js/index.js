
var inicio = new Vue({
	el: "#inicio",
	data: {
		funcionarioEdicao: {
			id: null,
			nome: '',
			setor: {},
			salario: null,
			email: '',
			idade: null,

		},
		listaSetores: [],
		listaFuncionarios: [],
		listaFuncionariosHeader: [
			{ sortable: false, key: "nome", label: "Nome" },
			{ sortable: false, key: "fabricante.nome", label: "Setor" },
			{ sortable: false, key: "volume", label: "Salário" },
			{ sortable: false, key: "unidade", label: "Email" },
			{ sortable: false, key: "estoque", label: "Idade" },
		],
		editar: false
	},
	created: function () {
		let vm = this;
		vm.buscaFuncionarios();
	},
	methods: {
		insertUpdate: function () {	
			debugger;
			if(this.funcionarioEdicao.id){
				axios.put("./rs/funcionarios/"+this.funcionarioEdicao.id,this.funcionarioEdicao)
				.then(resp => {
					this.funcionarioEdicao = {};
					this.cancelar();
					alert('Funcionario Atualizado!');
					this.buscaFuncionarios();
				});
			}else{
				axios.post("./rs/funcionarios",this.funcionarioEdicao)
				.then( resp => {
					alert("Novo funcionario inserido!");
					this.cancelar();
					this.buscaFuncionarios();
					this.funcionarioEdicao = {};
				});
			}
		},
		buscaFuncionarios: function () {
			const vm = this;
			axios.get("./rs/funcionarios")
				.then(response => this.listaFuncionarios = response.data)
				.catch(function (error) {
					console.error("Erro interno. Não foi listar funcionarios");
				});
		},
		removeFuncionario: function (funcionario) {
			axios.delete('./rs/funcionarios/' + funcionario.id)
				.then(resp => this.buscaFuncionarios())
				.catch(err => console.error(err));
		},
		visualizarEdicao: function (funcionario) {
			this.editar = true;
			this.buscaSetores();
			this.funcionarioEdicao = funcionario;
		},
		buscaSetores: function () {
			axios.get("./rs/setor")
				.then(response => this.listaSetores = response.data)
				.catch(function (error) {
					console.error("Erro interno. Não foi listar Setores");
				});
			console.log(this.listaSetores);
		},
		cancelar: function () {
			this.editar = false;
		}
	},
	computed: {
		opcaoSetores: function () {
			return this.listaSetores.map(i => {
				return {
					value: i,
					text: i.nome
				}
			})
		}
	}
});
