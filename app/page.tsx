'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import {
  FileText,
  ShieldCheck,
  Zap,
  LayoutDashboard,
  ArrowRight,
  CheckCircle2,
  Globe,
  BarChart3,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const [setupInitialized, setSetupInitialized] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkSetup() {
      try {
        const res = await apiClient.get('/auth/setup-status');
        setSetupInitialized(res.data.initialized);
      } catch (error) {
        // En caso de error, asumimos inicializado para no exponer la ruta de setup
        setSetupInitialized(true);
      }
    }
    checkSetup();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar con Glassmorphism */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
              <FileText className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Factura<span className="text-emerald-600">Ya</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Características</a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Nosotros</a>
            <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Soporte</a>
          </div>

          <div className="flex items-center gap-4">
            {setupInitialized === false ? (
              <Button asChild className="bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-100 px-6 animate-pulse">
                <Link href="/setup">Configurar Sistema</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild className="hidden sm:inline-flex text-slate-600">
                  <Link href="/login">Iniciar Sesión</Link>
                </Button>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-100 px-6">
                  <Link href="/login">Comenzar Gratis</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative flex-1 flex flex-col items-center justify-center text-center px-4 py-20 md:py-32 overflow-hidden bg-white">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3 h-3 fill-emerald-600" />
            Facturación Electrónica DIAN v1.9
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Sus facturas con la <span className="text-emerald-600">DIAN</span>,<br />
            más rápidas que nunca.
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 leading-relaxed font-medium">
            La plataforma líder en Colombia para gestionar su facturación electrónica de forma segura, escalable y 100% automatizada. Diseñada para emprendedores y empresas modernas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" asChild className="h-14 px-10 bg-emerald-600 hover:bg-emerald-700 text-lg font-semibold rounded-2xl shadow-xl shadow-emerald-200">
              <Link href={setupInitialized === false ? "/setup" : "/login"}>
                {setupInitialized === false ? "Configurar Sistema" : "Empezar Ahora"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold rounded-2xl border-slate-200 hover:bg-slate-50">
              Ver Demo Interactiva
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8">
            <div className="flex items-center gap-2 text-slate-400">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium">Sin tarjeta de crédito</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium">Setup en 5 minutos</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium">100% Seguro</span>
            </div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50 border-y border-slate-200/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest">¿Por qué elegirnos?</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Todo lo que necesita para su contabilidad digital</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white p-8 rounded-3xl border border-slate-200 transition-all hover:shadow-2xl hover:shadow-slate-200/50 hover:border-emerald-200 hover:-translate-y-1">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Seguridad XAdES-BES</h4>
              <p className="text-slate-500 leading-relaxed font-medium">
                Firmado digital de alta seguridad cumpliendo rigurosamente con los estándares técnicos exigidos por la DIAN.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white p-8 rounded-3xl border border-slate-200 transition-all hover:shadow-2xl hover:shadow-slate-200/50 hover:border-blue-200 hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LayoutDashboard className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Dashboard Integral</h4>
              <p className="text-slate-500 leading-relaxed font-medium">
                Visualice el estado de sus facturas en tiempo real con métricas precisas y filtros inteligentes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white p-8 rounded-3xl border border-slate-200 transition-all hover:shadow-2xl hover:shadow-slate-200/50 hover:border-emerald-200 hover:-translate-y-1">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Multitenancy Avanzado</h4>
              <p className="text-slate-500 leading-relaxed font-medium">
                Gestione múltiples empresas y certificados desde un solo panel de control unificado y seguro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 opacity-80">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <FileText className="text-white w-4 h-4" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              FacturaYa
            </span>
          </div>

          <p className="text-slate-400 text-sm">
            © 2026 FacturaYa SaaS.
          </p>

          <div className="flex gap-6">
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest">Términos</a>
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
