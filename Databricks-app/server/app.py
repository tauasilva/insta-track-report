import logging
from typing import Annotated, Any
from fastapi import Depends, FastAPI
from pydantic import BaseModel, ValidationError
import os
import pandas as pd
import json
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from databricks.sdk import WorkspaceClient
from fastapi.responses import JSONResponse
from databricks import sql as databricks_sql
from databricks.sdk.service.serving import (
    ChatMessage,
    ChatMessageRole,
)
from databricks.sdk.core import Config
from decimal import Decimal
# Set up logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)
logger.info("Logger initialized successfully!")


# Ensure environment variable is set correctly
# assert os.getenv('DATABRICKS_WAREHOUSE_ID')



def sqlQuery(query: str) -> pd.DataFrame:
    """Execute a SQL query and return the result as a pandas DataFrame."""
    cfg = Config()  # Pull environment variables for auth
    with databricks_sql.connect(
        server_hostname=cfg.host,
        http_path=f"/sql/1.0/warehouses/{'c5949812aaa6e66d'}",
        credentials_provider=lambda: cfg.authenticate
    ) as connection:
        with connection.cursor() as cursor:
            cursor.execute("SET TIME ZONE 'America/Sao_Paulo';")
            cursor.execute(query)
            return cursor.fetchall_arrow().to_pandas()


def ReturnIndicadoresHoraHora() -> pd.DataFrame:
    """Return KPIS """


    sql = '''
        select
        hr_venda as hora,
        round(sum(vl_acumulado_vendas)) as vendas,
        round(sum(vl_meta_proporcional)) as metas
        from
        sellout.refined.tb_fat_sellout_monitoria_dia_atual_hora_hora
        where dt_meta = current_date()
        group by all
        order by hr_venda
    '''

    # Fetch the data
    try:
        # This example query depends on the nyctaxi data set in Unity Catalog, see https://docs.databricks.com/en/discover/databricks-datasets.html for details
        data = sqlQuery(sql)
        print(f"Data shape: {data.shape}")
        print(f"Data columns: {data.columns}")

        dados = data.astype(object).where(pd.notnull(data), None)

        for col in dados.select_dtypes(include='object'):
            dados[col] = dados[col].apply(lambda x: float(x) if isinstance(x, Decimal) else x)

        dados = dados.to_dict(orient="records")
        print(dados)
        return JSONResponse(content=dados)      

    except Exception as e:
        print(f"An error occurred in querying data: {str(e)}")
        return {"message": "ERROR"}


def ReturnIndicadores_v2() -> pd.DataFrame:
    """Return KPIS """


    sql = '''
        select
        round(sum(vl_realizado)) as faturado,
        round(sum(vl_meta)) as meta,
        round(sum(case when ds_canal_faturado = 'Franquias' then vl_realizado else 0 end )) as franquias,
        round(sum(case when ds_canal_faturado in ('Loja Própria','Outlet')then vl_realizado else 0 end )) as loja_propria,
        round(sum(case when ds_canal_faturado = 'E-commerce' then vl_realizado else 0 end )) as ecommerce,

        round(sum(case when ds_canal_faturado = 'Franquias' then vl_meta else 0 end )) as franquias_meta,
        round(sum(case when ds_canal_faturado in ('Loja Própria','Outlet') then vl_meta else 0 end )) as loja_propria_meta,
        round(sum(case when ds_canal_faturado = 'E-commerce' then vl_meta else 0 end )) as ecommerce_meta
        from
        sellout.refined.tb_fat_sellout_monitoria_dia_atual
        where dt_meta = current_date()
        group by all
    '''

    # Fetch the data
    try:
        # This example query depends on the nyctaxi data set in Unity Catalog, see https://docs.databricks.com/en/discover/databricks-datasets.html for details
        data = sqlQuery(sql)
        print(f"Data shape: {data.shape}")
        print(f"Data columns: {data.columns}")

        dados = data.astype(object).where(pd.notnull(data), None)

        for col in dados.select_dtypes(include='object'):
            dados[col] = dados[col].apply(lambda x: float(x) if isinstance(x, Decimal) else x)

        dados = dados.to_dict(orient="records")
        print(dados)
        return JSONResponse(content=dados)      

    except Exception as e:
        print(f"An error occurred in querying data: {str(e)}")
        return {"message": "ERROR"}

def ReturnIndicadores() -> pd.DataFrame:
    """Return KPIS """


    sql = '''
        Select * from main.zzdata.tb_fat_retorno_app
    '''

    # Fetch the data
    try:
        # This example query depends on the nyctaxi data set in Unity Catalog, see https://docs.databricks.com/en/discover/databricks-datasets.html for details
        data = sqlQuery(sql)
        print(f"Data shape: {data.shape}")
        print(f"Data columns: {data.columns}")


        data["json_dict"] = data["json"].apply(json.loads)
        dados = data["json_dict"][0]

        # dados = data.astype(object).where(pd.notnull(data), None)

        # for col in dados.select_dtypes(include='object'):
        #     dados[col] = dados[col].apply(lambda x: float(x) if isinstance(x, Decimal) else x)

        # dados = dados.to_dict(orient="records")
        # print(dados)
        return JSONResponse(content=dados)      

    except Exception as e:
        print(f"An error occurred in querying data: {str(e)}")
        return {"message": "ERROR"}


app = FastAPI()
ui_app = StaticFiles(directory="client/dist", html=True)
api_app = FastAPI()


@api_app.get("/vendahorahora")
def get_dados():
    # Converte o DataFrame para uma lista de dicionários (records)
    # dados = df.to_dict(orient="records")
    return ReturnIndicadoresHoraHora()


@api_app.get("/dados")
def get_dados():
    # Converte o DataFrame para uma lista de dicionários (records)
    # dados = df.to_dict(orient="records")
    return ReturnIndicadores()


# PLEASE NOTE THE ORDER OF THE MOUNTS MATTERS

app.mount("/api", api_app)
app.mount("/", ui_app) # Aqui ele redireciona pro dist do react dohas

origins = [
    "http://localhost:3000",
]



# client
def client():
    return WorkspaceClient()

