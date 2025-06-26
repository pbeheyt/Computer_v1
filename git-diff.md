diff --git a/Polynomial.js b/Polynomial.js
index 069f779..890564c 100644
--- a/Polynomial.js
+++ b/Polynomial.js
@@ -1,4 +1,4 @@
-import { customSqrt } from './math.js';
+import { customSqrt, customAbs, customMax } from './math.js';
 
 /**
  * Represents a polynomial equation and provides methods to solve and display it.
@@ -17,7 +17,7 @@ export class Polynomial {
         }
 
         const powers = Object.keys(this.coefficients).map(Number);
-        this.degree = powers.length > 0 ? Math.max(...powers) : 0;
+        this.degree = powers.length > 0 ? customMax(powers) : 0;
     }
 
     /**
@@ -44,7 +44,7 @@ export class Polynomial {
                 }
             }
 
-            result += `${Math.abs(coeff)} * X^${pow}`;
+            result += `${customAbs(coeff)} * X^${pow}`;
         }
         return result + " = 0";
     }
diff --git a/math.js b/math.js
index 5f024e3..68d6da6 100644
--- a/math.js
+++ b/math.js
@@ -20,3 +20,31 @@ export function customSqrt(number) {
 
     return guess;
 }
+
+/**
+ * Calculates the absolute value of a number.
+ * @param {number} number The number to find the absolute value of.
+ * @returns {number} The absolute value.
+ */
+export function customAbs(number) {
+    return number < 0 ? -number : number;
+}
+
+/**
+ * Finds the maximum value in an array of numbers.
+ * @param {number[]} numbersArray The array of numbers to search through.
+ * @returns {number} The largest number in the array. Returns -Infinity if the array is empty.
+ */
+export function customMax(numbersArray) {
+    if (!numbersArray || numbersArray.length === 0) {
+        return -Infinity; // Mimics Math.max() behavior for no arguments
+    }
+
+    let max = numbersArray[0];
+    for (let i = 1; i < numbersArray.length; i++) {
+        if (numbersArray[i] > max) {
+            max = numbersArray[i];
+        }
+    }
+    return max;
+}
