import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./App.scss";

// pages
import Index from "./pages/Index";
import DetailRocket from "./pages/DetailRocket";
import NotFound from "./pages/NotFound";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Suspense fallback={<p className="text-red-500">hello</p>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/rocket/:idRocket" element={<DetailRocket />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
