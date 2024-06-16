
from PIL import Image
import numpy as np
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import matplotlib.pyplot as plt
print(os.getcwd())


MODEL = Sequential()
MODEL.add(Dense(64, activation='relu'))
MODEL.add(Dense(6, activation='softmax'))

MODEL.load_weights("models/1.h5")
# load_model.summary()
# test_dir= "testDir"
# IMG_SIZE = (224, 224)
# BATCH_SIZE = 1
# test_data = tf.keras.preprocessing.image_dataset_from_directory(
#     directory = test_dir,
#     image_size = IMG_SIZE,
#     label_mode = 'categorical',
#     batch_size = BATCH_SIZE
# ).cache().prefetch(buffer_size=tf.data.AUTOTUNE)

# load_model.evaluate(test_data)

test_image_path = "dataset\\oak\\360_F_34597264_cmiw6bo1r436f0O2simk9GAVYu4gakh2.jpg"
  # Replace with the actual path to your image
img = Image.open(test_image_path)
img = img.resize((256, 256))  # Resize to the same dimensions as your model's input
img = np.array(img) / 255.0  # Convert to NumPy array and normalize

# Add a batch dimension to the image
img = tf.convert_to_tensor(img)
img = tf.expand_dims(img, axis=0)

# Make predictions on the test image
predictions = MODEL.predict(img)
print(predictions)
class_names = ["banayan", "oak", "palm","pine","sandalwood","spruce"]  # Replace with your class names

# Display the image and prediction
plt.figure(figsize=(6, 8))
plt.imshow(img[0])  # Display the image
print("class index : ")
print(np.argmax(predictions))
true_class = class_names[np.argmax(predictions[0])]
title = f"Predicted class: {true_class}"
plt.title(title)
plt.axis("off")
plt.show()
print(predictions)