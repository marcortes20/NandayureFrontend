export const getRequestType = (typeId: number) => {
  const types = {
    1: 'Vacaciones',
    2: 'Certificado de Salario',
    3: 'Confirmación de Pago',
  };
  return types[typeId as keyof typeof types] || 'Desconocido';
};

export const getRequestState = (stateId: number) => {
  const states = {
    1: 'Pendiente',
    2: 'Aprobado',
    3: 'Rechazado',
  };
  return states[stateId as keyof typeof states] || 'Desconocido';
};
