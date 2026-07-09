import Link from "next/link";
import Dashboard from "../components/Dashboard";
import ClimateList from "../components/ClimateList";
import PublicAlerts from "../components/PublicAlerts";
import { getRecords } from "../services/climateService";

export default async function Home() {

  const records = await getRecords();

  return (

    <main className="container mt-4">

      <h1 className="text-center text-primary">

        🌦 Sistema de Gestión Climática

      </h1>

      <p className="text-center text-muted">

        Monitoreo climático en tiempo real mediante una API REST.

      </p>

      <Dashboard records={records} />
      <PublicAlerts records={records} />

      <ClimateList />

      <div className="text-center mt-4">

        <Link
          href="/admin"
          className="btn btn-primary"
        >

          ⚙️ Ir al Panel Administrativo

        </Link>

      </div>

    </main>

  );

}