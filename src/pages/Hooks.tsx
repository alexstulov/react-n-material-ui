import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
const NewContext = React.createContext("");

const UseStateSwitcher = () => {
  const [settings, setSettings] = useState({
    color: "white",
    fontSize: 10,
  });
  // you may make it like one-per-line
  // const [color, setColor] = useState('white');
  // const [fontSize, setFontSize] = useState(10);

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: settings.color,
        fontSize: `${settings.fontSize}px`,
      }}
    >
      <h2>Hello, useState hook!</h2>
      <p>Background color:</p>
      <button onClick={() => setSettings((s) => ({ ...s, color: "darkgrey" }))}>
        Dark
      </button>
      <button
        onClick={() => setSettings((s) => ({ ...s, color: "lightgrey" }))}
      >
        Light
      </button>
      <p>Font size:</p>
      <button
        onClick={() => setSettings((s) => ({ ...s, fontSize: s.fontSize - 2 }))}
      >
        -
      </button>
      <button
        onClick={() => setSettings((s) => ({ ...s, fontSize: s.fontSize + 2 }))}
      >
        +
      </button>
    </div>
  );
};

const UseContextValue = () => {
  const value = useContext(NewContext);
  return <h2>{value}</h2>;
};

const UseEffect = () => {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(true);

  const content = visible ? (
    <>
      <button onClick={() => setValue((v) => v + 1)}>+</button>
      <button onClick={() => setVisible(false)}>hide</button>
      <ClassCounter value={value} />
      <HookCounter value={value} />
      <PlanetInfo id={value} />
      <Notification />
    </>
  ) : (
    <button onClick={() => setVisible(true)}>show</button>
  );

  return (
    <div>
      <h2>Hello, useEffect hook</h2>
      {content}
    </div>
  );
};

class ClassCounter extends React.Component<{ value: number }> {
  componentDidMount() {
    console.log("mounted:ClassCounter");
  }

  componentWillUpdate() {
    console.log("updated:ClassCounter");
  }

  componentWillUnmount() {
    console.log("unmounted:ClassCounter");
  }

  render() {
    return <p>{this.props.value}</p>;
  }
}

const HookCounter = ({ value }: { value: number }) => {
  // componentDidMount
  useEffect(() => console.log(" mounted:useEffect"), []);
  // componentWillUpdate
  useEffect(() => console.log("updated:useEffect"));
  // componentWillUnmount
  useEffect(() => () => console.log("unmount:useEffect"), []);
  return <p>{value}</p>;
};

const Notification = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timeout);
  }, []);
  return <>{visible && <p>Notification</p>}</>;
};

const getPlanet = (id: number) => {
  return fetch(`https://swapi.dev/api/planets/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch planet info");
      }
      return response.json();
    })
    .then((data) => data);
};

const useRequest = (request: () => Promise<any>) => {
  const emptyData = { name: "" };
  // useMemo caching function result. it wont change if no dependencies changes
  const initialState = useMemo(
    () => ({
      data: emptyData,
      loading: true,
      error: false,
    }),
    [emptyData]
  );
  const [dataState, setDataState] = useState(initialState);
  useEffect(() => {
    setDataState(initialState);
    let cancelled = false;
    request()
      .then(
        (data: { name: string }) =>
          !cancelled &&
          setDataState({
            data,
            loading: false,
            error: false,
          })
      )
      .catch(
        () =>
          !cancelled &&
          setDataState({
            data: emptyData,
            loading: false,
            error: true,
          })
      );
    return () => {
      cancelled = true;
    };
  }, [emptyData, request, initialState]);

  return dataState;
};

// custom hook
const usePlanetInfo = (id: number) => {
  // useCallback changes request only on id change. it caches function
  const request = useCallback(() => getPlanet(id), [id]);
  return useRequest(request);
};

const PlanetInfo = ({ id }: { id: number }) => {
  const { data, loading, error } = usePlanetInfo(id);

  if (error) {
    return <p>Something went wrong!</p>;
  }
  if (loading) {
    return <p>Loading... Please wait!</p>;
  }
  return (
    <p>
      {id} - {data && data.name}
    </p>
  );
};

const Hooks = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <NewContext.Provider value="Hello useContext hook">
        <h1>Hooks page</h1>
        <UseStateSwitcher />
        <UseContextValue />
        <UseEffect />
      </NewContext.Provider>
    </div>
  );
};

export default Hooks;
