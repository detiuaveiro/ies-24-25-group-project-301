# 🚀 Space301 - Sistema de Monitoramento de Lançamentos Espaciais

Bem-vindo ao **Space301**! Este projeto é um sistema de monitoramento em tempo real de foguetões, focado em fornecer dados cruciais durante os lançamentos espaciais. Ele inclui desde o acompanhamento dos parâmetros do foguete até a análise dos sinais vitais da tripulação a bordo.

## Execução:
### Executar o docker
`$ docker-compose up --build`

### Inserir dados:
`$ ./scripts/astronauts.sh`
`$ ./scripts/rockets.sh`

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Uso](#uso)
- [Autores](#autores)

## 🌌 Sobre o Projeto

O **Space301** foi desenvolvido para atender à necessidade de monitoramento completo de lançamentos espaciais, garantindo uma interface para engenheiros, operadores e o público em geral acompanhar os lançamentos em tempo real. Ele inclui:
- Monitoramento de dados em tempo real como velocidade, aceleração e temperatura.
- Sistema de alertas quando parâmetros estão fora do padrão.
- Monitoramento da tripulação, integridade do foguete e da carga.
- Acesso a estatísticas de lançamentos anteriores para análise.

## ✨ Funcionalidades

- **Monitoramento em Tempo Real**: Velocidade, aceleração, combustível, temperatura e muito mais.
- **Alertas Automáticos**: Notificações para parâmetros fora dos padrões seguros.
- **Análise do Histórico de Lançamentos**: Dados históricos e re- Empresa de Exploração Espacialatórios de desempenho.
- **Monitoramento de Tripulação**: Sinais vitais dos tripulantes a bordo.
- **Acompanhamento Público**: Gráficos e informações em tempo real para o público.

## 🛠️ Instalação

### Pré-requisitos


### Passos


## 🚀 Uso

  
### Exemplos de Endpoints


## 👨‍🚀 Autores

- **Shelton Agostinho** - 115697
    > **Role:** Product owner
- **Edivaldo Bonfim** - 110124
    > **Role:** Architect
- **Giovanni Santos** - 115637
    > **Role:** DevOps master
- **Rafael Semedo** - 115665
    > **Role:** Team manager

---

# Backlog

## 1. Acesso aos dados históricos dos lançamentos
**User Story**:  
**Como** engenheiro de dados, **quero** acessar os dados do histórico dos lançamentos anteriores, **para** que possa analisar o desempenho dos foguetões e detetar padrões que possam melhorar próximos lançamentos.  

**Critérios de Aceitação**:
- Acesso aos dados por REST API e/ou Websockets.
- Filtros por missão, tipo de foguete e parâmetros específicos.
- Ferramentas de visualização de padrões em gráficos e tabelas.

---

## 2. Análises do foguete em tempo real
**User Story**:  
**Como** engenheiro da missão, **quero** realizar análises do foguete em tempo real, como parâmetros, nível de integridade e estados da tripulação/carga, **para** que possa ser feita a análise do desempenho ou para uso na manutenção.  

**Critérios de Aceitação**:
- Visualização em tempo real dos principais parâmetros e estados.
- Alertas automáticos em caso de discrepância em dados.
- Acesso a dados históricos e em tempo real para comparação.

---

## 3. Gerenciamento de permissões dos usuários
**User Story**:  
**Como** administrador de sistemas, **quero** gerenciar e definir permissões dos usuários, **para** que apenas as pessoas autorizadas possam ver e modificar os dados do lançamento.  

**Critérios de Aceitação**:
- Interface para gerenciamento de usuários e permissões.
- Definição de permissões por grupo (Admin, Operador, Visualizador).

---

## 4. Acompanhamento de lançamentos para o público
**User Story**:  
**Como** público, **quero** acompanhar os lançamentos dos foguetes através de gráficos que mostrem os parâmetros, **para** entender mais sobre os lançamentos e entretenimento.  

**Critérios de Aceitação**:
- Gráficos em tempo real com informações como velocidade, altitude e combustível.
- Interface simples e acessível.
- Atualizações automáticas durante o lançamento.

---

## 5. Estatísticas financeiras de lançamentos *
**User Story**:  
**Como** gerente de projeto, **quero** traçar estatísticas de lançamentos com base nos gastos e perdas, **para** fornecer feedback financeiro.  

**Critérios de Aceitação**:
- Relatório de gastos por missão, com gráficos detalhados.
- Comparação de custos entre lançamentos e identificação de tendências.

---

## 6. Monitoramento de sinais vitais em tempo real
**User Story**:  
**Como** médico de missão, **quero** monitorar em tempo real os sinais vitais da tripulação, **para** ver se as condições atuais da nave encontram-se estáveis.  

**Critérios de Aceitação**:
- Exibição contínua dos sinais vitais (frequência cardíaca, pressão arterial, etc.).
- Alertas automáticos em caso de sinais fora do padrão.
- Histórico de sinais vitais com comparação a períodos anteriores da missão.

---

## 7. Monitoramento do estado de sinal entre foguete e base
**User Story**:  
**Como** equipe de comunicação, **quero** monitorar o estado de sinal entre o foguete e a base, **para** garantir que a comunicação permaneça estável.  

**Critérios de Aceitação**:
- Exibição da qualidade do sinal em tempo real.
- Alertas automáticos sobre possíveis quedas de comunicação.

---

## 8. Receber dados de avisos para emergências
**User Story**:  
**Como** equipe de resposta a emergências, **queremos** receber os dados dos avisos quando os parâmetros estão fora do padrão, **para** poder elaborar as medidas necessárias e comunicar aos tripulantes.  

**Critérios de Aceitação**:
- Sistema de alerta que notifica automaticamente a equipe de emergência.
- Detalhamento de parâmetros anômalos e causas potenciais.
- Acesso rápido ao histórico de alertas para diagnóstico.

---

## 9. Monitoramento do primeiro estágio do foguete
**User Story**:  
**Como** engenheiro da missão, **quero** monitorar o “primeiro estágio” que vai ser separado do foguete principal, **para** ver se este pode ser reutilizado para futuros lançamentos.  

**Critérios de Aceitação**:
- Monitoramento da integridade do primeiro estágio após a separação.
- Localização em tempo real e status do estágio.
- Registro de histórico de reutilizações.

---

# Parâmetros a Monitorar
1. Velocidade
2. Aceleração
3. Quantidade de combustível
4. Taxa de combustão
5. Temperaturas dos motores
6. Níveis de oxigênio (combustão e tripulação)
7. Energia elétrica (gerada e armazenada)
8. Mantimentos (para tripulação)
9. Qualidade do sinal transmitido
10. Temperatura interna e externa da nave
11. Pressão interna e externa da nave
12. Altitude da nave (em relação ao nível do mar)
13. Dimensão da nave
14. Força G no interior da nave
15. Nível de radiação
16. Pressao arterial
17. Niveis de oxigeneo no sangue
18. Frequencia cardiaca