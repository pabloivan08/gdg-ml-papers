---
title: Atention is all you need
author: Ashish Vaswani / Noam Shazeer / Niki Parmar / Jakob Uszkoreit / Llion Jones / Aidan N. Gomez / Łukasz Kaiser / Illia Polosukhin
description: Introducción de los Transformers para revolucionar el NLP
url: https://arxiv.org/pdf/1706.03762v6
---
# Atention is all you need

Ok, prepárate porque "Attention Is All You Need" de Google fue como un terremoto en el mundo de la inteligencia artificial, especialmente en cómo las máquinas entienden y generan lenguaje (eso que llamamos Procesamiento del Lenguaje Natural o NLP). ¡Vamos a desglosarlo de forma sencilla!

## Introducción: El Problemilla que Había Antes

Imagina que quieres que una máquina traduzca un texto largo. Antes de este paper, los modelos más populares eran las **Redes Neuronales Recurrentes (RNNs)**, como las LSTMs o GRUs.

*   **¿Cómo funcionaban?** Como si leyeran palabra por palabra, en orden. Tenían una especie de "memoria" a corto plazo para recordar lo que acababan de leer.
*   **El Problema:**
    1.  **Lentitud:** Tenían que procesar las palabras una tras otra. ¡No podías procesar toda la frase de golpe! Esto hacía el entrenamiento súper lento, especialmente con textos largos. Piensa en leer una novela palabra por palabra sin poder saltar ni procesar párrafos enteros a la vez.
    2.  **Olvidadizas:** Aunque tenían memoria, les costaba un montón recordar la conexión entre palabras que estaban muy separadas en una frase larga (las famosas "dependencias a largo plazo"). Si una palabra al final de un párrafo dependía de una al principio, la RNN a menudo ya se había "olvidado".
    3.  **CNNs (Convolucionales):** También se usaron, eran más rápidas para algunas cosas, pero también tenían limitaciones para captar relaciones a distancia.

**La Propuesta del Paper:** ¿Y si... tiramos todo eso a la basura (la recurrencia y las convoluciones para procesar la secuencia) y usamos *solo* un mecanismo llamado **Atención**? ¡Spoiler: funcionó de maravilla!

## El Modelo Transformer: Una Nueva Arquitectura

El corazón del paper es una nueva arquitectura llamada **Transformer**. Olvídate del "paso a paso" de las RNNs.

*   **Estructura General:** Mantiene la idea clásica de **Encoder-Decoder** (Codificador-Decodificador), muy usada en traducción:
    *   **Encoder:** Lee la frase de entrada (ej: en inglés) y la convierte en una representación numérica llena de significado (un conjunto de vectores). Piensa en él como el equipo que *entiende* la frase original.
    *   **Decoder:** Toma esa representación numérica y genera la frase de salida (ej: en español), palabra por palabra. Es el equipo que *escribe* la traducción.

*   **¿Qué hay Dentro? (Aquí viene lo nuevo):**
    *   Tanto el Encoder como el Decoder están formados por varias **capas idénticas** apiladas (en el paper usan 6).
    *   Cada capa tiene **dos sub-capas principales**:
        1.  **Mecanismo de Multi-Head Self-Attention:** ¡La estrella del show! Hablaremos de esto en detalle. Básicamente, permite a cada palabra "mirar" a todas las otras palabras de la frase (incluso a sí misma) para entender mejor su contexto.
        2.  **Feed-Forward Network (Red Neuronal Simple):** Una red neuronal normalita que procesa la salida de la capa de atención de forma independiente para cada posición.
    *   **Trucos extra:** Usan **conexiones residuales** ("atajos" que ayudan a que la información fluya mejor y el entrenamiento sea más fácil) y **normalización de capas** (ayuda a estabilizar los números durante el entrenamiento).

**La Gran Diferencia:** ¡No hay recurrencia! Todas las palabras se procesan *a la vez*. La forma en que el modelo entiende las relaciones entre palabras es *únicamente* a través del mecanismo de atención.

## Mecanismo de Atención: ¡La Clave de Todo!

Aquí está la magia. ¿Cómo funciona eso de "prestar atención"?

### Scaled Dot-Product Attention (Atención por Producto Escalar Escalado)

Es el bloque de construcción básico. Imagina que tienes una palabra (la llamaremos **Query** o Consulta) y quieres saber cuánto debería importarle cada *otra* palabra de la frase.

1.  **Queries, Keys, Values:** Cada palabra en la secuencia tiene asociados tres vectores que el modelo aprende:
    *   **Query (Q):** Representa la palabra actual que está "preguntando" o buscando información. "Oye, ¿quién es relevante para mí?".
    *   **Key (K):** Representa una "etiqueta" o descriptor de una palabra. Responde a la Query diciendo "Yo soy relevante para esto".
    *   **Value (V):** Representa el contenido o significado real de esa palabra. Es la información que se usará si la palabra resulta relevante.

2.  **El Proceso simplificado:**
    *   **Paso 1: Comparar:** La Query de una palabra se compara con la Key de *todas* las palabras (incluida ella misma). ¿Cómo? Calculando el **producto escalar** (dot product) entre el vector Q y cada vector K. Un producto escalar alto significa "¡Oye, esta Key (palabra) parece relevante para mi Query (palabra actual)!".
    *   **Paso 2: Escalar:** Los resultados se dividen por la raíz cuadrada de la dimensión de los vectores Key (`sqrt(dk)`). Esto es un truco técnico para que el entrenamiento sea más estable, ¡no te preocupes demasiado por el porqué ahora!
    *   **Paso 3: Ponderar (Softmax):** Se aplica una función **Softmax** a estos resultados escalados. Esto convierte las puntuaciones en porcentajes o "pesos" que suman 1. Un peso alto significa "esta palabra es súper importante", un peso bajo significa "meh, no tanto".
    *   **Paso 4: Combinar:** Se multiplican los pesos obtenidos por los vectores **Value (V)** de cada palabra y se suman todos. El resultado es un nuevo vector para la palabra original, que ahora contiene información ponderada de todas las palabras relevantes de la frase. ¡Es como si la palabra hubiera "absorbido" contexto!

