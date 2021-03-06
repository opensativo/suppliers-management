import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AddContract = ({
  state,
  handleChange,
  handleSubmit,
  suppliers,
  handleFile,
}) => {
  const loading = useSelector((state) => state.data.loading);
  const error = useSelector((state) => state.UI.errors);
  const isDisabled =
    !state.supplier || !state.status || !state.selectedFile || state.loaded > 0;
  return (
    <form onSubmit={handleSubmit}>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Numero/Ref.</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                required
                className={error.contract ? "input is-danger" : "input"}
                type="text"
                placeholder="Numero ou referencia do contrato"
                name="reference"
                value={state.reference}
                onChange={handleChange}
              />
            </div>
            {error.contract && (
              <p className="help is-danger">{error.contract}</p>
            )}
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Empresa</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select">
                <select name="supplier" onChange={handleChange}>
                  <option value="">Seleccione</option>
                  {suppliers.map((supplier) => (
                    <option
                      key={supplier.supplierId}
                      value={supplier.supplierId}
                    >
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Valor</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="field has-addons">
              <p className="control">
                <a className="button is-static">Akz</a>
              </p>
              <p className="control is-expanded">
                <input
                  required
                  className="input"
                  type="number"
                  placeholder="Valor do contrato"
                  name="price"
                  value={state.price}
                  onChange={handleChange}
                />
              </p>
            </div>
            <p className="help">Escreva o valor sem virgulas, nem pontos.</p>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Data</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                required
                name="name"
                className="input"
                type="date"
                name="date"
                value={state.date}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Estado</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select">
                <select name="status" onChange={handleChange}>
                  <option value="">Seleccione</option>
                  <option value="active">Activo</option>
                  <option value="terminated">Terminado</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Objecto</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <textarea
                required
                name="objective"
                value={state.objective}
                onChange={handleChange}
                className="textarea"
                placeholder="Objecto do contrato"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Observações</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <textarea
                name="obs"
                value={state.obs}
                onChange={handleChange}
                className="textarea"
                placeholder="Observações sobre o contrato"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label">
          {/* <!-- Left empty for spacing --> */}
        </div>
        <div className="field-body">
          <div className="file has-name">
            <label className="file-label">
              <input
                onChange={handleFile}
                className="file-input"
                type="file"
                name="file"
                accept="application/pdf"
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Carregar ficheiro…</span>
              </span>
              <span className="file-name">
                {state.selectedFile && state.selectedFile.name}
              </span>
            </label>
          </div>
        </div>
      </div>
      {state.loaded > 0 && (
        <progress
          className="progress is-primary"
          value={state.loaded}
          max="100"
        >
          {state.loaded}%
        </progress>
      )}
      <div className="field is-horizontal">
        <div className="field-label">
          {/* <!-- Left empty for spacing --> */}
        </div>
        <div className="field-body">
          <div className="field is-grouped">
            <div className="control">
              <button
                disabled={isDisabled}
                className={
                  loading ? "button is-warning is-loading" : "button is-warning"
                }
              >
                Cadastrar
              </button>
            </div>
            <Link to="/contracts" className="button is-danger">
              Cancelar
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddContract;
