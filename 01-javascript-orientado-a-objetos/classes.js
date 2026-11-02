// Pessoa
class Pessoa {
    constructor(nome, cpf, dataNascimento, telefone) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.telefone = telefone;
    }
}

// Paciente (herda de Pessoa)
class Paciente extends Pessoa {
    constructor(nome, cpf, dataNascimento, telefone, endereco, tipoSanguineo, statusPlano) {
        super(nome, cpf, dataNascimento, telefone);
        this.endereco = endereco;
        this.tipoSanguineo = tipoSanguineo;
        this.statusPlano = statusPlano;
    }

    marcarConsulta(medico, dataHora) {
        return new Consulta(medico, this, "Normal", dataHora);
    }
}

// Profissional (herda de Pessoa)
class Profissional extends Pessoa {
    constructor(nome, cpf, dataNascimento, telefone, crm, especialidades) {
        super(nome, cpf, dataNascimento, telefone);
        this.crm = crm;
        this.especialidades = especialidades;
    }
}

// Medico (herda de Profissional)
class Medico extends Profissional {
    constructor(nome, cpf, dataNascimento, telefone, crm, especialidades, valorConsulta) {
        super(nome, cpf, dataNascimento, telefone, crm, especialidades);
        this.valorConsulta = valorConsulta;
    }

    solicitarExame(paciente, tipo, dataSolicitacao) {
        return new Exame(dataSolicitacao, tipo);
    }
}

// Fisioterapeuta (herda de Profissional)
class Fisioterapeuta extends Profissional {
    constructor(nome, cpf, dataNascimento, telefone, crm, especialidades, crefito) {
        super(nome, cpf, dataNascimento, telefone, crm, especialidades);
        this.crefito = crefito;
    }
}

// UnidadeSaude
class UnidadeSaude {
    constructor(nome, endereco) {
        this.nome = nome;
        this.endereco = endereco;
    }
}

// Hospital (herda de UnidadeSaude)
class Hospital extends UnidadeSaude {
    constructor(nome, endereco, leitosDisponiveis) {
        super(nome, endereco);
        this.leitosDisponiveis = leitosDisponiveis;
    }
}

// Clinica (herda de UnidadeSaude)
class Clinica extends UnidadeSaude {
    constructor(nome, endereco, especialidades) {
        super(nome, endereco);
        this.especialidades = especialidades;
    }
}

// Laboratorio (herda de UnidadeSaude)
class Laboratorio extends UnidadeSaude {
    constructor(nome, endereco, tiposExame) {
        super(nome, endereco);
        this.tiposExame = tiposExame;
    }
}

// PlanoSaude
class PlanoSaude {
    constructor(nome, tipoPlano, cnpj) {
        this.nome = nome;
        this.tipoPlano = tipoPlano;
        this.cnpj = cnpj;
    }
}

// Consulta
class Consulta {
    constructor(medico, paciente, tipo, dataHora) {
        this.medico = medico;
        this.paciente = paciente;
        this.tipo = tipo;
        this.dataHora = dataHora;
    }
}

// Exame
class Exame {
    constructor(dataSolicitacao, tipo) {
        this.dataSolicitacao = dataSolicitacao;
        this.tipo = tipo;
        this.resultado = "";
    }
}

// Tratamento
class Tratamento {
    constructor(descricao, duracaoDias, status) {
        this.descricao = descricao;
        this.duracaoDias = duracaoDias;
        this.status = status;
    }
}

// Internacao
class Internacao {
    constructor(dataEntrada, quarto, motivo) {
        this.dataEntrada = dataEntrada;
        this.dataSaida = "";
        this.quarto = quarto;
        this.motivo = motivo;
    }
}

//  alocações dos objs-

