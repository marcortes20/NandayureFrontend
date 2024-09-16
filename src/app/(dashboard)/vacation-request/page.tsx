import React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Textarea from '@/components/ui/textarea';
import Checkbox from '@/components/ui/checkbox';

const VacationRequest = () => {
  return (
    <form className="max-w-3xl mx-auto space-y-6 p-6 bg-white rounded-lg shadow">
      <h1 className="text-xl font-semibold text-center mb-4">DIRECCIÓN DE RECURSOS HUMANOS</h1>
      <h2 className="text-lg font-medium text-center mb-6">BOLETA SOLICITUD DE VACACIONES</h2>

      <div className="flex mb-6">
  <div className="flex-1 h-1" style={{ backgroundColor: '#2196f3' }}></div>
  <div className="flex-1 h-1" style={{ backgroundColor: '#e4df5e' }}></div>
  <div className="flex-1 h-1" style={{ backgroundColor: '#4caf50' }}></div>
</div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fecha">FECHA</Label>
          <Input id="fecha" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="control">CONTROL #</Label>
          <Input id="control" placeholder="AM-00-2024" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre del solicitante</Label>
          <Input id="nombre" placeholder="Nombre completo" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cedula">Número de Cédula</Label>
          <Input id="cedula" placeholder="000000000" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departamento">Departamento</Label>
          <Input id="departamento" placeholder="Departamento" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fechaIngreso">Fecha de Ingreso</Label>
          <Input id="fechaIngreso" type="date" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Períodos Vencidos</Label>
        <div className="grid grid-cols-3 gap-4">
          <Input placeholder="Año" />
          <Input placeholder="Días" />
          <Input placeholder="Total" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="derechoDisfrutar">Derecho a disfrutar</Label>
          <Input id="derechoDisfrutar" placeholder="0 DIAS" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="solicitado">Solicitado</Label>
          <Input id="solicitado" placeholder="0 DIAS" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="saldoVacaciones">Saldo de vacaciones</Label>
          <Input id="saldoVacaciones" placeholder="0 DIAS" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fechaInicio">A partir del</Label>
          <Input id="fechaInicio" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fechaFin">Hasta el</Label>
          <Input id="fechaFin" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fechaRegreso">Regresando lab</Label>
          <Input id="fechaRegreso" type="date" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="observaciones">OBSERVACIONES</Label>
        <Textarea id="observaciones" placeholder="Ingrese observaciones aquí" />
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold">AUTORIZACIONES</h4>
        <div className="space-y-2">
          <Label htmlFor="firmaJefe">2. Autorizado por (Jefe Inmediato)</Label>
          <Input id="firmaJefe" placeholder="Firma del Jefe Inmediato" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="firmaRRHH">3. Revisado por (Encargado Recursos Humanos)</Label>
          <Input id="firmaRRHH" placeholder="Firma del Encargado de RRHH" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="firmaAlcalde">4. Aprobado por (Alcalde Municipal)</Label>
          <Input id="firmaAlcalde" placeholder="Firma del Alcalde Municipal" />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="aprobada" />
        <Label htmlFor="aprobada">Aprobada</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="denegada" />
        <Label htmlFor="denegada">Denegada</Label>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold">DISPOSICIONES</h4>
        <p className="text-sm">1. Todo aquel funcionario que requiera tramitar las vacaciones legales debe realizar la solicitud con mínimo una semana de anticipación, ya que deben ser revisadas y posteriormente aprobadas. Por consiguiente las solicitudes con menos de 3 días tramitadas serán analizadas para su aprobación según el grado de urgencia.</p>
        <p className="text-sm">2. Antes de presentar la solicitud a recursos humanos, esta debe de venir autorizada por el jefe y gestor del área. Las aprobaciones las debe de coordinar el encargado de recursos humano. Incluyendo la del alcalde.</p>
        <p className="text-sm">3. Las solicitudes se tramitan personalmente, si falta alguna de las 4 firmas, esta no tendrá ninguna validez.</p>
      </div>

      <Button type="submit" className="w-full">Enviar Solicitud</Button>
    </form>
  )
}

export default VacationRequest;
