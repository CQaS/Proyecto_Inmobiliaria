/* 


CALENDAR 


*/
let calendar
document.addEventListener('DOMContentLoaded', () => {
    let calendarDisponibles = document.getElementById('calendarDisponibles')

    calendar = new FullCalendar.Calendar(calendarDisponibles, {
        timeZone: 'UTC',
        initialView: 'multiMonth', // Cambiado a 'multiMonth'
        views: {
            multiMonth: {
                duration: {
                    months: 12
                }, // Muestra 12 meses (un año)
            }
        },
    })

    calendar.render()
})

dir_inmueble = document.getElementById('dir_inmueble')
btn_calendar = document.getElementById('btn_calendar')

btn_calendar.addEventListener('click', () => {
    cod_referencia = document.getElementById('cod_referencia').value
    dir_inmueble = document.getElementById('dir_inmueble')

    if (!cod_referencia) {
        _alerta("Cod. Ref invalido")
        return
    }

    let contratos_por_CodRef = []
    let url = `/propiedad/calendar_codRef/${cod_referencia}`
    $.get(url).done((res) => {
        if (res && res.fechas.length > 0) {

            $.each(res, (j, R) => {
                $.each(R, (k, v) => {

                    jsonC = {
                        title: `${v[2]}` == 1 ? `${v[3]} - Reserva Propia` : `${v[3]} - Reserva de Terceros`,
                        start: `${v[0]}`,
                        end: `${v[1]}`,
                        color: `${v[2]}` == 1 ? 'red' : 'green',
                        allDay: true
                    }
                    contratos_por_CodRef.push(jsonC)
                    dir_inmueble.value = v[3]
                })
            })
            console.log(contratos_por_CodRef)

            /* Remover todo */
            calendar.removeAllEvents()
            // Agregar el nuevo evento
            contratos_por_CodRef.forEach((e) => {
                calendar.addEvent(e)
            })

            // Recargar los eventos en el calendario
            calendar.refetchEvents()

        } else {
            // Si no hay elementos, mostrar un alert
            _alerta('No hay resultados para mostrar');
        }
    })
})