function alocarObjetos() {
    let plano = new PlanoSaude("Unimed", "Empresarial", "53.929.956/0001-39");
    let paciente = new Paciente("Isabelly Nicole", "463.155.738-94", "19/12/2006", "(19) 99551-2392", "Rua Jair Pedro da Silva, 353", "O+", "Ativo");
    let medico = new Medico("Dr. Paulo Merks", "152.595.881-09", "03/02/1980", "(19) 98456-7890", "CRM-12345", "Cardiologia", 200);
    let fisio = new Fisioterapeuta("Ana Lima da Silva", "552.587.447-99", "15/08/1990", "(19) 97587-0020", "CRM-0000", "Ortopedia", "CREFITO-777");
    let hospital = new Hospital("Hospital Central de Mogi Guacu", "Av. Bandeirantes, 100", 30);
    let clinica = new Clinica("Clinica bem estar", "Rua das flores, 50", "Cardiologia");
    let lab = new Laboratorio("Prevent", "Rua Tupiniquins, 544", "Sangue, Raio-X");
    let consulta = paciente.marcarConsulta(medico, "10/11/2026 14:00");
    let exame = medico.solicitarExame(paciente, "Hemograma", "10/11/2026");
    let tratamento = new Tratamento("Fisioterapia para o joelho", 30, "Em andamento");
    let internacao = new Internacao("20/11/2026", "Quarto 12", "Cirurgia");

    let texto = "";
    texto += "Plano: " + plano.nome + "<br>";
    texto += "Paciente: " + paciente.nome + " (" + paciente.tipoSanguineo + ")<br>";
    texto += "Médico: " + medico.nome + " - " + medico.especialidades + "<br>";
    texto += "Fisioterapeuta: " + fisio.nome + " - " + fisio.crefito + "<br>";
    texto += "Hospital: " + hospital.nome + " - leitos: " + hospital.leitosDisponiveis + "<br>";
    texto += "Clínica: " + clinica.nome + "<br>";
    texto += "Laboratório: " + lab.nome + "<br>";
    texto += "Consulta: " + consulta.paciente.nome + " com " + consulta.medico.nome + " em " + consulta.dataHora + "<br>";
    texto += "Exame: " + exame.tipo + " solicitado em " + exame.dataSolicitacao + "<br>";
    texto += "Tratamento: " + tratamento.descricao + " (" + tratamento.status + ")<br>";
    texto += "Internação: " + internacao.quarto + " - " + internacao.motivo + "<br>";

    // verificando a herança com instanceof
    texto += "<br>Medico é instância de Pessoa? " + (medico instanceof Pessoa);

    document.getElementById("resultado").innerHTML = texto;
}

function cadastrarPaciente() {
    let nome = document.getElementById("pacNome").value;
    let cpf = document.getElementById("pacCpf").value;
    let endereco = document.getElementById("pacEndereco").value;
    let sangue = document.getElementById("pacSangue").value;

    let paciente = new Paciente(nome, cpf, "", "", endereco, sangue, "Ativo");

    document.getElementById("resultado").innerHTML =
        "Paciente cadastrado:<br>" +
        "Nome: " + paciente.nome + "<br>" +
        "CPF: " + paciente.cpf + "<br>" +
        "Endereço: " + paciente.endereco + "<br>" +
        "Tipo sanguíneo: " + paciente.tipoSanguineo + "<br>" +
        "Status do plano: " + paciente.statusPlano;
}

function cadastrarMedico() {
    let nome = document.getElementById("medNome").value;
    let cpf = document.getElementById("medCpf").value;
    let crm = document.getElementById("medCrm").value;
    let valor = document.getElementById("medValor").value;

    let medico = new Medico(nome, cpf, "", "", crm, "", valor);

    document.getElementById("resultado").innerHTML =
        "Médico cadastrado:<br>" +
        "Nome: " + medico.nome + "<br>" +
        "CPF: " + medico.cpf + "<br>" +
        "CRM: " + medico.crm + "<br>" +
        "Valor da consulta: R$ " + medico.valorConsulta;
}
