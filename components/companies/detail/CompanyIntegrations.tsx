import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileKey, Loader2, Plus } from 'lucide-react';

interface CompanyIntegrationsProps {
    apiKeys: any[];
    isLoadingKeys: boolean;
    isCreatingKey: boolean;
    generatedKey: string | null;
    handleGenerateApiKey: () => void;
    handleRevokeApiKey: (id: string) => void;
    webhooks: any[];
    isLoadingWebhooks: boolean;
    isCreatingWebhook: boolean;
    webhookUrl: string;
    setWebhookUrl: (val: string) => void;
    handleSaveWebhook: () => void;
    deleteWebhook: (id: string) => void;
}

export function CompanyIntegrations({
    apiKeys, isLoadingKeys, isCreatingKey, generatedKey,
    handleGenerateApiKey, handleRevokeApiKey,
    webhooks, isLoadingWebhooks, isCreatingWebhook,
    webhookUrl, setWebhookUrl, handleSaveWebhook, deleteWebhook
}: CompanyIntegrationsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileKey className="h-5 w-5 text-indigo-500" />
                    Integraciones (API & Webhooks)
                </CardTitle>
                <CardDescription>Genera llaves de acceso para el software de este cliente.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* API Keys Block */}
                    <div>
                        <Label className="text-base font-semibold">API Keys Registradas</Label>
                        {isLoadingKeys ? (
                            <p className="text-sm text-slate-500 mt-2">Cargando llaves...</p>
                        ) : apiKeys && apiKeys.length > 0 ? (
                            <div className="mt-2 space-y-2 max-h-[150px] overflow-y-auto pr-2">
                                {apiKeys.map(key => (
                                    <div key={key.id} className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-indigo-900">{key.name}</p>
                                            <p className="text-xs text-indigo-700 font-mono mt-1">{key.secretPrefix}*******************</p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleRevokeApiKey(key.id)}>
                                            Revocar
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500 mt-2">No hay API Keys generadas.</p>
                        )}

                        {generatedKey && (
                            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                <p className="text-sm font-bold text-amber-900 mb-1">¡Copia esta llave ahora!</p>
                                <p className="text-xs text-amber-800 mb-2">Por seguridad, no se volverá a mostrar.</p>
                                <code className="block p-2 bg-white rounded border border-amber-300 text-xs break-all font-mono select-all">
                                    {generatedKey}
                                </code>
                            </div>
                        )}

                        <Button onClick={handleGenerateApiKey} disabled={isCreatingKey} variant="outline" size="sm" className="mt-4 w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                            {isCreatingKey ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                            Generar nueva API Key
                        </Button>
                    </div>

                    <div className="border-t my-4"></div>

                    {/* Webhooks Block */}
                    <div>
                        <Label className="text-base font-semibold">Webhooks Destino</Label>
                        {isLoadingWebhooks ? (
                            <p className="text-sm text-slate-500 mt-2">Cargando webhooks...</p>
                        ) : webhooks && webhooks.length > 0 ? (
                            <div className="mt-2 space-y-2">
                                {webhooks.map((wh: any) => (
                                    <div key={wh.id} className="p-2 border rounded-lg flex items-center justify-between text-sm">
                                        <span className="truncate max-w-[200px]" title={wh.url}>{wh.url}</span>
                                        <Button variant="ghost" size="sm" className="text-red-500 h-6 px-2" onClick={() => deleteWebhook(wh.id)}>
                                            Eliminar
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500 mt-2 mb-4">Ningún webhook registrado.</p>
                        )}

                        <div className="mt-4 space-y-2">
                            <Label className="text-xs text-slate-500">Registrar nueva URL</Label>
                            <div className="flex gap-2">
                                <Input placeholder="https://api.tu-hotel.com/webhook" value={webhookUrl} onChange={e => setWebhookUrl(e.target.value)} className="h-9" />
                                <Button size="sm" onClick={handleSaveWebhook} disabled={isCreatingWebhook} className="h-9">Guardar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
