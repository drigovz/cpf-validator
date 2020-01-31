export default class ValidarCpf {
    // primeira coisa em uma classe é o seu método de construção
    // o element é o elemento que for selecionado no DOM, no nosso caso o input CPF
    constructor(element) {
        this.element = element;
    }

    // primeiro método que vamos criar é o método de limpar o cpf
    cleanCPF(cpf) {
        // retorna o cpf substituindo por nada tudo que é ponto, espaço em braco, etc...
        return cpf.replace(/\D/g, '');
    }

    // método para construir um CPF
    buildCpf(cpf) {
        // retorna um cpf formatado com ponto no lugar certo e traço também
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
    }

    // método que vai juntar o Clean e o Build cpf em um só 
    formatCpf(cpf) {
        const cpfClean = this.cleanCPF(cpf);
        return this.buildCpf(cpfClean);
    }

    // método que irá validar o CPF, se foram digitados apenas números e se o tamanho está correto 
    validationCpf(cpf) {
        // o regerxp que valida o cpf é 
        // 3 dígitos seguidos de traço ou ponto repetiddos 3 vezes 
        // o match vai retornar um array, sendo o primeiro item [0] desse array o cpf formatado e validado pelo regexp
        const matchCpf = cpf.match(/(?:\d{3}[-.\s]?){3}\d{2}/g);

        // abaixo verificamos se o matchCpf é igual ao CPF validado e passado para a função 
        // se eles forem diferentes um 'false' vai retornar 
        // no matchCpf && estamos verificando se matchCpf é um array, ou se ao menos possui um array com o cpf completo
        // ou seja, se não retornou um null do match acima 
        return (matchCpf && matchCpf[0] === cpf);
    }

    // método que vai validar o cpf no evento change / validar na mudança 
    validOnChange(cpfElement) {
        // verificamos se do retorno da validação do cpf veio um valor verdadeiro/true 
        if (this.validationCpf(cpfElement.value)) {
            // a primeira coisa que faremos é exibir no input o cpf formatado 
            cpfElement.value = this.formatCpf(cpfElement.value);

            // feedback indicando que o cpf é válido 
            cpfElement.classList.add('valido');

            // mostrar o span de erro 
            cpfElement.nextElementSibling.classList.remove('ativar');

            // removendo o feedback de erro caso ele tenha
            cpfElement.classList.remove('erro');
            // se veio um valor falso/false executa abaixo
        } else {
            // vamos adicionar uma borda vermelha pra indicar erro no cpf para o usuário 
            cpfElement.classList.add('erro');
            // remover a classe de sucesso se o cpf não for válido 
            cpfElement.classList.remove('valido');

            cpfElement.nextElementSibling.classList.add('ativar');
        }
    }

    // método para adicionar um feedback informando erro no cpf do cliente 
    addFeedbackSpan() {
        const spanError = document.createElement('span');
        spanError.classList.add('span-error');
        spanError.innerText = 'CPF Inválido!';
        // agora adicionamos o span exatamente abaixo do input CPF (this.element)
        // o insertBefore recebe dois parâmetros
        // o primeiro é o elemento que queremos adicionar
        // o segundo é após qual elemento eu quero adicionar o elemento passado no 1° parâmetro
        // nessa caso faremos isso com o this.element.nextElementSibling, ou seja logo após o elemento que foi passado 
        // como parâmetro pra nossa função, que é o input de CPF (this.element)
        this.element.parentElement.insertBefore(spanError, this.element.nextElementSibling);
    }

    //no método abaixo adicionamos um evento no input do CPF
    // referenciamos ele como this.element pq element é o elemento que a classe está recebendo e armazenando no constructor
    addEventToForm() {
        this.element.addEventListener('change', () => {
            this.validOnChange(this.element);
        });
    }

    // o método abaixo inicia a classe, ou seja, faz a sua iniciação 
    // nele carregamos tudo que vai ser iniciado com a classe 
    // fizemos isso para adicionar o evento ao input 
    initClass() {
        this.addEventToForm();
        this.addFeedbackSpan();
        return this;
    }
}