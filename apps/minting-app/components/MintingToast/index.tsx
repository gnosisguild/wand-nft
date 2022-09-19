import React, { useEffect } from "react";
import { useAppContext } from "../../state";
import { MintStage } from "../../types";

const MintingToast: React.FC = () => {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    let id: NodeJS.Timeout | undefined;
    if (state.stage === MintStage.ERROR || state.stage === MintStage.SUCCESS) {
      id = setTimeout(() => {
        dispatch({ type: "changeMintStage", value: MintStage.IDLE });
      }, 5000);
    }

    return () => {
      if (id) {
        clearTimeout(id);
      }
    };
  }, [dispatch, state.stage]);

  return state.stage !== MintStage.IDLE ? (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        textAlign: "center",
        marginTop: 20,
      }}
    >
      <p
        style={{
          fontSize: "25px",
        }}
      >
        {message(state.stage)}
      </p>
    </div>
  ) : null;
};

export default MintingToast;

function message(stage: MintStage) {
  if (MintStage.SIGNING === stage) {
    return "Signing";
  } else if (MintStage.TRANSACTING === stage) {
    return "Transacting";
  } else if (MintStage.SUCCESS === stage) {
    return "Success";
  } else if (MintStage.ERROR === stage) {
    return "Error";
  }
  return "";
}
