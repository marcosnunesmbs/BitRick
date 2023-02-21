const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');

const nomePasta =  process.env.npm_config_name || 'NewPlugin'; //nome da variável

const pastaPlugin = path.join('src', 'plugins'); //caminho para a pasta src/plugin

const pastaNova = path.join(pastaPlugin, nomePasta); //caminho para a nova pasta que será criada

//Cria a pasta com o nome da variável dentro de src/plugin
fs.mkdir(pastaNova, (err) => {
    
  if (err) throw err;
  console.log(`Pasta ${nomePasta} criada com sucesso!`);
  

  const pastaSample = path.join(__dirname, 'sample'); //caminho para a pasta sample

  const arquivos = fs.readdirSync(pastaSample); //lista todos os arquivos dentro da pasta sample

  arquivos.forEach((arquivo) => {
    const caminhoArquivo = path.join(pastaSample, arquivo); //caminho para o arquivo na pasta sample
    
    //Copia o arquivo para a nova pasta
    fsExtra.copy(caminhoArquivo, path.join(pastaNova, arquivo), (err) => {
      if (err) throw err;
      console.log(`Arquivo ${arquivo} copiado com sucesso!`);
    });
  });
});
