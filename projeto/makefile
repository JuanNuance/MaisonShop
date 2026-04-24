# Makefile para o projeto API Projeto II

# Variáveis
VENV = ../.venv
PYTHON = $(VENV)/bin/python
PIP = $(PYTHON) -m pip
UVICORN = $(PYTHON) -m uvicorn
PYTEST = $(PYTHON) -m pytest
# O módulo da aplicação aponta para o objeto 'app' dentro de projeto/app/main.py
APP_MODULE = projeto.app.main:app
PORT = 8000
# PYTHONPATH definido para o diretório pai para que o pacote 'projeto' seja encontrado corretamente
PYTHONPATH = ..

.PHONY: help run test build clean

# Ajuda por padrão
help:
	@echo "Comandos disponíveis:"
	@echo "  make run    - Executa a aplicação FastAPI com auto-reload (ambiente de desenvolvimento)"
	@echo "  make test   - Executa os testes automatizados utilizando pytest"
	@echo "  make build  - Instala todas as dependências do projeto"
	@echo "  make clean  - Remove arquivos temporários e caches (.pyc, __pycache__, etc)"

# Rodar a aplicação
run:
	@echo "Iniciando a aplicação..."
	PYTHONPATH=$(PYTHONPATH) $(UVICORN) $(APP_MODULE) --reload --port $(PORT)

# Rodar os testes
test:
	@echo "Executando testes..."
	PYTHONPATH=$(PYTHONPATH) $(PYTEST)

# Build (Instalação de dependências)
build:
	@echo "Instalando dependências..."
	$(PIP) install -r requirements.txt
	@echo "Build finalizado com sucesso."

# Limpeza
clean:
	@echo "Limpando arquivos temporários..."
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	rm -rf .pytest_cache
	rm -rf .coverage
	@echo "Limpeza concluída."
