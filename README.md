# Resumo do Projeto DRM Solidário
DRM Solidário é um aplicativo web feito em React que permite a doação de alimentos para famílias carentes. O usuário pode cadastrar seu nome, o alimento que deseja doar e a quantidade em quilos. Após a doação, o item aparece em uma lista abaixo do formulário, mostrando as doações já feitas pelo usuário.

# Funcionalidades principais:
Formulário com campos para nome do doador, alimento e quantidade (kg).

Validação para não aceitar doações com campos vazios.

Bloqueio para alimentos proibidos (como sal e alimentos perecíveis).

Exibição da lista atualizada de todas as doações feitas.

Botão para limpar toda a lista de doações.

Limpeza dos campos após cada doação bem-sucedida.

# Testes automatizados:
O projeto possui uma suíte com 10 testes que garantem o funcionamento correto, como:

Renderização dos elementos principais.

Validação dos campos obrigatórios.

Adição correta de doações válidas.

Não aceitação de alimentos proibidos.

Limpeza dos inputs e da lista.

Manutenção das doações anteriores após novas inserções.

