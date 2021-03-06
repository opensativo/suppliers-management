import React from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";

const columns = [
  { name: "Nome" },
  { name: "NIF" },
  { name: "Endereço" },
  { name: "Contactos" },
  { name: "Email" },
  { name: "Inicio" },
  { name: "Produto/Serviço" },
  {
    name: "Link",
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return <Link to={`/suppliers/${value}`}>{"Abrir"}</Link>;
      },
    },
  },
];

const options = {
  filterType: "checkbox",
  textLabels: {
    body: {
      noMatch: "A pesquisa não encontrou fornecedores",
      toolTip: "Ordenar",
      columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
    },
    pagination: {
      next: "Avançar Pag.",
      previous: "Recuar Pag.",
      rowsPerPage: "Linhas/Pag.:",
      displayRows: "/",
    },
    toolbar: {
      search: "Pesquisar",
      downloadCsv: "Baixar CSV",
      print: "Imprimir",
      viewColumns: "Ver colunas",
      filterTable: "Filtrar lista",
    },
    filter: {
      all: "Todos",
      title: "Filtros",
      reset: "Repor",
    },
    viewColumns: {
      title: "Mostrar Columnas",
      titleAria: "Mostrar/Ocultar Columnas da Lista",
    },
    selectedRows: {
      text: "Linha(s) Selececcionada(s)",
      delete: "Eliminar",
      deleteAria: "Eliminar Linhas Seleccionadas",
    },
  },
};

const SuppliersTable = ({ data }) => {
  const newArray = data.map((supplier) => {
    return {
      Nome: supplier.name,
      NIF: supplier.nif,
      Endereço: supplier.address.municipalty,
      Contactos: supplier.contacts.phone1,
      Email: supplier.contacts.email,
      Inicio: supplier.startDate,
      // Oservações: supplier.obs,
      "Produto/Serviço": supplier.description,
      Type: supplier.type,
      Link: supplier.supplierId,
    };
  });

  return (
    <MUIDataTable
      // title={"Employee List"}
      data={newArray}
      columns={columns}
      options={options}
    />
  );
};

export default SuppliersTable;
