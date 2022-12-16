# Stockify

¿Qué hacemos?

Stockify es un proyecto que se dedica a tokenizar las acciones de una empresa. Tras un ICO, una compañía tokeniza mediante un ERC20 a la valoración. Por ejemplo, una compañía podría decidir tokenizar el 10% de su cuerpo por $100000 mediante 100 tokens. Stockify mintea dichos tokens para crear una valoración crypto de la empresa, la cual permite su comercialización. Quienes adquieran acciones compran tokens por el valor del mercado. 
Stockify cuenta con un sistema de bajo riesgo para los accionistas, quienes serán reembolsados el dinero que invirtieron si la empresa no cumple con ciertos objetivos que se propusieron de antemano en el tiempo propuesto.
Una vez que se hayan cumplido los objetivos, la compañía recibe el dinero y se termina el proceso de ICO. Los dueños de los tokens de la compañía ahora son libres de hacer lo que deseen con ellos. 

¿Por qué Web3?

El mercado bursátil tiene un problema inherente que gira en torno a la dificultad de seguir los shareholders de las empresas. Por lo tanto, existen posibilidades de manipulación social para beneficiar a los shareholders sin que nadie sepa. Si bien esto está regulado y altamente penalizado, las redes sociales modernas generan un gris entre la libre expresión y la promoción masiva de las acciones de una compañía. Un claro ejemplo moderno de este problema se dio en Twitter sobre la comercialización de acciones de Gamestop. 
Vincular a las personas que motivan este tipo de movimiento con la penalización legal resulta un gran problema, puesto que el shareholder register de una empresa no es de conocimiento público obligatorio.
Trabajar con un sistema Web3 permite saber perfectamente quien tiene algo que ganar o perder en una empresa, brindando transparencia ética y legal para el sistema. El sistema en general se beneficia de este paradigma ya que resulta en un blanqueo general de una empresa, y la empresa goza de la desvinculación de la responsabilidad de seguir shareholders con intenciones dudosas.


Tecnología utilizada y funcionalidades desarrolladas

Backend: 
. Un contrato global que maneja transacciones, pagos y locks de los tokens y de los pagos. 
. Un Oracle (mock)  para averiguar si la empresa cumplió con sus objetivos o no.
. Un contrato ERC20 para mintear y transferir los tokens de una empresa.
. Testeos en Hardhat para verificar el correcto funcionamiento de los contratos

Frontend:
. Ingreso con metamask al sitio
. Pantalla de compra de acciones (permite comprar acciones pero el contenido es un mock)
. Pantalla de venta/creación de acciones para una empresa


TO DOs a futuro

Darle veracidad legal al proyecto
Implementar un oráculo completo descentralizado para que confirme si la empresa cumplió a tiempo con sus objetivos.
Permitir que una billetera cree más de un proyecto.
Permitir que un proyecto tenga más de una etapa de objetivos.
Conectar el sistema a una base de datos para armar un marketplace real de tokens.

