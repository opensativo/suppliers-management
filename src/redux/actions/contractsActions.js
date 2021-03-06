import {
  SET_ERRORS,
  SET_CONTRACTS,
  LOADING_DATA,
  SET_CONTRACT,
  SET_BILLS,
  LOADING_UI,
  STOP_LOADING_UI,
} from "../types";

export const getAllContracts = (firebase) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  firebase.db
    .collection("contracts")
    .orderBy("date", "desc")
    .get()
    .then((data) => {
      let contracts = [];
      data.forEach((doc) => {
        contracts.push({
          ...doc.data(),
          contractId: doc.id,
        });
      });
      dispatch({
        type: SET_CONTRACTS,
        payload: contracts,
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

export const getContract = (firebase, contractId, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  firebase.db
    .doc(`/contracts/${contractId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        alert("Este contrato nao existe ou deve ter sido apagado!");
        return history.push("/contracts");
      }
      dispatch({
        type: SET_CONTRACT,
        payload: { ...doc.data(), contractId: doc.id },
      });
      dispatch({
        type: STOP_LOADING_UI,
      });
    })
    .catch((err) => {
      console.log(err);
      alert("Ocorreu um erro desconhecido, tente novamente");
      history.push("/contracts");
    });
};

export const getContractBills = (firebase, contractId, history) => (
  dispatch
) => {
  dispatch({ type: LOADING_DATA });

  firebase.db
    .collection("bills")
    .where("contractId", "==", contractId)
    .orderBy("date", "desc")
    .get()
    .then((data) => {
      let bills = [];
      data.forEach((doc) => {
        bills.push({
          ...doc.data(),
          billId: doc.id,
        });
      });
      dispatch({
        type: SET_BILLS,
        payload: bills,
      });
    })
    .catch((err) => {
      console.log(err);
      alert("Ocorreu um erro desconhecido, tente novamente");
      history.push(`/contracts/${contractId}`);
    });
};

export const deleteContract = (firebase, contractId, history) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  const document = firebase.db.doc(`/contracts/${contractId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return alert("Este contrato já foi eliminado!");
      } else {
        return document.delete();
      }
    })
    .then(() => {
      alert("Documento eliminado com sucesso!");
      dispatch(getAllContracts(firebase));
      history.push("/contracts");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};

export const updateContract = (firebase, contractId, history, contractData) => (
  dispatch
) => {
  dispatch({ type: LOADING_DATA });
  firebase.db
    .doc(`/contracts/${contractId}`)
    .update(contractData)
    .then(() => {
      alert("Actualização feita com sucesso!");
      history.push(`/contracts/${contractId}`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};
