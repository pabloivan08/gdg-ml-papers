---
title: Gradient-based learning applied to document recognition
author: Yann Lecun / Léon Bottou / Yoshua Bengio / Patrick Haffner
description: Uso de redes neuronales convolucionales para el reconocimiento de escritura y documentos
url: https://sci-hub.se/10.1109/5.726791
---

Este es un trabajo fundamental en el campo del Machine Learning y la Visión por Computadora. Explica cómo las técnicas de aprendizaje basadas en gradientes, especialmente aplicadas a redes neuronales, pueden resolver problemas complejos de reconocimiento de documentos, superando los métodos tradicionales que dependían mucho de la ingeniería manual de características.

## Puntos Clave Desglosados:

**1. El Problema Principal:** El reconocimiento automático de documentos (como cheques bancarios o texto manuscrito) es difícil debido a la enorme variabilidad en la escritura, las formas, el ruido, etc. Los métodos tradicionales requerían extraer manualmente "características" (features) relevantes de las imágenes, un proceso costoso, específico para cada tarea y a menudo subóptimo.

**2. Aprendizaje Basado en Gradientes** (Gradient-Based Learning): La idea central es usar algoritmos de aprendizaje que ajustan automáticamente los parámetros de un modelo (como una red neuronal) para minimizar una medida de error (función de pérdida o "loss function"). Esto se hace calculando el gradiente (la dirección de máximo cambio) de la función de pérdida con respecto a los parámetros y moviendo los parámetros en la dirección opuesta. El algoritmo clave para calcular eficientemente estos gradientes en redes neuronales multicapa es la Retropropagación (Backpropagation).

**3. Redes Neuronales Convolucionales (CNNs):** El paper introduce y defiende fuertemente las CNNs como una arquitectura de red neuronal ideal para procesar datos con estructura de rejilla, como las imágenes. Sus ideas clave son:

- Campos Receptivos Locales (Local Receptive Fields): Las neuronas iniciales solo miran pequeñas regiones de la imagen de entrada, capturando características locales como bordes o esquinas.

- Pesos Compartidos (Shared Weights): El mismo detector de características (un conjunto de pesos) se aplica en toda la imagen. Si detectar un borde horizontal es útil en una parte de la imagen, probablemente también lo sea en otra. Esto reduce drásticamente la cantidad de parámetros a aprender y hace que la red sea más robusta a las traslaciones (invarianza a la traslación).

- Subsampling (o Pooling): Después de detectar características, se reduce la resolución espacial. Esto hace que la representación sea más robusta a pequeñas distorsiones y traslaciones, y reduce la carga computacional.

- Jerarquía de Características: Las capas sucesivas combinan características simples (bordes) para formar características más complejas (partes de objetos, objetos).

- LeNet-5: El paper describe en detalle la arquitectura LeNet-5, una CNN específica diseñada para el reconocimiento de dígitos manuscritos, que logró resultados de vanguardia en el conocido dataset MNIST.

**4. Resultados en MNIST:** El paper presenta una comparación exhaustiva en el dataset MNIST (dígitos manuscritos). LeNet-5 (y variantes) superó significativamente a otros métodos de la época, incluyendo clasificadores lineales, K-Nearest Neighbors (KNN), Redes de Base Radial (RBF), y Máquinas de Vectores de Soporte (SVMs) iniciales, demostrando la superioridad del aprendizaje de características sobre las características diseñadas a mano o métodos menos estructurados para datos de imagen.

**5. Entrenamiento Global (End-to-End):** Para problemas reales como leer una palabra o el importe de un cheque, no basta con reconocer caracteres aislados. Hay que segmentar (separar caracteres), reconocerlos y usar contexto (como un diccionario o gramática). El paper argumenta que entrenar cada módulo por separado es subóptimo. Propone entrenar todo el sistema de principio a fin (end-to-end) para minimizar un error global. Si todo el sistema es diferenciable, se puede usar backpropagation a través de todos los módulos.

**6. Redes Transformadoras de Grafos (Graph Transformer Networks - GTNs):** Para manejar la complejidad de sistemas multimodulares donde la información no son solo vectores fijos, sino secuencias de hipótesis alternativas (representadas como grafos), el paper introduce las GTNs.

- Los módulos (GTs) operan sobre grafos y producen grafos. Un grafo puede representar todas las posibles segmentaciones de una palabra, o todas las posibles interpretaciones de una secuencia reconocida.

- Se define una operación clave llamada Composición de Grafos, que permite combinar la información de diferentes módulos (por ejemplo, combinar las salidas del reconocedor de caracteres con un grafo que representa un diccionario).

- Crucialmente, si las operaciones dentro de los GTs son diferenciables respecto a los datos numéricos en los arcos del grafo y a los parámetros del módulo, se puede propagar gradientes a través de toda la red GTN y realizar un entrenamiento global.

- Se describen diferentes criterios de entrenamiento global para GTNs, incluyendo entrenamiento Viterbi (minimizar el error del "mejor camino"), entrenamiento Viterbi Discriminativo, y entrenamiento Forward Discriminativo (considera todos los caminos posibles, relacionado con maximizar la probabilidad posterior de la respuesta correcta).

**7. Aplicaciones Prácticas:**

