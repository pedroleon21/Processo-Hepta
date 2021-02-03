
var inicio = new Vue({
	el: "#inicio",
	data: {
		msg : '',
		inserindo: false,
		statusResponse: false,
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
		vm.buscaSetores();
		vm.buscaFuncionarios();
	},
	methods: {
		insertUpdate: function () {
			if (this.funcionarioEdicao.id) {
				axios.put("./rs/funcionarios/" + this.funcionarioEdicao.id, this.funcionarioEdicao)
					.then(resp => {
						this.funcionarioEdicao = {};
						this.mudancaEstado(false,"Editado")
						this.buscaFuncionarios();
						this.cancelar();
					}).catch( resp =>{
						this.funcionarioEdicao = {};
						this.mudancaEstado(true,"editar")
						this.cancelar();
					});
			} else {
				axios.post("./rs/funcionarios", this.funcionarioEdicao)
					.then(resp => {
						this.mudancaEstado(false, "Inserido");
						this.funcionarioEdicao = {};
						this.cancelar();
					}).catch(resp =>{
						this.mudancaEstado(true, "inserir");
						this.funcionarioEdicao = {};
						this.cancelar();
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
				.then(resp => {
					this.buscaFuncionarios();
					this.mudancaEstado(false,"Removeu");
				})
				.catch(err => {
					this.mudancaEstado(true,"remoção");
					console.error(err);
				});
		},
		visualizarEdicao: function (funcionario) {
			this.editar = true;
			this.buscaSetores();
			this.funcionarioEdicao = funcionario;
		},
		buscaSetores: function () {
			axios.get("./rs/setor")
				.then(response => {
					this.listaSetores = response.data;
				})
				.catch(function (error) {
					console.error("Erro interno. Não foi listar Setores");
				});
		},
		cancelar: function () {
			this.editar = false;
			this.buscaFuncionarios();// pode onerar o servidor
		},
		mudancaEstado: function (status , msg) {
			Obj = this.inserindo;
			this.inserindo = true;
			this.statusResponse = status;
			this.msg = msg;
			setTimeout(function(Obj){
				Obj = false;
			}, 4000);
		}
	}
});
