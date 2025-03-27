---
title: Gradient-based learning applied to document recognition
author: Yann Lecun / Léon Bottou / Yoshua Bengio / Patrick Haffner
description: Uso de redes neuronales convolucionales para el reconocimiento de escritura y documentos
url: https://sci-hub.se/10.1109/5.726791
---

1. **Uso de Redes Neuronales Convolucionales (CNNs)**

Introducen una arquitectura llamada LeNet-5, una de las primeras CNNs diseñadas específicamente para el reconocimiento de caracteres escritos a mano (por ejemplo, en cheques bancarios).
LeNet-5 combina capas convolucionales, subsampling (o pooling) y capas completamente conectadas.

2. **Aprendizaje Basado en Gradientes**

Utilizan descenso de gradiente estocástico (SGD) y retropropagación para entrenar la red de manera eficiente.
Argumentan que este método es más robusto y efectivo que los enfoques tradicionales de reconocimiento de patrones (como modelos basados en reglas o técnicas estadísticas clásicas).

3. **Aplicaciones al Reconocimiento de Documentos**

Evalúan la efectividad de CNNs en la tarea de reconocimiento de caracteres en imágenes de documentos.
Comparan su método con otras técnicas clásicas como Máquinas de Vectores de Soporte (SVMs), Redes Bayesianas y Modelos de Mezcla Gaussiana.

4. **Ventajas de las CNNs**

Invariancia a la traslación, escalado y deformaciones menores, gracias a la combinación de convoluciones y pooling.
Extracción automática de características, eliminando la necesidad de diseñar manualmente características para cada problema.
Escalabilidad y generalización, demostrando buenos resultados en conjuntos de datos reales.

**Impacto del Paper**

Este paper fue uno de los primeros en demostrar la viabilidad del aprendizaje profundo aplicado al reconocimiento de imágenes y documentos. Su enfoque sentó las bases para los avances en visión por computadora, OCR (reconocimiento óptico de caracteres) y más tarde, en la revolución del deep learning con redes profundas.