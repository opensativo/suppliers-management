import {
  SET_ERRORS,
  SET_CONTRACTS,
  LOADING_DATA,
  SET_DOCUMENTS,
  LOADING_UI,
  POST_PROCEDURE,
  SET_PROCEDURES,
  SET_PROCEDURE,
} from "../types";
import { clearErrors } from "./dataActions";

export const postProcedure = (firebase, newProcedure, history) => (
  dispatch
) => {
  dispatch({ type: LOADING_UI });
  const proceduresRef = firebase.db.collection("procedures");
  async function getRepeatedReferenceOrDescription() {
    const isReference = proceduresRef
      .where("reference", "==", newProcedure.reference)
      .get();
    const isDescription = proceduresRef
      .where("description", "==", newProcedure.description)
      .get();

    const [
      referenceQuerySnapshot,
      descriptionQuerySnapshot,
    ] = await Promise.all([isReference, isDescription]);

    const descriptionArray = descriptionQuerySnapshot.docs;
    const referenceArray = referenceQuerySnapshot.docs;

    const repeatedArray = descriptionArray.concat(referenceArray);

    return repeatedArray;
  }

  //We call the asychronous function
  getRepeatedReferenceOrDescription().then((result) => {
    console.log(result);
    if (result.length > 0) {
      return dispatch({
        type: SET_ERRORS,
        payload: {
          procedure:
            "Numero de referencia ou despacho ja existe! Verifique e tente novamente.",
        },
      });
    }
    firebase.db
      .collection("procedures")
      .add(newProcedure)
      .then((doc) => {
        const resProcedure = newProcedure;
        resProcedure.procedureId = doc.id;
        dispatch({
          type: POST_PROCEDURE,
          payload: resProcedure,
        });
        dispatch(clearErrors());
        alert("Procedimento cadastrado com sucesso");
        history.push(`/procedures`);
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: SET_ERRORS,
          payload: err,
        });
      });
  });
};

export const getAllProcedures = (firebase) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  firebase.db
    .collection("procedures")
    .orderBy("date", "desc")
    .get()
    .then((data) => {
      let procedures = [];
      data.forEach((doc) => {
        procedures.push({
          ...doc.data(),
          procedureId: doc.id,
        });
      });
      dispatch({
        type: SET_PROCEDURES,
        payload: procedures,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};

export const getProcedure = (firebase, procedureId, history) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  firebase.db
    .doc(`/procedures/${procedureId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        alert("Este procedimento nao existe ou deve ter sido apagado!");
        return history.push("/procedures");
      }
      dispatch({
        type: SET_PROCEDURE,
        payload: { ...doc.data(), procedureId: doc.id },
      });
    })
    .catch((err) => {
      console.log(err);
      alert("Ocorreu um erro desconhecido, tente novamente");
      history.push("/procedures");
    });
};

export const getProcedureDocuments = (firebase, procedureId, history) => (
  dispatch
) => {
  dispatch({ type: LOADING_DATA });

  firebase.db
    .collection("documents")
    .where("procedureId", "==", procedureId)
    .orderBy("date", "desc")
    .get()
    .then((data) => {
      let documents = [];
      data.forEach((doc) => {
        documents.push({
          ...doc.data(),
          documentId: doc.id,
        });
      });
      dispatch({
        type: SET_DOCUMENTS,
        payload: documents,
      });
    })
    .catch((err) => {
      console.log(err);
      alert("Ocorreu um erro desconhecido, tente novamente");
      history.push(`/procedures/${procedureId}`);
    });
};

export const deleteProcedure = (firebase, procedureId, history) => (
  dispatch
) => {
  dispatch({ type: LOADING_DATA });
  const document = firebase.db.doc(`/procedures/${procedureId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return alert("Este fornecedor já foi eliminado!");
      } else {
        return document.delete();
      }
    })
    .then(() => {
      alert("Documento eliminado com sucesso!");
      dispatch(getAllProcedures(firebase));
      history.push("/procedures");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};
export const updateProcedure = (
  firebase,
  procedureId,
  history,
  procedureData
) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  firebase.db
    .doc(`/procedures/${procedureId}`)
    .update(procedureData)
    .then(() => {
      alert("Actualização feita com sucesso!");
      history.push(`/procedures/${procedureId}`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};

export const deleteDocument = (firebase, documentId, procedureId, history) => (
  dispatch
) => {
  dispatch({ type: LOADING_DATA });
  const document = firebase.db.doc(`/documents/${documentId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return alert("Este documento já foi eliminado!");
      } else {
        return document.delete();
      }
    })
    .then(() => {
      alert("Documento eliminado com sucesso!");
      dispatch(getProcedureDocuments(firebase, procedureId, history));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};
