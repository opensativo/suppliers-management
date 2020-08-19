import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Agreement = ({
  state,
  handleFile,
  handleChange,
  handleSubmit,
  agreement,
  closeModal,
}) => {
  const isDisabled = !state.selectedFile || state.loaded > 0;
  const loading = useSelector((state) => state.data.loading);

  return (
    <form onSubmit={handleSubmit}>
      <div className={state.modal ? "modal is-active" : "modal"}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              Adicionar factura - Acordo-Quadro #{agreement.reference}
            </p>
            <button
              onClick={closeModal}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Descrição</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      required
                      className="input"
                      type="text"
                      placeholder="Descrição sobre a factura"
                      name="description"
                      value={state.description}
                      onChange={handleChange}
                    />
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
                  <p className="help">
                    Escreva o valor sem virgulas, nem pontos.
                  </p>
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
          </section>
          <footer className="modal-card-foot">
            <button
              disabled={isDisabled}
              className={
                loading ? "button is-warning is-loading" : "button is-warning"
              }
            >
              Adicionar
            </button>
            {!loading && (
              <button
                onClick={closeModal}
                type="button"
                className="button is-danger"
              >
                Cancelar
              </button>
            )}
          </footer>
        </div>
      </div>
    </form>
  );
};
export default Agreement;
