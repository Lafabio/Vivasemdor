const defaults = {
  comunicacao: 'O estudante apresenta comprometimento na linguagem oral, com dificuldades em acessar palavras adequadas ao seu repertório em determinadas situações. Ainda assim, consegue se comunicar de forma funcional, sendo compreendido na maioria das vezes. Demonstra capacidade de organizar suas ideias e expressar suas intenções, evidenciando também aspectos de pensamento crítico.',
  participacao: 'No ambiente escolar, o estudante não apresenta participação ativa de forma consistente nas atividades propostas. Em alguns momentos, demonstra resistência ou não realiza as tarefas solicitadas, necessitando de mediação e incentivo para maior engajamento.',
  aprendizagem: 'O estudante apresenta dificuldades na compreensão dos conteúdos trabalhados, o que impacta seu desempenho acadêmico. Também demonstra limitações na atenção e concentração, necessitando de adaptações, estratégias diferenciadas e apoio constante para favorecer seu processo de aprendizagem.',
  autonomia: 'Busca realizar atividades de forma independente, demonstrando iniciativa. Quando necessário, solicita ajuda de forma adequada, o que indica bom nível de consciência sobre suas necessidades.',
  avp: 'Apresenta autonomia nas atividades de vida diária, especialmente no que se refere à higiene pessoal e alimentação, não sendo observadas dificuldades significativas nessas áreas.',
  comportamento: 'O estudante, em algumas situações, tende a se impor de forma brusca, podendo utilizar gritos e, ocasionalmente, linguagem inadequada. Apresenta dificuldades na autorregulação emocional. Apesar disso, demonstra interesse em interações sociais, possui alguns amigos e busca estabelecer vínculos com os colegas.',
  saude: 'O estudante realiza acompanhamento com profissional da psiquiatria, não fazendo uso de medicação no momento.',
  atendimentos: 'Realiza acompanhamento com profissional da área da saúde (psiquiatria).',
  acompanhamento: 'Conta com o apoio de profissional especializado na área de inclusão, que auxilia no processo de adaptação, mediação das atividades e promoção da aprendizagem.',
  observacoes: 'O estudante apresenta potencial para desenvolvimento, especialmente quando recebe mediação adequada e estratégias pedagógicas diferenciadas. É importante investir em recursos que favoreçam sua atenção, compreensão e regulação emocional, bem como incentivar sua participação nas atividades escolares e sociais.'
};

const fields = [
  'estudante', 'nascimento', 'unidade', 'turma', 'diagnostico', 'area', 'docente',
  'comunicacao', 'participacao', 'aprendizagem', 'autonomia', 'avp',
  'comportamento', 'saude', 'atendimentos', 'acompanhamento', 'observacoes'
];

function restore() {
  const saved = JSON.parse(localStorage.getItem('pei-form') || '{}');
  for (const [k, v] of Object.entries(defaults)) {
    if (!saved[k]) saved[k] = v;
  }
  for (const id of fields) {
    const el = document.getElementById(id);
    if (el && saved[id]) el.value = saved[id];
  }
}

function collect() {
  return fields.reduce((acc, id) => {
    acc[id] = document.getElementById(id)?.value?.trim() || '';
    return acc;
  }, {});
}

function salvar() {
  localStorage.setItem('pei-form', JSON.stringify(collect()));
  document.getElementById('status').textContent = 'Dados salvos localmente.';
}

function baixar() {
  const d = collect();
  const content = `Plano Educacional Individualizado\n\nDados Gerais\nEstudante: ${d.estudante}\nNascimento: ${d.nascimento}\nUnidade: ${d.unidade}\nTurma: ${d.turma}\nDiagnóstico: ${d.diagnostico}\nÁrea: ${d.area}\nDocente: ${d.docente}\n\nComunicação\n${d.comunicacao}\n\nParticipação\n${d.participacao}\n\nAprendizagem\n${d.aprendizagem}\n\nAutonomia\n${d.autonomia}\n\nAtividades de Vida Prática\n${d.avp}\n\nComportamento\n${d.comportamento}\n\nSaúde\n${d.saude}\n\nAtendimentos especializados\n${d.atendimentos}\n\nAcompanhamento na escola\n${d.acompanhamento}\n\nObservações\n${d.observacoes}\n`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `pei-${d.estudante.toLowerCase().replace(/\s+/g, '-') || 'estudante'}.txt`;
  a.click();
  URL.revokeObjectURL(a.href);
}

document.getElementById('salvar').addEventListener('click', salvar);
document.getElementById('baixar').addEventListener('click', baixar);
restore();