- Reconocimiento de Escritura Online: Se describe un sistema que procesa la trayectoria del lápiz (no solo la imagen final), usando CNNs y GTNs para reconocer palabras completas, entrenado globalmente.

- Sistema de Lectura de Cheques: Se detalla un sistema comercial (desplegado en bancos) que localiza el importe en un cheque, lo segmenta, lo reconoce usando LeNet-5 dentro de una GTN (combinando con una gramática para importes válidos), y calcula una confianza para decidir si aceptar la lectura o enviarla a un humano. Este sistema demostró la viabilidad y superioridad del enfoque en una aplicación real y compleja.

**Conclusión Principal del Paper:** El mensaje central es que se pueden construir sistemas de reconocimiento de patrones mucho más potentes y precisos confiando más en el aprendizaje automático a partir de datos (usando arquitecturas adecuadas como CNNs y optimización basada en gradientes) y menos en la ingeniería manual de características y heurísticas. Las GTNs proporcionan un marco formal y potente para construir y entrenar globalmente sistemas complejos y modulares.

## Comparación con la IA y el Machine Learning Actuales (Post-1998):

Este paper fue increíblemente influyente y adelantado a su tiempo. Muchas de sus ideas centrales son ahora pilares del Deep Learning moderno, pero el campo ha avanzado enormemente:

**1. Escala:** La diferencia más obvia es la escala.

- Datos: MNIST tiene 60,000 imágenes de entrenamiento. Hoy se usan datasets como ImageNet (millones de imágenes) o enormes corpus de texto/código/multimedia.

- Modelos: LeNet-5 tenía ~60,000 parámetros. Los modelos modernos (como GPT-4, Llama, o grandes modelos de visión) tienen cientos de miles de millones o incluso billones de parámetros.

- Cómputo: El entrenamiento en 1998 se hacía en CPUs potentes de la época. Hoy, el Deep Learning depende masivamente de GPUs (Unidades de Procesamiento Gráfico) y TPUs (Unidades de Procesamiento Tensorial) que permiten paralelizar masivamente los cálculos.

**2. Arquitecturas:**

- CNNs: Siguen siendo fundamentales para visión por computadora, pero las arquitecturas han evolucionado mucho (AlexNet, VGG, ResNet, Inception, EfficientNet, etc.) con capas más profundas, conexiones residuales, normalización por lotes (Batch Norm), etc.

- Transformers: La arquitectura Transformer, basada en mecanismos de Atención (Attention), ha revolucionado el Procesamiento del Lenguaje Natural (NLP) desde 2017 y se está adoptando cada vez más en visión (Vision Transformers - ViT) y otras áreas. Ha demostrado ser extremadamente eficaz para capturar dependencias a largo plazo.

- Otros: Han surgido arquitecturas para grafos (Graph Neural Networks - GNNs), modelos generativos (GANs, VAEs, Modelos de Difusión), etc.

**3. Entrenamiento y Optimización:**

- Backpropagation: Sigue siendo el algoritmo central.

- Optimizadores: Mientras que el paper usa variantes de Descenso de Gradiente Estocástico (SGD) con ajustes (como Diagonal Levenberg-Marquardt), hoy en día son omnipresentes optimizadores adaptativos como Adam, AdamW, RMSProp, que ajustan la tasa de aprendizaje por parámetro.

- Regularización: Técnicas como Dropout, Batch Normalization, aumento de datos (Data Augmentation) mucho más sofisticado, y decaimiento de pesos (Weight Decay) son estándar para prevenir el sobreajuste en modelos masivos.

- Aprendizaje por Transferencia y Auto-supervisado: Es común pre-entrenar modelos gigantes en datasets masivos (a menudo sin etiquetas, usando aprendizaje auto-supervisado) y luego afinarlos (fine-tuning) para tareas específicas con menos datos. Esto era menos prevalente en 1998.

**4. Frameworks y Herramientas:**

- Las GTNs eran un framework de investigación específico desarrollado por los autores. Hoy, el desarrollo se basa en librerías de Deep Learning como TensorFlow, PyTorch, JAX, que abstraen el cálculo de gradientes (diferenciación automática), la construcción de modelos y el despliegue en hardware especializado, haciendo mucho más fácil implementar y experimentar con arquitecturas complejas.

- El concepto de grafo computacional es central en estas librerías modernas, pero de una manera más general que las GTNs originales, que estaban más enfocadas en representar secuencias de hipótesis.

5. Principio End-to-End: El principio de entrenar sistemas complejos de forma global (end-to-end) defendido en el paper es ahora la norma en Deep Learning. Sistemas que antes tenían múltiples etapas procesadas por separado (ej. detección de objetos, luego reconocimiento) ahora se entrenan a menudo como un único modelo diferenciable.

## En Resumen:

El paper de LeCun et al. fue visionario. Estableció la eficacia del aprendizaje basado en gradientes con arquitecturas neuronales adecuadas (CNNs) para tareas perceptivas, y sentó las bases para el entrenamiento global de sistemas complejos (con GTNs como un precursor conceptual). El Deep Learning moderno ha llevado estas ideas a una escala inimaginable en 1998, desarrollando arquitecturas más potentes (Transformers), técnicas de entrenamiento más robustas, y herramientas mucho más accesibles, pero los principios fundamentales establecidos en este trabajo siguen siendo increíblemente relevantes.