### Self-Attention

Es simplemente aplicar el mecanismo anterior donde las **Queries, Keys y Values provienen de la *misma* secuencia de entrada**.

*   **¿Para qué sirve?** Permite que cada palabra en la frase de entrada (o salida) preste atención a todas las demás palabras *en esa misma frase*. Así, puede entender el contexto interno. Por ejemplo, en "El gato persiguió al perro porque *estaba* cansado", la auto-atención podría ayudar a "estaba" a determinar si se refiere al gato o al perro mirando las otras palabras.

### Multi-Head Attention

En lugar de hacer la atención una sola vez con un conjunto de Q, K, V, ¡lo hacen **varias veces en paralelo** (en el paper usan 8 "cabezas")!

*   **¿Por qué?** Cada "cabeza" aprende a enfocarse en **diferentes tipos de relaciones** o aspectos de la frase. Una cabeza podría fijarse en relaciones sintácticas (sujeto-verbo), otra en relaciones semánticas (sinónimos), otra en conexiones a larga distancia, etc.
*   **¿Cómo funciona?**
    1.  Los vectores Q, K, V originales se dividen y transforman linealmente para cada cabeza.
    2.  Cada cabeza realiza el "Scaled Dot-Product Attention" por separado y en paralelo.
    3.  Los resultados de todas las cabezas se concatenan (se pegan) y se vuelven a transformar linealmente para obtener el resultado final.

**Analogía:** Imagina que estás analizando una escena compleja. En lugar de tener una sola persona mirando, tienes 8 expertos (cabezas). Uno es experto en colores, otro en formas, otro en movimiento... Cada uno se fija en lo suyo. Al final, juntan sus informes (concatenan) para tener una comprensión completa y rica de la escena.

## Positional Encoding: ¿Y el Orden de las Palabras?

Si procesamos todo a la vez, ¿cómo sabe el modelo si una palabra va antes o después? ¡El orden importa! ("El perro muerde al hombre" vs. "El hombre muerde al perro").

Como el Transformer no tiene recurrencia ni convoluciones que naturalmente procesen el orden, necesita una forma de **inyectar información sobre la posición** de cada palabra.

*   **La Solución: Positional Encodings**
    *   Antes de meter los vectores de las palabras (embeddings) en la primera capa, se les **suma** otro vector: el *Positional Encoding*.
    *   Este vector **no se aprende**, se calcula usando una fórmula fija con funciones seno y coseno de diferentes frecuencias.
    *   La fórmula está diseñada para que:
        *   Cada posición tenga una codificación única.
        *   El modelo pueda aprender fácilmente a atender a **posiciones relativas**. Es decir, puede saber qué tan lejos está una palabra de otra.

**En resumen:** Es como añadirle a cada palabra una "etiqueta GPS" matemática que le dice al modelo dónde está ubicada en la secuencia.

## Ventajas del Transformer: ¿Por Qué Fue un Bombazo?

Comparado con las RNNs y CNNs anteriores, el Transformer tenía varias ventajas clave:

1.  **¡Paralelización Total!** Como cada palabra se procesa en paralelo gracias a la atención, se puede aprovechar mucho mejor el hardware moderno (GPUs/TPUs). Esto significa **entrenamientos muchísimo más rápidos**.
2.  **Mejor Captura de Dependencias a Largo Plazo:** La atención conecta directamente cualquier par de palabras en la frase, sin importar lo lejos que estén. La "distancia" que tiene que recorrer la información entre dos palabras es constante (O(1)), mientras que en una RNN era proporcional a la distancia (O(n)). ¡Adiós al problema de olvidar!
3.  **Rendimiento Superior (Estado del Arte):** En las tareas de traducción en las que lo probaron (WMT Inglés-Alemán e Inglés-Francés), superó a todos los modelos anteriores, ¡y con menos tiempo de entrenamiento!
4.  **Generalización:** Aunque nació para traducción, la arquitectura resultó ser muy potente y se adaptó luego a muchísimas otras tareas de NLP (resumen de texto, respuesta a preguntas, generación de texto como GPT, clasificación como BERT...).

## Resultados y Conclusiones: ¡Funcionó!

*   **Resultados Concretos:** El paper mostró mejoras significativas en las puntuaciones BLEU (una métrica común para evaluar traducción automática) en los datasets estándar WMT 2014. Establecieron un nuevo *estado del arte*.
*   **Impacto:** El Transformer no solo fue un modelo exitoso, sino que **cambió el paradigma** en NLP. Casi todos los modelos grandes y potentes que vinieron después (BERT, GPT-2, GPT-3, T5, etc.) se basan en la arquitectura Transformer.
*   **Conclusión del Paper:** Demostraron que una arquitectura basada *únicamente* en atención, sin recurrencia ni convoluciones para manejar la secuencia, no solo era viable sino superior para tareas de traducción, abriendo la puerta a futuras investigaciones y modelos más potentes.

**En pocas palabras:** El paper "Attention Is All You Need" introdujo el Transformer, un modelo que revolucionó el NLP al reemplazar la recurrencia secuencial con la atención paralela, permitiendo entrenamientos más rápidos y una mejor comprensión de las relaciones entre palabras, incluso a larga distancia. ¡Y todo empezó con esa simple idea: la atención es todo lo que necesitas!